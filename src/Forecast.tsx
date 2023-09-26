import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Forecast.sass';

import config from './config';

const Forecast = () => {
    const [weatherData, setWeatherData] = useState(null);

    const fetchData = async () => {
        try {
            const apiKey = config.REACT_APP_API_KEY;
            const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=tartu&units=metric&appid=${apiKey}&cnt=5`;
            console.log('API URL:', apiUrl);
            const response = await axios.get(apiUrl);
            setWeatherData(response.data);
        } catch (error) {
            console.error('API Error:', error);
        }
    };    

    useEffect(() => {
        fetchData();
    }, []);

    // Rest of your code

    return (
        <div className='container'>
            <div className='forecast-day-container'>
               <div className='forecast-day-number-container'>
                    <p className='forecast-day-number'>27</p>
                    <p className='forecast-day-number-month'>September</p>
                </div>
                <div className='forecast-day-text'>
                    <div className='forecast-day-temp-container'>
                        <p className='forecast-day-temp-text'>16</p><p className='forecast-day-temp-text temp-minmax-cf'>°C</p><p className='forecast-day-temp-text temp-minmax-hyphen'>-</p><p className='forecast-day-temp-text'>22</p><p className='forecast-day-temp-text temp-minmax-cf'>°C</p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Forecast;