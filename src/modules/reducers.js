import { Map } from 'immutable'
import { CREATE_SELLER } from './actions'

const INITIAL_STATE = {
  testando: 'oi',
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_SELLER:
      return {
        result: action.payload,
      }
    default:
      return state
  }
}
