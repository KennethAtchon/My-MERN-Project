import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  PURGE,
} from '../actions/actionTypes';

const initialState = {
  loading: false,
  error: null,
  user: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case SIGN_IN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case PURGE:
      return initialState;
    default:
      return state;
  }
};

export default userReducer;
