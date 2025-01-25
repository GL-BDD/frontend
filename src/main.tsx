/**
 * @fileoverview Entry point for the React application.
 *
 * This file imports necessary modules and styles, and renders the main
 * application component (`App`) inside a `StrictMode` wrapper to the DOM element
 * with the id 'root'.
 *
 * @module main
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
