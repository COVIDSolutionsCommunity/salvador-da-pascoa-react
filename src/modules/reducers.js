import cookies from 'react-cookies'
import humps from 'humps'

import { CREATE_SELLER, CREATE_SELLER_LOADING, LOGIN, LOGIN_ERROR } from './actions'

const INITIAL_STATE = {
  mainUser: {},
  key: cookies.load('key'),
  allSellers: [],
  loading: false,
  error: '',
}

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action
  console.log('payload', payload)
  switch (type) {
    case CREATE_SELLER:
      cookies.save('key', payload.key, { path: '/' })
      return {
        ...state,
        ...payload,
        key: payload.key,
      }
    case LOGIN:
      cookies.save('key', payload.key, { path: '/' })
      const { user } = humps.camelizeKeys(payload)
      return {
        ...state,
        mainUser: user,
        key: payload.key,
        loading: false,
      }
    case CREATE_SELLER_LOADING:
      return {
        ...state,
        loading: true,
      }
    case LOGIN_ERROR:
      return {
        ...state,
        error: payload.error,
        loading: false,
      }
    default:
      return state
  }
}
