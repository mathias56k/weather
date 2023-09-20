import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Weather.sass';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=ILEAKEDMYAPIKEYButDontWorryIGotANewOneAndDisabledTheOldOne:)`
      );
      setWeatherData(response.data);
      calculateCurrentTime(response.data.timezone);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const calculateCurrentTime = (timezone) => {
    const offsetInSeconds = timezone; // Timezone offset in seconds (e.g., 10800 for Tallinn)
  
    const updateTime = () => {
      const localTime = new Date();
      const localOffsetInMilliseconds = localTime.getTimezoneOffset() * 60 * 1000; // Convert minutes to milliseconds
      const chosenLocationTime = new Date(localTime.getTime() + (offsetInSeconds * 1000) + localOffsetInMilliseconds);
  
      setCurrentTime(chosenLocationTime);
    };
  
    // Update the time every second
    const intervalId = setInterval(updateTime, 1000);
  
    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
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
          <button type="submit" className='searchbutton'>Get Weather</button>
        </form>
        <button className='cfbtn'>°C</button>
        <button className='cfbtn'>°F</button>
      </div>

      {weatherData ? (
        <div className='weather-response-container'>
          <h2 className='weather-city-name response-item'>{weatherData.name}</h2>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt='Weather Icon'
            className='weather-icon'
          />
          <p className='response-item'>Temperature: {Math.floor(weatherData.main.temp)} °C</p>
          <p className='response-item'>Description: {weatherData.weather[0].description}</p>
          {currentTime && <p className='response-item'>Current Time: {currentTime.toLocaleTimeString()}</p>}
          <p className='response-item'>Humidity : {weatherData.main.humidity}%</p>
          <p className='response-item'>Wind Speed : {weatherData.wind.speed}m/s</p>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default Weather;
