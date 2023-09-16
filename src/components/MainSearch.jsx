import { useState } from "react";
import { Container, Row, Col, Form, Spinner } from "react-bootstrap";
import CityResult from "./CityResult";

const MainSearch = () => {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const apiKey = "d222fd82607ccb2453ed93dc3c730566";

  const handleChange = e => {
    setQuery(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    setSearch(query);
    try {
      const endpoint = `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=10&appid=${apiKey}`;
      const re = await fetch(endpoint);
      if (re.ok) {
        const data = await re.json();
        setCities(data);
      } else {
        alert("Error fetching results");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="my-5">
      <Row>
        <Col xs={10} className="mx-auto my-3">
          <h1 className="display-1">Weather App</h1>
        </Col>
        <Col xs={10} className="mx-auto my-3">
          <Form onSubmit={handleSubmit}>
            <Form.Control type="search" value={query} onChange={handleChange} placeholder="Type the name of a city" />
          </Form>
        </Col>
        {search && (
          <Col xs={10} className="mx-auto my-3">
            {<h3 className="display-3">{`Search results for "${search}"`}</h3>}
          </Col>
        )}
        {isLoading && (
          <Col xs={10} className="mx-auto my-3">
            <Spinner variant="primary"></Spinner>
          </Col>
        )}
        <Col xs={10} className="mx-auto mb-5 ">
          {cities.map(cityData => (
            <CityResult key={`${cityData.lat}-${cityData.lon}`} data={cityData} />
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default MainSearch;
