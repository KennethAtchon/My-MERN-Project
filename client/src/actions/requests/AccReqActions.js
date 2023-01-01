import axios from 'axios';
import {
  ACCEPT_REQUEST_REQUEST,
  ACCEPT_REQUEST_SUCCESS,
  ACCEPT_REQUEST_FAILURE,
} from '../actionTypes';

const url = 'http://localhost:5000/api';

export const acceptRequest = (sender, recipient) => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({ type: ACCEPT_REQUEST_REQUEST });

    axios.post(`${url}/acceptreq`, { sender, recipient })
      .then(response => {
        dispatch({
          type: ACCEPT_REQUEST_SUCCESS,
          payload: response.data,
        });
        resolve();
      })
      .catch(error => {
        dispatch({
          type: ACCEPT_REQUEST_FAILURE,
          payload: error,
        });
        reject(error);
      });
  });
};
