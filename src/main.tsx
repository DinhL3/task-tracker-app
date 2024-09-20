import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import '@fontsource/roboto/300.css';  // Light weight
import '@fontsource/roboto/400.css';  // Regular weight
import '@fontsource/roboto/500.css';  // Medium weight
import '@fontsource/roboto/700.css';  // Bold weight

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
