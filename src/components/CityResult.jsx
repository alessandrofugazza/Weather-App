import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const CityResult = ({ data }) => (
  <Link to={"/cities/" + data.name + "/" + data.lat + "/" + data.lon}>
    <Row className="city-result mx-0 mt-3 p-3 " style={{ border: "1px solid #00000033", borderRadius: 4 }}>
      <Col xs={3}>{data.name}</Col>
      <Col>
        {data.country}
        {data.state ? " — " + data.state : null}
      </Col>
    </Row>
  </Link>
);

export default CityResult;
