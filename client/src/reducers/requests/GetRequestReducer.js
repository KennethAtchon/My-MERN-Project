import {
    GET_REQUESTS_REQUEST,
    GET_REQUESTS_SUCCESS,
    GET_REQUESTS_FAILURE,
    PURGE
    } from '../../actions/actionTypes';
    
    const initialState = {
    loading: false,
    requests: [],
    error: null
    };
    
    const getRequestsReducer = (state = initialState, action) => {
        switch (action.type) {
          case GET_REQUESTS_REQUEST:
            return {
              ...state,
              loading: true
            };
          case GET_REQUESTS_SUCCESS:
            return {
              ...state,
              loading: false,
              requests: action.payload
            };
          case GET_REQUESTS_FAILURE:
            return {
              ...state,
              loading: false,
              error: action.payload
            };
          case PURGE:
            return {
              ...state,
              requests: []
            };
          default:
            return state;
        }
      };
      
    
    export default getRequestsReducer;