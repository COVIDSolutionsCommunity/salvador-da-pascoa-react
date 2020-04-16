import axios from 'axios'
import humps from 'humps'

export const CREATE_SELLER = 'CREATE_SELLER'
export const CREATE_SELLER_LOADING = 'CREATE_SELLER_LOADING'
export const CREATE_SELLER_ERROR = 'CREATE_SELLER_ERROR'
export const LOGIN = 'LOGIN'
export const LOGIN_ERROR = 'LOGIN_ERROR'

const apiUrl = 'https://api-salvadordapascoa.herokuapp.com/api/v1'

export const createUser = (payload) => {
  return (dispatch) => {
    dispatch(createSellerLoading(true))
    return axios
      .post(`${apiUrl}/register/`, humps.decamelizeKeys({ ...payload }))
      .then((response) => {
        dispatch(createSellerSuccess(response.data))
        dispatch(createSellerLoading(false))
      })
      .catch((error) => {
        dispatch(createSellerLoading(false))
        throw error
      })
  }
}

export const login = (payload) => {
  return (dispatch) => {
    dispatch(createSellerLoading(true))
    return axios
      .post(`${apiUrl}/login/`, humps.decamelizeKeys({ ...payload }))
      .then((response) => {
        console.log('login -> response', response)
        dispatch(loginSuccess(response.data))
      })
      .catch((error) => {
        const payload = {
          error: 'Verifique se o seu e-mail e a sua senha estão corretos',
        }
        dispatch(loginError(payload))
        throw error
      })
  }
}

export const createSellerSuccess = (payload) => {
  return {
    type: CREATE_SELLER,
    payload,
  }
}

export const loginSuccess = (payload) => {
  return {
    type: LOGIN,
    payload,
  }
}

export const loginError = (payload) => {
  return {
    type: LOGIN_ERROR,
    payload,
  }
}

export const createSellerLoading = (payload) => {
  return {
    type: CREATE_SELLER_LOADING,
    payload,
  }
}
