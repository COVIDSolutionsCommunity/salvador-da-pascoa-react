import cookies from 'react-cookies'
import humps from 'humps'

import {
  CREATE_SELLER,
  CREATE_SELLER_LOADING,
  LOGIN,
  LOGIN_ERROR,
  GET_SELLERS,
} from './actions'

const INITIAL_STATE = {
  mainUser: {
    pk: cookies.load('pk'),
  },
  key: cookies.load('key'),
  allSellers: [],
  loading: false,
  error: '',
}

const getPage = (query) =>
  query.includes('?page=') || query.includes('&page=')
    ? Number(query.match(/[?&]page=([^&#]*)/)[1])
    : undefined

const getSellerPage = (page) => (page ? getPage(page) : undefined)

const returnAllSellers = (state, payload) => {
  console.log('returnAllSellers -> payload', payload)
  const newCollectList = payload.results

  const newCollectState = getSellerPage(payload.next)
    ? state.allSellers.concat(newCollectList)
    : newCollectList
  console.log('returnAllSellers -> newCollectState', newCollectState)

  const newState = {
    ...state,
    allSellers: {
      next: getSellerPage(payload.next),
      result: newCollectState,
    },
  }
  console.log('returnAllSellers -> newState', newState)
  return newState
}

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action
  switch (type) {
    case CREATE_SELLER:
      cookies.save('key', payload.key)
      return {
        ...state,
        ...payload,
      }
    case LOGIN:
      cookies.save('key', payload.key)
      cookies.save('pk', payload.user.pk)
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
    case GET_SELLERS:
      return returnAllSellers(state, humps.camelizeKeys(payload))
    default:
      return state
  }
}
