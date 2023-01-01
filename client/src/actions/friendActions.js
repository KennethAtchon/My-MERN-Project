import { GET_FRIENDS_REQUEST, GET_FRIENDS_SUCCESS, GET_FRIENDS_FAILURE ,DELETE_FRIEND_REQUEST, DELETE_FRIEND_SUCCESS, DELETE_FRIEND_FAILURE } from './actionTypes';

import axios from 'axios';

const url = 'http://localhost:5000/api';

export const getFriends = (sender) => dispatch => {
  return new Promise((resolve, reject) => {
  dispatch({ type: GET_FRIENDS_REQUEST });

 
  axios.get(`${url}/friend`, { params: { sender } })
    .then(response => {
      dispatch({
        type: GET_FRIENDS_SUCCESS,
        payload: response.data
      });
      
      
      resolve();
    })
    .catch(error => {
      dispatch({
        type: GET_FRIENDS_FAILURE,
        payload: error
      });
      reject(error);
    });
  });
};

export const deleteFriend = (sender, friend) => dispatch => {
  return new Promise((resolve, reject) => {
  dispatch({ type: DELETE_FRIEND_REQUEST });

  axios.delete(`${url}/deletefriend`, { params: { sender,friend } })
    .then(response => {
      dispatch({
        type: DELETE_FRIEND_SUCCESS,
        payload: response.data
      });
      
      resolve();
    })
    .catch(error => {
      dispatch({
        type: DELETE_FRIEND_FAILURE,
        payload: error
      });
      reject(error);
    });
  });
};
