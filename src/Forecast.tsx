import { useEffect, useState } from 'react';
import axios from 'axios';
import './Forecast.sass';
import config from './config';

const Forecast = ({ city }: any) => {
  const [forecastData, setForecastData] = useState<{ [key: string]: any } | null>(null);

  const fetchData = async () => {
    try {
      const apiKey = config.REACT_APP_API_KEY;
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
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
      const groupedForecastData: { [key: string]: any[] } = {};

      forecastData.list.forEach((item: any) => {
        const date = new Date(item.dt * 1000);
        const day = date.toLocaleDateString('en-US', { weekday: 'long' });
        const dayNumber = date.getDate();

        if (!groupedForecastData[day]) {
          groupedForecastData[day] = [];
        }

        groupedForecastData[day].push({
          hour: date.toLocaleTimeString('en-US', { hour: 'numeric' }),
          temp: Math.floor(item.main.temp),
          weatherIcon: (item.weather[0].main).toUpperCase(),
          dayNumber,
        });
      });

      return Object.keys(groupedForecastData).map((day) => {
        const dailyForecasts = groupedForecastData[day];

        return (
          <div className='forecast-day-container' key={day}>
            <div className='forecast-day'>
              <p className='forecast-day-number'>{dailyForecasts[0].dayNumber}</p>
              <p className='forecast-day-text'>{day}</p>
            </div>
            <div className='forecast-hour-container'>
              {dailyForecasts.map((forecast: any, index: any) => (
                <div key={index} className='forecast-hour-item'>
                  <p className='fc-item forecast-hour-text'>{forecast.hour}</p>
                  <p className='fc-item forecast-hour-temp-text'>{forecast.temp}°C</p>
                  <p className='fc-item forecast-hour-description-text'>{forecast.weatherIcon}</p>
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

  return <div className='container'>{renderForecastData()}</div>;
};

export default Forecast;
