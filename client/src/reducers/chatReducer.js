import { GET_MESSAGE_FAILURE, GET_MESSAGE_SUCCESS, GET_MESSAGE_REQUEST } from '../actions/actionTypes';

const initialState = {
    loading: false,
    messages: [],
    error: null,
  };
  
  function messageReducer(state = initialState, action) {
    switch (action.type) {
      case GET_MESSAGE_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case GET_MESSAGE_SUCCESS:
        return {
          ...state,
          loading: false,
          messages: action.payload,
        };
      case GET_MESSAGE_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  }
  
  export default messageReducer;
  