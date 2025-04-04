// src/components/WeatherDisplay.jsx
import React from 'react';

function WeatherDisplay({ weatherData }) {
  if (!weatherData) {
    return <p>Enter a location above to see current weather...</p>;
  }

  const { main, weather, name, sys } = weatherData;
  if (!main || !weather) return null; // Guard in case data is incomplete

  const temperature = main.temp;
  const description = weather[0]?.description || '';
  const iconCode = weather[0]?.icon;
  const country = sys?.country || '';

  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  return (
    <div className="weather-display">
      <h3>{name}, {country}</h3>
      <p>Temperature: {temperature}°C</p>
      <p>Condition: {description}</p>
      {iconCode && <img src={iconUrl} alt="Weather icon" />}
    </div>
  );
}

export default WeatherDisplay;
