import cookies from 'react-cookies'
import humps from 'humps'

import {
  CREATE_SELLER,
  CREATE_SELLER_LOADING,
  LOGIN,
  LOGIN_ERROR,
  GET_SELLERS,
  GET_SELLER,
  GET_SELLERS_LOCATION,
  CREATE_SELLER_ERROR,
} from './actions'

const INITIAL_STATE = {
  mainUser: {
    pk: cookies.load('pk'),
  },
  key: cookies.load('key'),
  currentSeller: {},
  allSellers: {
    next: 0,
    result: [],
  },
  stateSellers: [],
  loading: false,
  error: '',
}

const getPage = (query) =>
  query.includes('?page=') || query.includes('&page=')
    ? Number(query.match(/[?&]page=([^&#]*)/)[1])
    : undefined

const getSellerPage = (page) => (page ? getPage(page) : undefined)

const returnAllSellers = (state, payload) => {
  const newCollectList = payload.results

  const newCollectState = getSellerPage(payload.next)
    ? state.allSellers.result.concat(newCollectList)
    : newCollectList

  const newState = {
    ...state,
    allSellers: {
      next: getSellerPage(payload.next),
      result: newCollectState,
    },
  }
  return newState
}

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action
  switch (type) {
    case CREATE_SELLER:
      cookies.save('key', payload.key)
      const { user, ...currentSeller } = humps.camelizeKeys(payload)
      return {
        ...state,
        currentSeller,
        loading: false,
      }
    case LOGIN:
      cookies.save('key', payload.key)
      cookies.save('pk', payload.user.pk)
      const newPayload = humps.camelizeKeys(payload)
      return {
        ...state,
        mainUser: newPayload.user,
        key: payload.key,
        loading: false,
      }
    case CREATE_SELLER_LOADING:
      return {
        ...state,
        loading: payload,
      }
    case LOGIN_ERROR:
      return {
        ...state,
        error: payload.error,
        loading: false,
      }
    case CREATE_SELLER_ERROR:
      return {
        ...state,
        error: payload.error,
        loading: false,
      }
    case GET_SELLERS:
      return returnAllSellers(state, humps.camelizeKeys(payload))
    case GET_SELLERS_LOCATION:
      return returnAllSellers(state, humps.camelizeKeys(payload))
    case GET_SELLER:
      return {
        ...state,
        currentSeller: humps.camelizeKeys(payload),
      }
    default:
      return state
  }
}
