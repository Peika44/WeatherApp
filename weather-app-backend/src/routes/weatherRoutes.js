// src/routes/weatherRoutes.js
const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const router = express.Router();
mongoose.set('debug', true);

const weatherController = require('../controllers/weatherController');
const WeatherRecord = require('../models/WeatherRecord');

// CREATE
router.post('/', weatherController.createRecord);
// READ
router.get('/', weatherController.getRecords);
// UPDATE
router.put('/:id', weatherController.updateRecord);
// DELETE
router.delete('/:id', weatherController.deleteRecord);

router.get('/forecast', weatherController.getForecast);

router.get('/export', weatherController.exportRecords);

module.exports = router;
