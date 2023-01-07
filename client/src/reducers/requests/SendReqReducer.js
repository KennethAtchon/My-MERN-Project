import {
    SEND_REQUEST_REQUEST,
    SEND_REQUEST_SUCCESS,
    SEND_REQUEST_FAILURE,
    PURGE
  } from '../../actions/actionTypes';
  
  const initialState = {
    loading: false,
    success: false,
    error: null
  };
  
  const sendRequestReducer = (state = initialState, action) => {
    switch (action.type) {
      case SEND_REQUEST_REQUEST:
        return {
          ...state,
          loading: true
        };
      case SEND_REQUEST_SUCCESS:
        return {
          ...state,
          loading: false,
          success: true
        };
      case SEND_REQUEST_FAILURE:
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
  
  export default sendRequestReducer;
  