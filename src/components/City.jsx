import { useEffect, useState } from "react";
import { Accordion, Container, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Weather from "./Weather";
import Forecast from "./Forecast";
import ForecastDetails from "./ForecastDetails";

const City = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [weatherIsLoading, setWeatherIsLoading] = useState(true);
  const [forecastIsLoading, setForecastIsLoading] = useState(true);
  const params = useParams();
  const apiKey = "d222fd82607ccb2453ed93dc3c730566";
  const units = "metric";

  const fetchWeatherData = async () => {
    try {
      const endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${params.lat}&lon=${params.lon}&units=${units}&appid=${apiKey}`;
      const re = await fetch(endpoint);
      if (re.ok) {
        const data = await re.json();
        setWeatherData(data);
      } else {
        alert("Error fetching results");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setWeatherIsLoading(false);
    }
  };

  const fetchForecastData = async () => {
    try {
      const endpoint = `https://api.openweathermap.org/data/2.5/forecast?lat=${params.lat}&lon=${params.lon}&units=${units}&appid=${apiKey}`;
      const re = await fetch(endpoint);
      if (re.ok) {
        const data = await re.json();
        setForecastData(data);
      } else {
        alert("Error fetching results");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setForecastIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
    fetchForecastData();
  }, []);

  return (
    <>
      <Container className="my-5 text-center bg-light border">
        <h1 className="mb-3 my-5">Weather for {params.name}</h1>
        {weatherIsLoading && <Spinner variant="primary"></Spinner>}
        {weatherData && <Weather data={weatherData} />}
        {forecastIsLoading && <Spinner variant="primary"></Spinner>}
        {forecastData && (
          <>
            <Accordion>
              {forecastData.list.map((forecast, index) => (
                <Forecast data={forecast} key={index} index={index} />
              ))}
            </Accordion>
            <ForecastDetails data={forecastData.city} />
          </>
        )}
      </Container>
    </>
  );
};

export default City;
