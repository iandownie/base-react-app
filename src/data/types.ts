import { TOGGLE_MODE } from './actions'

export enum EModes {
  Light = 'light',
  Dark = 'dark',
}

interface IModeAction {
  type: typeof TOGGLE_MODE
}

export type ModeActionTypes = IModeAction
