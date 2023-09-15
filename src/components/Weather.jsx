import DataRow from "./DataRow";

const Weather = ({ data }) => {
  const convertDateTime = unixTimestamp => new Date(unixTimestamp * 1000).toLocaleString();
  const convertTimezone = secondsOffset => {
    const gmtOffset = secondsOffset / 3600;
    return "GMT" + (secondsOffset >= 0 ? "+" : "") + gmtOffset;
  };
  //   le funzioni sopra non sapevo se passarle come props visto che si ripetono in altri components,
  //   ma preferisco tenere solo data nelle props anche perche' non c'entrano molto con il il contenuto di City.jsx
  return (
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
        {data.main.grnd_level && <DataRow label="At ground level" value={data.main.grnd_level} unit="hPa" />}
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
        {data.wind.gust && <DataRow label="Gust" value={data.wind.gust} unit="m/s" />}
      </div>
      <div className="mb-4">{data.clouds.all && <DataRow label="Cloudiness" value={data.clouds.all} unit="%" />}</div>
      <div className="mb-4">
        {data.rain && (
          <>
            <h3 className="mb-4">Rain volume:</h3>
            {data.rain["1h"] && <DataRow label="Rain volume (last 1 hour)" value={data.rain["1h"]} unit="mm" />}
            {data.rain["3h"] && <DataRow label="Rain volume (last 3 hours)" value={data.rain["3h"]} unit="mm" />}
          </>
        )}
      </div>
      <div className="mb-4">
        {data.snow && (
          <>
            <h3 className="mb-4">Snow volume:</h3>
            {data.snow["1h"] && <DataRow label="Snow volume (last 1 hour)" value={data.snow["1h"]} unit="mm" />}
            {data.snow["3h"] && <DataRow label="Snow volume (last 3 hours)" value={data.snow["3h"]} unit="mm" />}
          </>
        )}
      </div>
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
  );
};

export default Weather;
