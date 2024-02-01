/* eslint-disable @typescript-eslint/default-param-last */

import { TOGGLE_MODE } from './actions'
import { EModes, ModeActionTypes } from './types'

const initialState = EModes.Light

export default (state = initialState, action: ModeActionTypes) => {
  switch (action.type) {
    case TOGGLE_MODE:
      return state === EModes.Light ? EModes.Dark : EModes.Light
    default:
      return state
  }
}
