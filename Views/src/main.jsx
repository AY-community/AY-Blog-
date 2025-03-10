import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import './Index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <HelmetProvider>
  <StrictMode>
    <App />
  </StrictMode>
</HelmetProvider>

)
