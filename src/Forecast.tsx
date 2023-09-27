import { useEffect, useState } from 'react';
import axios from 'axios';
import './Forecast.sass';

import config from './config';

const Forecast = ({ city } : any ) => {
    const [forecastData, setForecastData] = useState(null);

    const fetchData = async () => {
        try {
            const apiKey = config.REACT_APP_API_KEY;
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}&cnt=5`
            );
            setForecastData(response.data);
        } catch (error) {
            console.error('API Error:', error);
        }
    };    

    useEffect(() => {
        fetchData();
    }, [city]);

    const renderForecastData = () => {
        if (forecastData) {
          const groupedForecastData = {};
      
          forecastData.list.forEach((item) => {
            const date = new Date(item.dt * 1000);
            const day = date.toLocaleDateString('en-US', { weekday: 'long' });
      
            if (!groupedForecastData[day]) {
              groupedForecastData[day] = [];
            }
      
            groupedForecastData[day].push({
              tempMin: item.main.temp_min,
              tempMax: item.main.temp_max,
              weatherDescription: item.weather[0].description,
            });
          });
      
          return Object.keys(groupedForecastData).map((day) => {
            const dailyForecasts = groupedForecastData[day];
      
            return (
            <div>
              <div key={day} className='forecast-day-container'>
                <p className='forecast-day-text'>{day}</p>
                {dailyForecasts.map((forecast, index) => (
                  <div key={index} className='forecast-day-temp-container'>
                    <p className='forecast-day-temp-text'>{forecast.tempMin}°C - {forecast.tempMax}°C</p>
                    <p className='forecast-day-temp-text'>{forecast.weatherDescription}</p>
                  </div>
                ))}
              </div>
            </div>
            );
          });
        } else {
          return null;
        }
      };
      

    return (
        <div className='container'>
            <div className='forecast-day-container'>
                {renderForecastData()}
            </div>
        </div>
    );
};

export default Forecast;