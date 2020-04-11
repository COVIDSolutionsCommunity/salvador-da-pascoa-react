import axios from 'axios'
export const CREATE_SELLER = 'CREATE_SELLET'

const apiUrl = 'https://api-salvadordapascoa.herokuapp.com/admin'

export const createSeller = ({ payload }) => {
  return (dispatch) => {
    return axios
      .post(`${apiUrl}/my-seller`, { payload })
      .then((response) => {
        dispatch(createSellerSuccess(response.data))
      })
      .catch((error) => {
        throw error
      })
  }
}

export const createSellerSuccess = (data) => {
  return {
    type: CREATE_SELLER,
    payload: {
      _id: data._id,
      title: data.title,
      body: data.body,
    },
  }
}
