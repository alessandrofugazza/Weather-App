import { useEffect, useState } from "react";
import { Accordion, Container, Form, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Weather from "./Weather";
import Forecast from "./Forecast";
import { useDispatch, useSelector } from "react-redux";

const City = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [weatherIsLoading, setWeatherIsLoading] = useState(true);
  const [forecastIsLoading, setForecastIsLoading] = useState(true);

  const detailedView = useSelector(state => state.detailedView);
  const dispatch = useDispatch();

  // Functions for Weather and Forecast
  const convertDateTime = unixTimestamp => new Date(unixTimestamp * 1000).toLocaleString();
  const convertTimezone = secondsOffset => {
    const gmtOffset = secondsOffset / 3600;
    return "GMT" + (secondsOffset >= 0 ? "+" : "") + gmtOffset;
  };
  const datetimeFunctions = { convertDateTime, convertTimezone };

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Container className="my-5 pb-3 text-center bg-light border">
        <Form.Switch // prettier-ignore
          type="switch"
          id="custom-switch"
          label="Detailed View"
          className="d-flex justify-content-end mt-2 gap-2"
          checked={detailedView}
          onChange={() => dispatch({ type: "TOGGLE_DETAILED_VIEW" })}
        />
        <h1 className="mb-3 mt-4 ">{params.name}</h1>
        {weatherIsLoading && <Spinner variant="primary"></Spinner>}
        {weatherData && <Weather data={weatherData} datetimeFunctions={datetimeFunctions} />}
        {forecastIsLoading && <Spinner variant="primary"></Spinner>}
        {forecastData && (
          <>
            <Accordion>
              {forecastData.list.map((forecast, index) => (
                <Forecast data={forecast} key={index} index={index} datetimeFunctions={datetimeFunctions} />
              ))}
            </Accordion>
          </>
        )}
      </Container>
    </>
  );
};

export default City;
