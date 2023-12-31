import 'react'
import './App.sass'
import Weather from './Weather'
import {Helmet} from 'react-helmet'

function App() {

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Mathias56k Weather Site</title>
        <link rel="Page Icon" href="assets/page-icon.png" />
      </Helmet>
      <Weather />
    </>
  )
}

export default App
