import {
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  PURGE,
} from '../actions/actionTypes';

const initialState = {
  loading: false,
  error: '',
  user: null,
};

const userUpReducer = (state = initialState, action) => {
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
    case PURGE:
      return initialState;
    default:
      return state;
  }
};

export default userUpReducer;

  