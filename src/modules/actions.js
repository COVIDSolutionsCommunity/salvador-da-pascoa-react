import axios from 'axios'
import humps from 'humps'

export const CREATE_SELLER = 'CREATE_SELLER'
export const CREATE_MY_SELLER = 'CREATE_SELLER'
export const CREATE_SELLER_LOADING = 'CREATE_SELLER_LOADING'
export const CREATE_SELLER_ERROR = 'CREATE_SELLER_ERROR'
export const LOGIN = 'LOGIN'
export const LOGIN_ERROR = 'LOGIN_ERROR'
export const GET_SELLERS = 'GET_SELLERS'

const apiUrl = 'https://api-salvadordapascoa.herokuapp.com/api/v1'

const createFormData = (data) => {
  console.log('createFormData -> data', data)
  const formData = new FormData()

  Object.keys(data).forEach((field) => {
    console.log('createFormData -> field', field)
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
      console.log(
        'formDataValue -> JSON.stringify(fieldValue)',
        fieldValue,
        JSON.stringify(fieldValue)
      )
      return JSON.stringify(fieldValue)
    })()

    // if (field === 'product_images') {
    //   data.product_images.map(
    //     (image) =>
    //       console.log(JSON.stringify(image.image)) ||
    //       formData.append('product_images', {
    //         image: image.image,
    //         order: image.order,
    //       })
    //   )
    //   return
    // }

    formData.append(field, formDataValue)
    console.log('createFormData -> formDataValue', formDataValue)
    console.log('createFormData -> field', field)
  })

  console.log('createFormData -> formData', formData)
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

export const getSellers = () => {
  return (dispatch) => {
    return axios
      .get(`${apiUrl}/sellers`)
      .then((response) => {
        console.log('login -> response', response)
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
