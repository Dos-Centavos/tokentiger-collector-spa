
import axios from 'axios'
const SERVER = process.env.REACT_APP_API_URL

export const getTokenData = async (tokenIds) => {
  // try auth
  try {
    const options = {
      method: 'POST',
      url: `${SERVER}/token/data`,
      headers: {
        Accept: 'application/json'
      },
      data: {
        tokenIds
      }
    }
    const result = await axios(options)
    const response = result.data

    return response
  } catch (e) {
    console.warn('Error in user/getTokenData()', e.message)
    throw e
  }
}
