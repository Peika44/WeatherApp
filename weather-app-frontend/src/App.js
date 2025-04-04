import React, { useState } from 'react';
import axios from 'axios';
import WeatherForm from './components/WeatherForm';
import WeatherDisplay from './components/WeatherDisplay';
import ForecastList from './components/ForecastList';
import WeatherDetails from './components/WeatherDetails';
import ForecastChart from './components/ForecastChart';
import './index.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
  
  if (!API_KEY) {
    alert('Please set your OpenWeatherMap API key in the .env file');
    return null;
  }

  const handleSearch = async (locationInput) => {
    try {

      let weatherUrl;
      let forecastUrl;

      if (typeof locationInput === 'object') {
        // { lat, lon } scenario
        const { lat, lon } = locationInput;
        weatherUrl = process.env.REACT_APP_WEATHER_API_URL + `/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
        forecastUrl = process.env.REACT_APP_WEATHER_API_URL + `/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
      } else {
        // City name or ZIP code scenario
        weatherUrl = process.env.REACT_APP_WEATHER_API_URL + `/weather?q=${locationInput}&units=metric&appid=${API_KEY}`;
        forecastUrl = process.env.REACT_APP_WEATHER_API_URL + `/forecast?q=${locationInput}&units=metric&appid=${API_KEY}`;
      }

      // Fetch both current weather & forecast in parallel
      const [weatherRes, forecastRes] = await Promise.all([
        axios.get(weatherUrl),
        axios.get(forecastUrl)
      ]);

      setWeatherData(weatherRes.data);
      setForecastData(forecastRes.data.list || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Location not found or API request failed. Please try again.');
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Peike Xu - Weather App</h1>
        <p>
          Powered by PM Accelerator — The Product Manager Accelerator Program is designed to support PM professionals through every stage of their careers. From students looking for entry-level jobs to Directors looking to take on a leadership role, our program has helped over hundreds of students fulfill their career aspirations.

          Our Product Manager Accelerator community are ambitious and committed. Through our program they have learnt, honed and developed new PM and leadership skills, giving them a strong foundation for their future endeavors.</p>
      </header>

      <div className="content-section">
        <h2>Weather App</h2>
        <WeatherForm onSearch={handleSearch} />
        {/* <WeatherDisplay weatherData={weatherData} /> */}
        <WeatherDetails weatherData={weatherData} />
        <h2>Forecast</h2>
        <ForecastChart forecastsData={forecastData} />
        {/* <ForecastList forecastsData={forecastData} /> */}
      </div>
    </div>
  );
}

export default App;
