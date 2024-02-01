import { IApplicationState } from '../../data/store-type'

export const getCountValue = (state: IApplicationState) => state.count.value
