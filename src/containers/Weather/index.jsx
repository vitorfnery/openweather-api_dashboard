import {
  API_URL,
  TEMPERATURE_RANGES,
  FETCH_ERRORS,
  WEATHER_INFO,
} from "~/constants";
import { useState, useEffect } from "react";
import axios from "axios";

import defaultIcon from "~assets/default-icon.png";

const Weather = () => {
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const apiUrl = API_URL;
  const temperatureRanges = TEMPERATURE_RANGES;
  const fetchErrors = FETCH_ERRORS;
  const { celsius, feels, humidity, percentage, wind, km_h } = WEATHER_INFO;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              const url = `${apiUrl}&lat=${latitude}&lon=${longitude}`;
              const response = await axios.get(url);
              setData(response.data);
            },
            (error) => {
              setError(`${fetchErrors.location}`);
            }
          );
        } else {
          setError(`${fetchErrors.geolocation}`);
        }
      } catch (error) {
        setError(`${fetchErrors.weatherData}`);
      }
    };
    fetchData();
    const intervalId = setInterval(fetchData, 300000);
    return () => {
      clearInterval(intervalId);
    };
  }, [apiUrl]);

  const fahrenheitToCelsius = (fahrenheit) => {
    return (fahrenheit - 32) * (5 / 9);
  };

  const mphToKph = (mph) => {
    return mph * 1.60934;
  };

  const getTemperatureIcon = (temperature) => {
    for (const range of temperatureRanges) {
      if (temperature >= range.min && temperature < range.max) {
        return range.icon;
      }
    }
    return defaultIcon;
  };

  return (
    <div className="app">
      {error ? (
        <div className="error">{error}</div>
      ) : (
        <div className="container">
          <div className="top">
            <div className="location">
              <p>{data.name}</p>
            </div>
            <div className="temp">
              {data.main && (
                <h1>
                  {fahrenheitToCelsius(data.main.temp).toFixed(1)}
                  {celsius}
                </h1>
              )}
            </div>
            <div className="description">
              {data.weather && <p>{data.weather[0].main}</p>}
            </div>
          </div>
          {data.name !== undefined && (
            <div className="bottom">
              <div className="feels">
                {data.main && (
                  <p className="bold">
                    {fahrenheitToCelsius(data.main.feels_like).toFixed(1)}
                    {celsius}
                  </p>
                )}
                <p>{feels}</p>
              </div>
              <div className="humidity">
                {data.main && <p className="bold">{data.main.humidity}%</p>}
                <p>{humidity}</p>
              </div>
              <div className="wind">
                {data.wind && (
                  <p className="bold">
                    {mphToKph(data.wind.speed).toFixed(2)}
                    {km_h}
                  </p>
                )}
                <p>{wind}</p>
              </div>
            </div>
          )}
          <div className="temperature-icon">
            {data.main && (
              <img
                src={getTemperatureIcon(data.main.temp.toFixed())}
                alt="Temperature Icon"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
