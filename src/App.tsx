import { useState } from 'react'
import './App.sass'
import Weather from './weather'

function App() {

  return (
    <>
      <div className='container'>
        <div className='weather'>
          <div className='currentWeather'>
            <Weather />
          </div>
          <div className='forecast'>
            <div className='forecastTitle'>
              <h2>FORECAST</h2>
            </div>
            <div className='forecastDayList'></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
