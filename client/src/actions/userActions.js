import axios from 'axios';
import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE
} from './actionTypes';

const url = 'http://localhost:5000/api';

export const signIn = (email, password) => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({ type: SIGN_IN_REQUEST });

    axios.post(`${url}/signin`, { email, password })
      .then(response => {
        dispatch({
          type: SIGN_IN_SUCCESS,
          payload: response.data
        });
        localStorage.setItem('jwt', response.data.token)
        resolve();
        
        
      })
      .catch(error => {
        dispatch({
          type: SIGN_IN_FAILURE,
          payload: error.response.data.error
        });
        reject(error);
      });
  });
};







