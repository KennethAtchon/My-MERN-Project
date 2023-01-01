import { ADD_MESSAGE_FAILURE, ADD_MESSAGE_SUCCESS, ADD_MESSAGE_REQUEST } from './actionTypes';
import axios from 'axios';
const url = 'http://localhost:5000/api';

export const addMessage = (sender, recipient, message) => dispatch => {
return new Promise((resolve, reject) => {
dispatch({ type: ADD_MESSAGE_REQUEST });


axios.post(`${url}/chat`, { sender, recipient, message })
  .then(response => {
    dispatch({
      type: ADD_MESSAGE_SUCCESS,
      payload: response.data
    });
    resolve();
  })
  .catch(error => {
    dispatch({
      type: ADD_MESSAGE_FAILURE,
      payload: error
    });
    reject(error);
  });
});
};