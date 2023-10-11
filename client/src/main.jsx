import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import  {store, persistor } from './redux/store.js'
import { Provider } from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>

      <Router>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Router>


    </Provider>


  </React.StrictMode>,
)
