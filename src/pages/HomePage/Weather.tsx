import { Dispatch, useEffect, useRef, useState } from "react";
import { getForecast, Forecast, WeatherConditions } from "API/forecast";
import TemperatureDiagram from "./TemperatureDiagram";
import Timeline from "./Timeline";
import Label from "./Label";


export default function Weather() {
  const [weather, SetWeather] = useState<Forecast>(null);
  const [location, SetLocation] = useState("")

  let forecastInterval = 1;
  const forecastPeriod = 6;
  const columnWidth = forecastInterval === 12 ? 50.5 : 30.04

  useEffect(() => {
    (async () => {
      //SetWeather(JSON.parse('{"columns":{"wdir":{"id":"wdir","name":"Wind Direction","type":2,"unit":null},"uvindex":{"id":"uvindex","name":"weather_uvindex","type":2,"unit":null},"latitude":{"id":"latitude","name":"Latitude","type":2,"unit":null},"preciptype":{"id":"preciptype","name":"weather_preciptype","type":1,"unit":null},"cin":{"id":"cin","name":"weather_cin","type":2,"unit":null},"cloudcover":{"id":"cloudcover","name":"Cloud Cover","type":2,"unit":null},"pop":{"id":"pop","name":"Chance Precipitation (%)","type":2,"unit":null},"mint":{"id":"mint","name":"Minimum Temperature","type":2,"unit":"degF"},"datetime":{"id":"datetime","name":"Date time","type":3,"unit":null},"precip":{"id":"precip","name":"Precipitation","type":2,"unit":"in"},"solarradiation":{"id":"solarradiation","name":"Solar Radiation","type":2,"unit":null},"dew":{"id":"dew","name":"Dew Point","type":2,"unit":"degf"},"humidity":{"id":"humidity","name":"Relative Humidity","type":2,"unit":null},"longitude":{"id":"longitude","name":"Longitude","type":2,"unit":null},"temp":{"id":"temp","name":"Temperature","type":2,"unit":"degf"},"address":{"id":"address","name":"Address","type":1,"unit":null},"maxt":{"id":"maxt","name":"Maximum Temperature","type":2,"unit":"degF"},"visibility":{"id":"visibility","name":"Visibility","type":2,"unit":"mi"},"wspd":{"id":"wspd","name":"Wind Speed","type":2,"unit":"mph"},"severerisk":{"id":"severerisk","name":"weather_severerisk","type":2,"unit":null},"solarenergy":{"id":"solarenergy","name":"Solar Energy","type":2,"unit":null},"resolvedAddress":{"id":"resolvedAddress","name":"Resolved Address","type":1,"unit":null},"heatindex":{"id":"heatindex","name":"Heat Index","type":2,"unit":"degf"},"snowdepth":{"id":"snowdepth","name":"Snow Depth","type":2,"unit":"in"},"sealevelpressure":{"id":"sealevelpressure","name":"Sea Level Pressure","type":2,"unit":"mb"},"snow":{"id":"snow","name":"Snow","type":2,"unit":"in"},"name":{"id":"name","name":"Name","type":1,"unit":null},"wgust":{"id":"wgust","name":"Wind Gust","type":2,"unit":"mph"},"conditions":{"id":"conditions","name":"Conditions","type":1,"unit":null},"windchill":{"id":"windchill","name":"Wind Chill","type":2,"unit":"degf"},"cape":{"id":"cape","name":"weather_cape","type":2,"unit":null}},"remainingCost":0,"queryCost":1,"messages":null,"locations":{"Herndon,VA,20170":{"stationContributions":null,"values":[{"wdir":350.0,"uvindex":0.0,"datetimeStr":"2022-01-14T18:00:00-05:00","preciptype":"","cin":0.0,"cloudcover":28.8,"pop":0.0,"mint":22.0,"datetime":1642183200000,"precip":0.0,"solarradiation":0.0,"dew":9.0,"humidity":59.0,"temp":23.5,"maxt":25.1,"visibility":15.0,"wspd":11.4,"severerisk":10.0,"solarenergy":0.0,"heatindex":null,"snowdepth":0.0,"sealevelpressure":1021.3,"snow":0.0,"wgust":16.1,"conditions":"Partially cloudy","windchill":10.5,"cape":0.0},{"wdir":124.2,"uvindex":1.3,"datetimeStr":"2022-01-15T06:00:00-05:00","preciptype":"","cin":0.0,"cloudcover":76.8,"pop":1.0,"mint":20.0,"datetime":1642226400000,"precip":0.0,"solarradiation":129.2,"dew":3.0,"humidity":41.2,"temp":24.6,"maxt":27.9,"visibility":15.0,"wspd":10.6,"severerisk":10.0,"solarenergy":0.5,"heatindex":null,"snowdepth":0.0,"sealevelpressure":1024.7,"snow":0.0,"wgust":16.1,"conditions":"Overcast","windchill":8.1,"cape":0.0},{"wdir":22.5,"uvindex":0.2,"datetimeStr":"2022-01-15T18:00:00-05:00","preciptype":"","cin":0.0,"cloudcover":39.6,"pop":8.0,"mint":16.1,"datetime":1642269600000,"precip":0.0,"solarradiation":20.0,"dew":2.2,"humidity":44.3,"temp":20.6,"maxt":26.0,"visibility":15.0,"wspd":5.8,"severerisk":10.0,"solarenergy":0.1,"heatindex":null,"snowdepth":0.0,"sealevelpressure":1026.8,"snow":0.0,"wgust":9.2,"conditions":"Partially cloudy","windchill":8.7,"cape":0.0},{"wdir":58.6,"uvindex":0.8,"datetimeStr":"2022-01-16T06:00:00-05:00","preciptype":"snow","cin":0.0,"cloudcover":66.1,"pop":88.7,"mint":15.0,"datetime":1642312800000,"precip":0.14,"solarradiation":79.3,"dew":7.7,"humidity":45.8,"temp":23.2,"maxt":29.0,"visibility":0.1,"wspd":8.7,"severerisk":10.0,"solarenergy":0.3,"heatindex":null,"snowdepth":0.1,"sealevelpressure":1021.6,"snow":1.3,"wgust":17.7,"conditions":"Snow, Partially cloudy","windchill":6.2,"cape":0.0},{"wdir":104.5,"uvindex":0.0,"datetimeStr":"2022-01-16T18:00:00-05:00","preciptype":"rain,snow","cin":0.0,"cloudcover":93.3,"pop":100.0,"mint":29.0,"datetime":1642356000000,"precip":0.74,"solarradiation":6.7,"dew":35.4,"humidity":87.3,"temp":33.2,"maxt":36.0,"visibility":0.1,"wspd":14.1,"severerisk":10.0,"solarenergy":0.0,"heatindex":null,"snowdepth":1.9,"sealevelpressure":995.1,"snow":2.2,"wgust":32.2,"conditions":"Snow, Overcast","windchill":17.4,"cape":0.0},{"wdir":278.6,"uvindex":1.4,"datetimeStr":"2022-01-17T06:00:00-05:00","preciptype":"snow","cin":-0.1,"cloudcover":73.1,"pop":40.0,"mint":33.0,"datetime":1642399200000,"precip":0.36,"solarradiation":146.8,"dew":27.4,"humidity":77.1,"temp":35.4,"maxt":36.9,"visibility":0.1,"wspd":16.1,"severerisk":10.0,"solarenergy":0.5,"heatindex":null,"snowdepth":0.5,"sealevelpressure":990.9,"snow":0.3,"wgust":31.8,"conditions":"Snow, Partially cloudy","windchill":22.9,"cape":7.8}],"id":"Herndon,VA,20170","address":"20170, Herndon, VA, United States","name":"Herndon,VA,20170","index":0,"latitude":38.9697,"longitude":-77.3859,"distance":0.0,"time":0.0,"tz":"America/New_York","currentConditions":{"wdir":312.0,"temp":30.0,"sunrise":"2022-01-15T07:26:52-05:00","visibility":9.9,"wspd":4.5,"icon":"clear-night","stations":"","heatindex":null,"cloudcover":0.0,"datetime":"2022-01-15T01:48:31-05:00","precip":0.0,"moonphase":0.46,"snowdepth":null,"sealevelpressure":1020.0,"dew":17.2,"sunset":"2022-01-15T17:11:32-05:00","humidity":58.5,"wgust":10.0,"windchill":25.2},"alerts":null}}}'))
    })()
  }, [])

  async function Search()
  {
    //"Herndon,VA,20170"
    SetWeather(await getForecast(location, forecastInterval, forecastPeriod));
  }


  const forecast = weather ? Object.values(weather.locations)[0].values : null;
  const temperature = forecast?.map((conditions: WeatherConditions) => (conditions.temp - 32) / 1.8);

  let date: Date[] = [new Date()]

  if (forecast) {
    for (let i = 1; i < forecast.length; i++) {
      date.push(new Date(date[0].getTime() + i * forecastInterval * 3.6e6));
    }
  }

  let dataOffset = Math.floor(new Date().getHours() / forecastInterval) * columnWidth

  if(dataOffset > 150)
  {
    dataOffset = 0;
  }

  console.log(forecast)

  return (
    <div className="weather">
      <input type="text" onChange = {e => void SetLocation(e.target.value) } />
      <button onClick = {Search}>Get forecast</button>
      {weather &&
        <div className="forecast">
          <Label />

          <div className="diagram">
            <div>
              <Timeline date={date} interval={forecastInterval} />
              <TemperatureDiagram temperatures={temperature} interval={forecastInterval} offset={dataOffset} />

              <div className="data" style={{ paddingLeft: dataOffset }}>
                {forecast.map((conditions, index) =>
                  <div style={{ flexBasis: columnWidth + "px" }} key={index}>
                    {Math.round((conditions.temp - 32) / 1.8)}
                    <i style={{ transform: `rotateZ(${conditions.wdir}deg)` }} className="fas fa-long-arrow-alt-right" />
                  </div>)}
              </div>
            </div>
          </div>
        </div>}
    </div>
  );
}