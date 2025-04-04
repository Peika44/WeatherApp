// ForecastList.jsx
import React from 'react';

function ForecastList({ forecastsData }) {
  if (!forecastsData || forecastsData.length === 0) {
    return null;
  }

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>5-Day / 3-Hour Forecast</h2>
      <div style={cardsWrapperStyle}>
        {forecastsData.map((entry, index) => {
          // e.g. "2025-04-04 09:00:00"
          const dateTime = entry.dt_txt;
          // If using metric, temp is already °C
          const temp = entry.main?.temp.toFixed(1);
          const tempMin = entry.main?.temp_min.toFixed(1);
          const tempMax = entry.main?.temp_max.toFixed(1);
          const description = entry.weather[0].description;
          const icon = entry.weather[0].icon;
          const humidity = entry.main?.humidity;
          const windSpeed = entry.wind?.speed;

          return (
            <div key={index} style={cardStyle}>
              <p style={dateStyle}>{dateTime}</p>
              {icon && (
                <img
                  src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                  alt={description}
                  style={{ width: '50px', height: '50px' }}
                />
              )}
              <p>Temp: {temp}°C</p>
              <p>
                Min: {tempMin}°C / Max: {tempMax}°C
              </p>
              <p>Condition: {description}</p>
              <p>Humidity: {humidity}%</p>
              <p>Wind: {windSpeed} m/s</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Inline styles for demonstration */
const containerStyle = {
  marginTop: '2rem'
};

const titleStyle = {
  textAlign: 'center',
  marginBottom: '1rem'
};

const cardsWrapperStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '1rem',
  justifyContent: 'center'
};

const cardStyle = {
  width: '160px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '1rem',
  textAlign: 'center',
  background: '#fff',
  boxShadow: '0 2px 4px rgba(0,0,0,0.08)'
};

const dateStyle = {
  marginBottom: '0.5rem',
  fontWeight: 'bold'
};

export default ForecastList;
