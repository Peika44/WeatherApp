// src/components/WeatherForm.jsx
import React, { useState } from 'react';

function WeatherForm({ onSearch }) {
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!location.trim()) return;
    onSearch(location.trim());
    setLocation('');
  };

  const handleCurrentLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          // Pass lat/lon as object
          onSearch({ lat: latitude, lon: longitude });
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Failed to get current location. Check permissions.');
        }
      );
    } else {
      alert('Geolocation not supported in this browser.');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form-group">
        <input
          type="text"
          placeholder="Enter city or ZIP"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <button onClick={handleCurrentLocation} className="location-button">
        Use My Current Location
      </button>
    </>
  );
}

export default WeatherForm;