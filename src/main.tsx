import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
// Removed GlassMorphismProvider import

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Removed GlassMorphismProvider usage */}
      <App />
  </StrictMode>,
)
