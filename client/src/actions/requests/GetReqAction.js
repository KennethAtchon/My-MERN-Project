import axios from 'axios';
import { GET_REQUESTS_REQUEST, GET_REQUESTS_SUCCESS, GET_REQUESTS_FAILURE } from '../actionTypes';

const url = 'http://localhost:5000/api';

export const getRequests = (sender) => dispatch => {
    return new Promise((resolve, reject) => {
      dispatch({ type: GET_REQUESTS_REQUEST });
  
      axios.get(`${url}/requests`, { params: { sender } })
        .then(response => {
          dispatch({
            type: GET_REQUESTS_SUCCESS,
            payload: response.data
          });
          resolve();
        })
        .catch(error => {
          dispatch({
            type: GET_REQUESTS_FAILURE,
            payload: error
          });
          reject(error);
        });
    });
  };
  