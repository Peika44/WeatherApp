import React from 'react';

// A helper to convert a UNIX timestamp (in seconds) to a human-readable time string.
function formatUnixTime(unixTime) {
  if (!unixTime) return '--';
  const dateObj = new Date(unixTime * 1000); // Convert to milliseconds
  return dateObj.toLocaleString(); // e.g. "4/10/2025, 9:15:30 AM"
}

function WeatherDetails({ weatherData }) {
  // If no data, don't render anything
  if (!weatherData) return null;

  const {
    coord,
    weather,
    base,
    main,
    visibility,
    wind,
    rain,
    clouds,
    dt,
    sys,
    timezone,
    name
  } = weatherData;

  // Extract subfields safely
  const lat = coord?.lat;
  const lon = coord?.lon;
  const weatherMain = weather?.[0]?.main;
  const weatherDesc = weather?.[0]?.description;
  const weatherIcon = weather?.[0]?.icon;
  const temp = main?.temp;
  const feelsLike = main?.feels_like;
  const tempMin = main?.temp_min;
  const tempMax = main?.temp_max;
  const pressure = main?.pressure;
  const humidity = main?.humidity;
  const seaLevel = main?.sea_level;
  const grndLevel = main?.grnd_level;
  const windSpeed = wind?.speed;
  const windDeg = wind?.deg;
  const windGust = wind?.gust;
  const rain1h = rain?.['1h']; // if it exists
  const cloudiness = clouds?.all;
  const sunrise = sys?.sunrise;
  const sunset = sys?.sunset;
  const country = sys?.country;

  return (
    <div style={containerStyle}>
      <h2>Detailed Weather Info</h2>

      {/* Weather "header" section */}
      <div style={{ marginBottom: '1rem' }}>
        <h3>{name ? `${name}, ${country ?? ''}` : 'Unknown Location'}</h3>
        {weatherIcon && (
          <img
            src={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
            alt="Weather Icon"
            style={{ verticalAlign: 'middle' }}
          />
        )}
        <span style={{ marginLeft: '0.5rem', textTransform: 'capitalize' }}>
          {weatherDesc}
        </span>
      </div>

      <table style={tableStyle}>
        <tbody>
          <tr>
            <th style={thStyle}>Coordinates</th>
            <td style={tdStyle}>
              Lat: {lat ?? '--'}, Lon: {lon ?? '--'}
            </td>
          </tr>
          <tr>
            <th style={thStyle}>Temperature</th>
            <td style={tdStyle}>{temp !== undefined ? `${temp} K` : '--'}</td>
          </tr>
          <tr>
            <th style={thStyle}>Feels Like</th>
            <td style={tdStyle}>
              {feelsLike !== undefined ? `${feelsLike} K` : '--'}
            </td>
          </tr>
          <tr>
            <th style={thStyle}>Temp Min / Max</th>
            <td style={tdStyle}>
              {tempMin !== undefined ? tempMin : '--'} K /{' '}
              {tempMax !== undefined ? tempMax : '--'} K
            </td>
          </tr>
          <tr>
            <th style={thStyle}>Pressure</th>
            <td style={tdStyle}>{pressure !== undefined ? `${pressure} hPa` : '--'}</td>
          </tr>
          <tr>
            <th style={thStyle}>Humidity</th>
            <td style={tdStyle}>{humidity !== undefined ? `${humidity}%` : '--'}</td>
          </tr>
          <tr>
            <th style={thStyle}>Sea Level</th>
            <td style={tdStyle}>
              {seaLevel !== undefined ? `${seaLevel} hPa` : '--'}
            </td>
          </tr>
          <tr>
            <th style={thStyle}>Ground Level</th>
            <td style={tdStyle}>
              {grndLevel !== undefined ? `${grndLevel} hPa` : '--'}
            </td>
          </tr>
          <tr>
            <th style={thStyle}>Wind Speed</th>
            <td style={tdStyle}>
              {windSpeed !== undefined ? `${windSpeed} m/s` : '--'}
            </td>
          </tr>
          <tr>
            <th style={thStyle}>Wind Direction</th>
            <td style={tdStyle}>{windDeg !== undefined ? `${windDeg}°` : '--'}</td>
          </tr>
          <tr>
            <th style={thStyle}>Wind Gust</th>
            <td style={tdStyle}>
              {windGust !== undefined ? `${windGust} m/s` : '--'}
            </td>
          </tr>
          <tr>
            <th style={thStyle}>Rain (1h)</th>
            <td style={tdStyle}>{rain1h !== undefined ? `${rain1h} mm` : 'None'}</td>
          </tr>
          <tr>
            <th style={thStyle}>Cloudiness</th>
            <td style={tdStyle}>
              {cloudiness !== undefined ? `${cloudiness}%` : '--'}
            </td>
          </tr>
          <tr>
            <th style={thStyle}>Visibility</th>
            <td style={tdStyle}>
              {visibility !== undefined ? `${visibility} m` : '--'}
            </td>
          </tr>
          <tr>
            <th style={thStyle}>Sunrise</th>
            <td style={tdStyle}>{formatUnixTime(sunrise)}</td>
          </tr>
          <tr>
            <th style={thStyle}>Sunset</th>
            <td style={tdStyle}>{formatUnixTime(sunset)}</td>
          </tr>
          <tr>
            <th style={thStyle}>Data Time</th>
            <td style={tdStyle}>{formatUnixTime(dt)}</td>
          </tr>
          <tr>
            <th style={thStyle}>Timezone</th>
            <td style={tdStyle}>
              {timezone !== undefined ? `${timezone / 3600} hrs` : '--'}
            </td>
          </tr>
          <tr>
            <th style={thStyle}>Base</th>
            <td style={tdStyle}>{base ?? '--'}</td>
          </tr>
          <tr>
            <th style={thStyle}>Weather Main</th>
            <td style={tdStyle}>{weatherMain ?? '--'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

// Basic inline styles
const containerStyle = {
  marginTop: '1rem',
  border: '1px solid #ccc',
  borderRadius: '6px',
  padding: '1rem',
  background: '#fdfdfd',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
};

const thStyle = {
  textAlign: 'left',
  padding: '6px',
  border: '1px solid #ccc',
  width: '40%',
  background: '#f5f5f5',
};

const tdStyle = {
  padding: '6px',
  border: '1px solid #ccc',
};

export default WeatherDetails;
