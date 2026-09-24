import React from 'react'
import ReactDOM from 'react-dom/client'
import { SpeedInsights } from "@vercel/speed-insights/react"
import App from './App'
import './styles/main.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <SpeedInsights />
  </React.StrictMode>,
)