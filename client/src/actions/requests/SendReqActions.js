import axios from 'axios';
import {
  SEND_REQUEST_REQUEST,
  SEND_REQUEST_SUCCESS,
  SEND_REQUEST_FAILURE
} from '../actionTypes';

const url = 'http://localhost:5000/api';

export const createRequest = (sender, recipient, reason) => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({ type: SEND_REQUEST_REQUEST });

    axios.post(`${url}/sendreq`, { sender, recipient, reason })
      .then(response => {
        dispatch({
          type: SEND_REQUEST_SUCCESS,
          payload: response.data
        });

        resolve();
      })
      .catch(error => {
        dispatch({
          type: SEND_REQUEST_FAILURE,
          payload: error.response.data.error
        });

        reject(error);
      });
  });
};
