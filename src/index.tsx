import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store'

import './index.css'

import App from './App'
window.store = store
const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container!)
import './components/scaffolding/layout/global.scss'
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
