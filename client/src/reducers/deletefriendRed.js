import { DELETE_FRIEND_FAILURE, DELETE_FRIEND_REQUEST, DELETE_FRIEND_SUCCESS} from '../actions/actionTypes';

const initialState = {
    loading: false,
    error: null,
    data: []
  };
  
  function deleteFriendReducer(state = initialState, action) {
    switch (action.type) {
      case DELETE_FRIEND_REQUEST:
        return {
          ...state,
          loading: true
        };
      case DELETE_FRIEND_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload
        };
      case DELETE_FRIEND_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      default:
        return state;
    }
  }
  
  export default deleteFriendReducer;
  