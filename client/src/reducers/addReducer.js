import { ADD_MESSAGE_REQUEST, ADD_MESSAGE_SUCCESS, ADD_MESSAGE_FAILURE } from '../actions/actionTypes';

const initialState = {
loading: false,
success: false,
error: null
};

const addMessageReducer = (state = initialState, action) => {
switch (action.type) {
case ADD_MESSAGE_REQUEST:
return {
...state,
loading: true
};
case ADD_MESSAGE_SUCCESS:
return {
...state,
loading: false,
success: true
};
case ADD_MESSAGE_FAILURE:
return {
...state,
loading: false,
error: action.payload
};
default:
return state;
}
};

export default addMessageReducer;