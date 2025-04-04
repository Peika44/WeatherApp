import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherForm from './components/WeatherForm';
import WeatherDetails from './components/WeatherDetails';
import ForecastChart from './components/ForecastChart';
import SavedRecords from './components/SavedRecords';
import './index.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [history, setHistory] = useState([]);

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000/api/weather';

  const handleSearch = async (locationInput) => {
    try {
      const isCoords = typeof locationInput === 'object';
      const query = isCoords
        ? `lat=${locationInput.lat}&lon=${locationInput.lon}`
        : `city=${locationInput}`;
  
      // Get current weather & save to DB
      const weatherRes = await axios.post(`${BACKEND_URL}?${query}`);
      setWeatherData(weatherRes.data);
  
      // Get forecast from backend
      const forecastRes = await axios.get(
        `${BACKEND_URL}/forecast?${query}`
      );
      setForecastData(forecastRes.data.list || []);
  
      fetchHistory(); // Refresh history list
    } catch (error) {
      console.error('Error fetching from backend:', error);
      alert('Weather fetch failed. Please try again.');
    }
  };
  

  const fetchHistory = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/`);
      setHistory(res.data);
    } catch (err) {
      console.error('Error fetching history:', err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="container">
      <header>
        <h1>Peike Xu - Weather App</h1>
        <p>
          Powered by PM Accelerator — The Product Manager Accelerator Program is designed to support PM professionals through every stage of their careers.
        </p>
      </header>

      <div className="content-section">
        <h2>Weather App</h2>
        <WeatherForm onSearch={handleSearch} />
        <WeatherDetails weatherData={weatherData} />

        <ForecastChart forecastsData={forecastData} />

        <SavedRecords records={history} refreshRecords={fetchHistory} />
      </div>
    </div>
  );
}

export default App;
