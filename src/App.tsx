import { useState } from 'react'
import './App.sass'

function App() {

  return (
    <>
      <div className='container'>
        <div className='search'>
          <input type="text" className='searchBar'/>
        </div>
        <div className='weather'>
          <p>this is the weather</p>
        </div>
      </div>
    </>
  )
}

export default App
