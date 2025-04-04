// ForecastChart.jsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  TimeScale,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import 'chartjs-adapter-date-fns';

// REGISTER ALL NEEDED PARTS
ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  TimeScale,
  Title,
  Tooltip,
  Legend
);


function ForecastChart({ forecastsData }) {
  if (!forecastsData || forecastsData.length === 0) return null;

  // Transform your forecast data into two arrays: one of timestamps, one of temps
  // Or better, build a single array of { x: dateObj, y: temperature } points
  const chartPoints = forecastsData.map((entry) => {
    // dt_txt is often something like "2025-04-04 09:00:00"
    const dateTime = new Date(entry.dt_txt.replace(' ', 'T')); 
    // If you're using metric units, entry.main.temp is already °C
    const temp = parseFloat(entry.main.temp.toFixed(1));
    return { x: dateTime, y: temp };
  });

  const data = {
    datasets: [
      {
        label: 'Temperature (°C)',
        data: chartPoints,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        tension: 0.25,
        pointRadius: 4
      }
    ]
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        type: 'time',
        time: {
          // Display as day & hour, e.g. "Apr 4, 09:00"
          displayFormats: {
            hour: 'MMM d, HH:mm'
          }
        },
        title: {
          display: true,
          text: 'Date/Time'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Temperature (°C)'
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          // e.g. "Apr 4, 09:00 - 9.3°C"
          label: function (context) {
            const dateStr = context.label;
            const value = context.parsed.y;
            return `${dateStr} — ${value}°C`;
          }
        }
      }
    }
  };

  return (
    <div style={{ marginBottom: '2rem' }}>
      <h2>5-Day Forecast (Temperature Trend)</h2>     
      <Line data={data} options={options} />
    </div>
  );
}

export default ForecastChart;
