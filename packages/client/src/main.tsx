import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App/App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
