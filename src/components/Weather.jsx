import { useSelector } from "react-redux";
import DataRow from "./DataRow";

const Weather = ({ data, datetimeFunctions }) => {
  const { convertDateTime, convertTimezone } = datetimeFunctions;

  const detailedView = useSelector(state => state.detailedView);
  return (
    <>
      {!detailedView && (
        <article className="mb-5">
          <div className="d-flex mb-3 justify-content-center align-items-center">
            <p className="display-6 me-4 mb-0">
              {data.weather[0].main} — {data.weather[0].description}
            </p>
            <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="weather icon" />
          </div>
          <DataRow label="Current" value={Math.round(data.main.temp)} unit="°C" />
          <DataRow label="Min" value={Math.round(data.main.temp_min)} unit="°C" />
          <DataRow label="Max" value={Math.round(data.main.temp_max)} unit="°C" />
        </article>
      )}
      {detailedView && (
        <article>
          <div className="d-flex mb-5 justify-content-center align-items-center">
            <p className="display-6 me-4 mb-0">
              {data.weather[0].main} — {data.weather[0].description}
            </p>
            <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="weather icon" />
          </div>
          <div className="mb-4">
            <h3 className="mb-4">Temperature</h3>
            <DataRow label="Current" value={Math.round(data.main.temp)} unit="°C" />
            <DataRow label="Feels like" value={Math.round(data.main.feels_like)} unit="°C" />
            <DataRow label="Min" value={Math.round(data.main.temp_min)} unit="°C" />
            <DataRow label="Max" value={Math.round(data.main.temp_max)} unit="°C" />
          </div>
          <div className="mb-4">
            <h3 className="mb-4">Pressure</h3>
            <DataRow label="At sea level" value={data.main.pressure} unit="hPa" />
            {data.main.grnd_level !== undefined && (
              <DataRow label="At ground level" value={data.main.grnd_level} unit="hPa" />
            )}
          </div>
          <div>
            <DataRow label="Humidity" value={data.main.humidity} unit="%" />
          </div>
          <div className="mb-4">
            <DataRow label="Visibility" value={data.visibility} unit="m" />
          </div>
          <div className="mb-4">
            <h3 className="mb-4">Wind</h3>
            <DataRow label="Speed" value={data.wind.speed} unit="m/s" />
            <DataRow label="Direction" value={data.wind.deg} unit="°" />
            {data.wind.gust !== undefined && <DataRow label="Gust" value={data.wind.gust} unit="m/s" />}
          </div>
          {data.clouds.all !== undefined && (
            <div className="mb-4">
              <DataRow label="Cloudiness" value={data.clouds.all} unit="%" />
            </div>
          )}
          {data.rain !== undefined && (
            <div className="mb-4">
              <h3 className="mb-4">Rain volume:</h3>
              {data.rain["1h"] !== undefined && (
                <DataRow label="Rain volume (last 1 hour)" value={data.rain["1h"]} unit="mm" />
              )}
              {data.rain["3h"] !== undefined && (
                <DataRow label="Rain volume (last 3 hours)" value={data.rain["3h"]} unit="mm" />
              )}
            </div>
          )}
          {data.snow !== undefined && (
            <div className="mb-4">
              <h3 className="mb-4">Snow volume:</h3>
              {data.snow["1h"] !== undefined && (
                <DataRow label="Snow volume (last 1 hour)" value={data.snow["1h"]} unit="mm" />
              )}
              {data.snow["3h"] !== undefined && (
                <DataRow label="Snow volume (last 3 hours)" value={data.snow["3h"]} unit="mm" />
              )}
            </div>
          )}
          <div className="mb-4">
            <DataRow label="Measure date" value={convertDateTime(data.dt)} />
          </div>
          <div className="mb-4">
            <DataRow label="Sunrise" value={convertDateTime(data.sys.sunrise)} />
            <DataRow label="Sunset" value={convertDateTime(data.sys.sunset)} />
          </div>
          <div className="mb-4">
            <DataRow label="Timezone" value={convertTimezone(data.timezone)} />
          </div>
        </article>
      )}
    </>
  );
};

export default Weather;
