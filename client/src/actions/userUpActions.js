import axios from 'axios';
import {
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE
} from './actionTypes';

const url = 'http://localhost:5000/api';

export const signUp = (email, password, username) => dispatch => {
  return new Promise((resolve, reject) => {
  dispatch({ type: SIGN_UP_REQUEST });

  

  axios.post(`${url}/signup`, { email, password, username })
    .then(response => {
      dispatch({
        type: SIGN_UP_SUCCESS,
        payload: response.data
      });
      localStorage.setItem('jwt', response.data.token)
      resolve()

      
    })
    .catch(error => {
      dispatch({
        type: SIGN_UP_FAILURE,
        payload: error.response.data.error
      });

      reject(error)
    });
  });
};
