import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Weather.sass';

import HumidityIcon from './assets/stat-icons/humidity-icon.svg';
import WindIcon from './assets/stat-icons/wind-icon.svg';
import SunsetIcon from './assets/stat-icons/sunset-icon.svg';

import Cloudy from './assets/weather-images/cloudy.svg';
import ClearNight from './assets/weather-images/clear-night.svg';
import ClearDay from './assets/weather-images/clear-day.svg';
import PartCloudyDay from './assets/weather-images/part-cloudy-day.svg'
import PartCloudyNight from './assets/weather-images/part-cloudy-night.svg'
import Rain from './assets/weather-images/rain.svg'
import Thunder from './assets/weather-images/thunder.svg'
import Snow from './assets/weather-images/snow.svg'
import Fog from './assets/weather-images/fog.svg'

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState(null);

  const weatherIconSvg = {
    '01n': {
      icon: ClearNight,
      backgroundSize: '225px',
    },
    '01d': {
      icon: ClearDay,
      backgroundSize: '225px',
    },
    '02d': {
      icon: PartCloudyDay,
      backgroundSize: '380px',
    },
    '02n': {
      icon: PartCloudyNight,
      backgroundSize: '380px',
    },
    '03d': {
      icon: Cloudy,
      backgroundSize: '450px',
    },
    '03n': {
      icon: Cloudy,
      backgroundSize: '450px',
    },
    '04d': {
      icon: Cloudy,
      backgroundSize: '450px',
    },
    '04n': {
      icon: Cloudy,
      backgroundSize: '450px',
    },
    '09d': {
      icon: Rain,
      backgroundSize: '450px',
    },
    '09n': {
      icon: Rain,
      backgroundSize: '450px',
    },
    '10n': {
      icon: Rain,
      backgroundSize: '430px',
    },
    '10d': {
      icon: Rain,
      backgroundSize: '400px',
    },
    '11n': {
      icon: Thunder,
      backgroundSize: '350px',
    },
    '11d': {
      icon: Thunder,
      backgroundSize: '400px',
    },
    '13d': {
      icon: Snow,
      backgroundSize: '245px',
    },
    '13n': {
      icon: Snow,
      backgroundSize: '245px',
    },
    '50d': {
      icon: Fog,
      backgroundSize: '350px',
    },
    '50n': {
      icon: Fog,
      backgroundSize: '350px',
    },
  };
  
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=6c938d5b685b87e4798fbf1191cb5816`
      );
      setWeatherData(response.data);
      calculateCurrentTime(response.data.timezone);
      setWeatherIcon(weatherIconSvg[response.data.weather[0].icon] || null);
    } catch (error) {
      console.error(error);
    }
  };

  const calculateCurrentTime = (timezone: any) => {
    const offsetInSeconds = timezone;
  
    const updateTime = () => {
      const localTime = new Date();
      const localOffsetInMilliseconds = localTime.getTimezoneOffset() * 60 * 1000;
      const chosenLocationTime = new Date(localTime.getTime() + (offsetInSeconds * 1000) + localOffsetInMilliseconds);
  
      setCurrentTime(chosenLocationTime);
    };
  
    // Update the time every second
    const intervalId = setInterval(updateTime, 1000);
  
    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  };

  const formatTime = (time : any) => {
    const options = { hour: 'numeric', minute: '2-digit', hour12: true };
    return new Intl.DateTimeFormat('en-US', options).format(time);
  };

  const formatSunsetTime = (time) => {
    let timeToMilliseconds = time * 1000;
    const options = { hour: 'numeric', minute: '2-digit', hour12: true };
    return new Intl.DateTimeFormat('en-US', options).format(timeToMilliseconds);
  }
  
  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e : any) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e : any) => {
    e.preventDefault();
    fetchData();
};


  return (
    <div className='weather-container'>
      <div className='topbar'>
        <form onSubmit={handleSubmit} className='weather-search-container'>
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={handleInputChange}
            className='searchbox'
          />
          <button type="submit" className='searchbutton'></button>
        </form>
      </div>

      {weatherData ? (
        <div className='weather-response-container'>
          <div className='location-n-time'>
            <h2 className='weather-city-name response-item'>{(weatherData.name).toUpperCase()}</h2>
            {currentTime && <p className='city-time response-item'>{formatTime(currentTime)}</p>}
          </div>
          <div className='temp-n-img' style={{ 
        backgroundImage: `url(${weatherIcon?.icon})`,
        backgroundSize: weatherIcon?.backgroundSize || 'auto'
      }}>
            <p className='temp'>{Math.floor(weatherData.main.temp)}</p><p className='temp-cf'>°C</p>
          </div>
          
          <p className='weather-desc'>{(weatherData.weather[0].description).toUpperCase()}</p>

          <div className='weather-stats-container'>
            <div className='weather-stat left-stat-box'>
              <img src={HumidityIcon} alt="Humidity Icon" className='stat-icon' />
              <div className='stat-text-container'>
                <p className='stat-text'>{weatherData.main.humidity}</p><p className='stat-text-addon'>%</p>
              </div>
            </div>
            <div className='weather-stat'>
              <img src={WindIcon} alt="Wind Icon" className='stat-icon wind-icon' style={{transform: `rotate(${weatherData.wind.deg}deg)`}} />
              <div className='stat-text-container'>
                <p className='stat-text'>{weatherData.wind.speed}</p><p className='stat-text-addon'>m/s</p>
              </div>
            </div>
            <div className='weather-stat right-stat-box'>
              <img src={SunsetIcon} alt="Sunset Icon" className='stat-icon sunset-icon' />
              <div className='stat-text-container'>
                <p className='stat-text'>{formatSunsetTime(weatherData.sys.sunset)}</p><p className='stat-text-addon'></p>
              </div>
            </div>
          </div>

          
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default Weather;
