import {
    ACCEPT_REQUEST_REQUEST,
    ACCEPT_REQUEST_SUCCESS,
    ACCEPT_REQUEST_FAILURE,
    PURGE
  } from '../../actions/actionTypes';
  
  const initialState = {
    loading: false,
    success: false,
    error: null
  };
  
  const acceptRequestReducer = (state = initialState, action) => {
    switch (action.type) {
      case ACCEPT_REQUEST_REQUEST:
        return {
          ...state,
          loading: true
        };
      case ACCEPT_REQUEST_SUCCESS:
        return {
          ...state,
          loading: false,
          success: true
        };
      case ACCEPT_REQUEST_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      case PURGE:
        return initialState;
      default:
        return state;
    }
  };
  
  
  export default acceptRequestReducer;
