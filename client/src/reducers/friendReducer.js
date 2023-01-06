import { GET_FRIENDS_REQUEST, GET_FRIENDS_SUCCESS, GET_FRIENDS_FAILURE, PURGE } from '../actions/actionTypes';

const initialState = {
  loading: false,
  contacts: [],
  error: '',
};

const getFriendsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FRIENDS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_FRIENDS_SUCCESS:
      return {
        ...state,
        loading: false,
        contacts: action.payload,
      };
    case GET_FRIENDS_FAILURE:
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

export default getFriendsReducer;
