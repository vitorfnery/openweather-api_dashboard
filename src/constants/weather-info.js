import coldIcon from "~assets/cold-icon.png";
import coolIcon from "~assets/cool-icon.png";
import warmIcon from "~assets/warm-icon.png";
import hotIcon from "~assets/hot-icon.png";

export const API_URL = "https://api.openweathermap.org/data/2.5/weather?units=imperial&appid=05a78b471208af1a5ec6e7e595479c43"

export const TEMPERATURE_RANGES = [
    { min: -100, max: 0, icon: coldIcon },
    { min: 0, max: 40, icon: coolIcon },
    { min: 40, max: 80, icon: warmIcon },
    { min: 80, max: 100, icon: hotIcon },
  ];

export const WEATHER_INFO = {
    celsius: "°C",
    feels: "Feels Like",
    humidity: "Humidity",
    percentage: "%",
    wind: "Wind Speed",
    km_h : "Km/h"
}