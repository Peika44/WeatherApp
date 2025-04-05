# WeatherApp# Peike Xu - Weather App

This is a full-stack weather app built using React (frontend) and Node.js/Express (backend), powered by the OpenWeatherMap API and MongoDB for data storage.

## Live Demo
[https://weatherapp-xcdr.onrender.com](https://weatherapp-xcdr.onrender.com)
The backend may be sleep due to inactive

## Features
- Search weather by city or ZIP
- Use your current location to get weather
- Forecast for the next 5 days
- Save search records to MongoDB
- Edit or delete weather records
- Export records as CSV or JSON

## Tech Stack
- **Frontend**: React, Axios, Chart.js
- **Backend**: Node.js, Express, Mongoose
- **Database**: MongoDB Atlas
- **Hosting**: Render

## How to Run Locally

### 1. Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/weather-app.git
cd weather-app
```

### 2. Install requirements
```bash
npm list --depth=0 > requirements.txt
```

### 3. Set up backend
```bash
cd weather-app-backend
npm install
# Create .env file based on .env.example
npm start
```

### 4. Set up frontend
```bash
cd ../weather-app-frontend
npm install
# Create .env file based on .env.example
npm start
```