import { Store, combineReducers, createStore } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
import { CounterReducer } from './features/counter'
import { modeReducer } from './data'
import { IApplicationState } from './data/store-type'

/* Create root reducer, containing all features of the application */
const rootReducer = combineReducers({
  count: CounterReducer,
  mode: modeReducer,
})

const store = createStore(
  rootReducer,
  /* preloadedState, */ devToolsEnhancer({})
)

export default store

declare global {
  interface Window {
    store: Store<IApplicationState>
  }
}
