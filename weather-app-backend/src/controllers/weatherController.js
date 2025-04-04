// src/controllers/weatherController.js
const WeatherRecord = require('../models/WeatherRecord');
const axios = require('axios');

exports.createRecord = async (req, res) => {
    const { city, lat, lon } = req.query;
    console.log('Received city or ZIP code:', city);

    WEATHER_API_KEY = process.env.WEATHER_API_KEY;
    WEATHER_API_URL = process.env.WEATHER_API_URL;
  
    // if (!city) {
    //   return res.status(400).json({ error: 'City or ZIP code is required.' });
    // }
  
    try {
      let endpoint = '';
      let locationLabel = '';
      let type = '';
  
      if (lat && lon) {
        // Handle coordinates
        endpoint = `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`;
        locationLabel = `Lat: ${lat}, Lon: ${lon}`;
        type = 'coordinates';
      } else if (city) {
        // Handle city or ZIP
        const isZip = /^\d{5}$/.test(city);
        endpoint = isZip
          ? `${WEATHER_API_URL}/weather?zip=${city},us&units=metric&appid=${WEATHER_API_KEY}`
          : `${WEATHER_API_URL}/weather?q=${city}&units=metric&appid=${WEATHER_API_KEY}`;
        locationLabel = city;
        type = isZip ? 'zip' : 'city';
      } else {
        return res.status(400).json({ error: 'City or lat/lon required.' });
      }
  
      const weatherRes = await axios.get(endpoint);
      const data = weatherRes.data;
  
      console.log('Weather data fetched:', data);
  
      // Save to MongoDB
      await WeatherRecord.create({
        location: city,
        type,
        weather: {
          temp: data.main.temp,
          feels_like: data.main.feels_like,
          temp_min: data.main.temp_min,
          temp_max: data.main.temp_max,
          pressure: data.main.pressure,
          humidity: data.main.humidity,
          wind_speed: data.wind.speed,
          wind_deg: data.wind.deg,
          description: data.weather[0].description
        }
      });
      console.log('Weather data saved to MongoDB:', data);
  
      res.json(data); // send live weather to frontend
    } catch (err) {
      console.error('Error fetching or saving weather:', err.message);
      res.status(500).json({ error: 'Failed to fetch weather data' });
    }
  };

exports.getRecords = async (req, res) => {
  try {
    const records = await WeatherRecord.find({});
    return res.status(200).json(records);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const { location } = req.body;

    if (!location) {
      return res.status(400).json({ error: 'Location is required.' });
    }

    const isZip = /^\d{5}$/.test(location);
    const API_KEY = process.env.WEATHER_API_KEY;
    const API_URL = process.env.WEATHER_API_URL;

    const endpoint = isZip
      ? `${API_URL}/weather?zip=${location},us&units=metric&appid=${API_KEY}`
      : `${API_URL}/weather?q=${location}&units=metric&appid=${API_KEY}`;

    const response = await axios.get(endpoint);
    const data = response.data;

    const updated = await WeatherRecord.findByIdAndUpdate(
      id,
      {
        location,
        type: isZip ? 'zip' : 'city',
        weather: {
          temp: data.main.temp,
          feels_like: data.main.feels_like,
          temp_min: data.main.temp_min,
          temp_max: data.main.temp_max,
          pressure: data.main.pressure,
          humidity: data.main.humidity,
          wind_speed: data.wind.speed,
          wind_deg: data.wind.deg,
          description: data.weather[0].description,
        }
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Record not found' });
    }

    return res.status(200).json(updated);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to update record' });
  }
};


exports.deleteRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRecord = await WeatherRecord.findByIdAndDelete(id);

    if (!deletedRecord) {
      return res.status(404).json({ error: 'Record not found.' });
    }
    return res.status(200).json({ message: 'Record deleted successfully.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getForecast = async (req, res) => {
  const { city, lat, lon } = req.query;
  const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
  const WEATHER_API_URL = process.env.WEATHER_API_URL;

  if (!WEATHER_API_KEY || !WEATHER_API_URL) {
    return res.status(500).json({ error: 'API key or URL is missing' });
  }

  try {
    let endpoint;
    if (lat && lon) {
      endpoint = `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`;
    } else if (city) {
      const isZip = /^\d{5}$/.test(city);
      endpoint = isZip
        ? `${WEATHER_API_URL}/forecast?zip=${city},us&units=metric&appid=${WEATHER_API_KEY}`
        : `${WEATHER_API_URL}/forecast?q=${city}&units=metric&appid=${WEATHER_API_KEY}`;
    } else {
      return res.status(400).json({ error: 'Missing city or coordinates' });
    }

    const forecastRes = await axios.get(endpoint);
    res.status(200).json(forecastRes.data);
  } catch (err) {
    console.error('Forecast error:', err.message);
    res.status(500).json({ error: 'Failed to fetch forecast data' });
  }
};



exports.exportRecords = async (req, res) => {
  try {
    const format = req.query.format || 'json';
    const records = await WeatherRecord.find({});

    if (format === 'json') {
      res.setHeader('Content-Type', 'application/json');
      return res.status(200).json(records);
    }

    if (format === 'csv') {
      const headers = 'Location,Type,Temp,Feels Like,Min Temp,Max Temp,Pressure,Humidity,Wind Speed,Wind Deg,Description\n';
      const rows = records.map(r =>
        `${r.location},${r.type},${r.weather.temp},${r.weather.feels_like},${r.weather.temp_min},${r.weather.temp_max},${r.weather.pressure},${r.weather.humidity},${r.weather.wind_speed},${r.weather.wind_deg},"${r.weather.description}"`
      ).join('\n');

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=\"weather_records.csv\"');
      return res.status(200).send(headers + rows);
    }

    return res.status(400).json({ error: 'Unsupported format' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
