import DataRow from "./DataRow";

const ForecastDetails = ({ data }) => {
  const convertDateTime = unixTimestamp => new Date(unixTimestamp * 1000).toLocaleString();
  const convertTimezone = secondsOffset => {
    const gmtOffset = secondsOffset / 3600;
    return "GMT" + (secondsOffset >= 0 ? "+" : "") + gmtOffset;
  };
  return (
    <>
      <div className="mt-5">
        <DataRow label="Sunrise" value={convertDateTime(data.sunrise)} />
        <DataRow label="Sunset" value={convertDateTime(data.sunset)} />
      </div>
      <div>
        <DataRow label="Timezone" value={convertTimezone(data.timezone)} />
      </div>
    </>
  );
};

export default ForecastDetails;
