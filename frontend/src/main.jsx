
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { createContext } from 'react'
import Context from './Context.jsx'


createRoot(document.getElementById('root')).render(
  
    <BrowserRouter>
        <Context>
            <App />
        </Context>
    </BrowserRouter>,
  
)
