import { GET_MESSAGE_FAILURE, GET_MESSAGE_SUCCESS, GET_MESSAGE_REQUEST } from './actionTypes';
import axios from 'axios';
const url = 'http://localhost:5000/api';

export const getMessage = (sender, recipient) => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({ type: GET_MESSAGE_REQUEST });
  
    
      axios.get(`${url}/chat`, { params: { sender, recipient } })
      .then(response => {
        dispatch({
          type: GET_MESSAGE_SUCCESS,
          payload: response.data
        });
        resolve();
      })
      .catch(error => {
        dispatch({
          type: GET_MESSAGE_FAILURE,
          payload: error
        });
        reject(error);
      });
    });
  };
  
  // AddMessage
