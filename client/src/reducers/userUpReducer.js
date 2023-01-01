import {
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAILURE
  } from '../actions/actionTypes';

  const userUpReducer = (state = { loading: false, error: '', user: null }, action) => {
    switch (action.type) {
      case SIGN_UP_REQUEST:
        return {
          ...state,
          loading: true,
          error: '',
        };
      case SIGN_UP_SUCCESS:
        return {
          ...state,
          loading: false,
          user: action.payload,
        };
      case SIGN_UP_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };

  export default userUpReducer;
  