import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './app/globals.css'
import '@rainbow-me/rainbowkit/styles.css'
import { Providers } from './blockchain/Providers'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Providers>
            <App />
            <Toaster />
        </Providers>
    </React.StrictMode>,
)
