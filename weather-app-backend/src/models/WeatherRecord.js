// src/models/WeatherRecord.js
const mongoose = require('mongoose');

const WeatherRecordSchema = new mongoose.Schema({
  location: String,
  type: String, // "zip", "city", "coordinates"
  timestamp: { type: Date, default: Date.now },
  weather: {
    temp: Number,
    feels_like: Number,
    temp_min: Number,
    temp_max: Number,
    pressure: Number,
    humidity: Number,
    wind_speed: Number,
    wind_deg: Number,
    description: String
  }
});

module.exports = mongoose.model('WeatherRecord', WeatherRecordSchema);
