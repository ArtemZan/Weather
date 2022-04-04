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