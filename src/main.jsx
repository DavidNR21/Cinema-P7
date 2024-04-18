import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import CinemaProvider from './context/CinemaContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CinemaProvider>
      <App />
    </CinemaProvider>
  </React.StrictMode>,
)
