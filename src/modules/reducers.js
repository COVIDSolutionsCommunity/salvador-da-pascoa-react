import { Map } from 'immutable'

export default (state = {}, action) => {
  switch (action.type) {
    case 'SIMPLE_ACTION':
      return {
        result: action.payload,
      }
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}
