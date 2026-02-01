import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './app/globals.css'
import '@rainbow-me/rainbowkit/styles.css'
import { AppProviders } from './blockchain/AppProviders'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AppProviders>
            <App />
            <Toaster />
        </AppProviders>
    </React.StrictMode>,
)
