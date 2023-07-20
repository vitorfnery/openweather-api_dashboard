import { coldIcon, coolIcon, warmIcon, hotIcon } from "~assets/index";

export const API_URL = "https://api.openweathermap.org/data/2.5/weather?units=imperial&appid=05a78b471208af1a5ec6e7e595479c43"

export const TEMPERATURE_RANGES = [
    { min: 0, max: 41, icon: coldIcon },
    { min: 41, max: 59, icon: coolIcon },
    { min: 59, max: 75.2, icon: warmIcon },
    { min: 75.2, max: 104, icon: hotIcon },
  ];

export const WEATHER_INFO = {
    celsius: "°C",
    feels: "Feels Like",
    humidity: "Humidity",
    percentage: "%",
    wind: "Wind Speed",
    km_h : "Km/h"
}