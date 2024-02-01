import { IApplicationState } from './store-type'
import { EModes } from './types'

export const initialState: IApplicationState = {
  mode: EModes.Light,
  count: { value: 0 },
}
