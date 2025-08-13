
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { createContext } from 'react'
import Context from './Context.jsx'
import {Provider} from 'react-redux'
import { store } from './store/store.js'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
        <Context>
            <App />
        </Context>
    </BrowserRouter>
  </Provider>
)
