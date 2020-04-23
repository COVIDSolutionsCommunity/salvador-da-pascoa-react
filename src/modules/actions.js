import axios from 'axios'
import humps from 'humps'

export const CREATE_SELLER = 'CREATE_SELLER'
export const CREATE_MY_SELLER = 'CREATE_SELLER'
export const CREATE_SELLER_LOADING = 'CREATE_SELLER_LOADING'
export const CREATE_SELLER_ERROR = 'CREATE_SELLER_ERROR'
export const LOGIN = 'LOGIN'
export const LOGIN_ERROR = 'LOGIN_ERROR'
export const GET_SELLERS = 'GET_SELLERS'
export const GET_SELLER = 'GET_SELLER'
export const GET_SELLERS_LOCATION = 'GET_SELLERS_LOCATION'

const apiUrl = 'https://api-salvadordapascoa.herokuapp.com/api/v1'

const createFormData = (data) => {
  const formData = new FormData()

  Object.keys(data).forEach((field) => {
    const fieldValue = data[field]
    const formDataValue = (() => {
      if (!fieldValue) {
        return ''
      }

      if (
        fieldValue instanceof Blob ||
        typeof fieldValue !== 'object' ||
        field === 'product_images'
      ) {
        return fieldValue
      }
      return JSON.stringify(fieldValue)
    })()

    formData.append(field, formDataValue)
  })

  return formData
}

export const createUser = (payload) => {
  return (dispatch) => {
    dispatch(createSellerLoading(true))
    return axios
      .post(`${apiUrl}/register/`, humps.decamelizeKeys(payload))
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

export const createSeller = (payload) => {
  const { coverImage, productImages } = payload
  return (dispatch, getState) => {
    dispatch(createSellerLoading(true))
    const convert = humps.decamelizeKeys(payload)
    const newPayload = createFormData({
      ...convert,
      cover_image: coverImage,
      product_images: productImages,
    })
    return axios
      .post(`${apiUrl}/my-seller/`, newPayload, {
        headers: {
          Authorization: 'Token ' + getState().key,
          'Content-Type': 'multipart/form-data',
        },
      })
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

export const getSellers = () => {
  return (dispatch) => {
    return axios
      .get(`${apiUrl}/sellers`)
      .then((response) => {
        dispatch(getSellersSuccess(response.data))
      })
      .catch((error) => {
        const payload = {
          error: 'Tente novamente mais tarde',
        }
        dispatch(loginError(payload))
        throw error
      })
  }
}

export const getSeller = (payload) => {
  return (dispatch) => {
    return axios
      .get(`${apiUrl}/sellers/${payload.instagramProfile}`)
      .then((response) => {
        dispatch(getSellerSuccess(response.data))
      })
      .catch((error) => {
        const payload = {
          error: 'Tente novamente mais tarde',
        }
        dispatch(loginError(payload))
        throw error
      })
  }
}

export const getSellersLocation = (payload) => {
  return (dispatch) => {
    return axios
      .get(`${apiUrl}/sellers/`, {
        params: {
          city: payload.city,
          state: payload.state,
          page_size: 50,
        },
      })
      .then((response) => {
        dispatch(getSellersLocationSuccess(response.data))
      })
      .catch((error) => {
        const payload = {
          error: 'Tente novamente mais tarde',
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

export const getSellersSuccess = (payload) => {
  return {
    type: GET_SELLERS,
    payload,
  }
}

export const getSellerSuccess = (payload) => {
  return {
    type: GET_SELLER,
    payload,
  }
}

export const getSellersLocationSuccess = (payload) => {
  return {
    type: GET_SELLERS_LOCATION,
    payload,
  }
}
