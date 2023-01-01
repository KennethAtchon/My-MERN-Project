import axios from 'axios';
import { DECLINE_REQUEST_REQUEST, DECLINE_REQUEST_SUCCESS, DECLINE_REQUEST_FAILURE } from '../actionTypes';

const url = 'http://localhost:5000/api';

export const declineRequest = ( sender, recipient) => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({ type: DECLINE_REQUEST_REQUEST });

    axios.delete(`${url}/declinereq`, { params: { sender, recipient } })
      .then(response => {
        dispatch({
          type: DECLINE_REQUEST_SUCCESS,
          payload: response.data
        });
        resolve();
      })
      .catch(error => {
        dispatch({
          type: DECLINE_REQUEST_FAILURE,
          payload: error
        });
        reject(error);
      });
  });
};
