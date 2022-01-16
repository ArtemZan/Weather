import { SetParams } from "./utilities";

const API_URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata";
const API_KEY = "56LTXE6455LDZH5UZLJE546FK"

type CurrentWeatherConditions = {
    cloudcover: number
    datetime: number
    dew: number
    heatindex: any
    humidity: number
    icon: string
    moonphase: number
    precip: number
    sealevelpressure: number
    snowdepth: number
    stations: string
    sunrise: string
    sunset: string
    solarenergy: number
    solarradiation: number
    temp: number
    visibility: number
    wdir: number
    wgust: number
    windchill: number
    wspd: number
}

export type WeatherConditions = {
    cape: number,
    cin: number,
    cloudcover: number,
    conditions: string,
    datetime: number,
    dateTimeStr: string,
    dew: number,
    heatindex: any,
    humidity: number,
    maxt: number,
    mint: number,
    pop: number,
    precip: number,
    preciptype: string,
    sealevelpressure: number
    severerisk: number
    snow: number
    snowdepth: number
    solarenergy: number
    solarradiation: number
    temp: number
    uvindex: number
    visibility: number
    wdir: number
    wgust: number
    windchill: number
    wspd: number
}

type Location = {
    address: string,
    alerts: any,
    currentConditions: CurrentWeatherConditions,
    values: [WeatherConditions]
}

export type Forecast = {
    columns: {},
    locations: { [location: string]: Location}
};

export async function getForecast(locations: string, interval: number, period: number): Promise<Forecast> {
    const request = new XMLHttpRequest()

    request.open("get", SetParams(`${API_URL}/forecast`, { locations, forecastDays: period, aggregateHours: interval, key: API_KEY, contentType: "json" }));

    return new Promise((resolve, reject) => {
        request.onload = () => {
            resolve(JSON.parse(request.responseText) as Forecast)
            console.log(request.responseText);
        }

        request.onerror = reject;

        request.ontimeout = reject;

        request.send();
    })
}