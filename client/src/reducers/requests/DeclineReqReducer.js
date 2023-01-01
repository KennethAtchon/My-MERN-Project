import {
    DECLINE_REQUEST_REQUEST,
    DECLINE_REQUEST_SUCCESS,
    DECLINE_REQUEST_FAILURE
    } from '../../actions/actionTypes';
    
    const initialState = {
    loading: false,
    success: false,
    error: null
    };
    
    const declineRequestReducer = (state = initialState, action) => {
    switch (action.type) {
    case DECLINE_REQUEST_REQUEST:
    return {
    ...state,
    loading: true
    };
    case DECLINE_REQUEST_SUCCESS:
    return {
    ...state,
    loading: false,
    success: true
    };
    case DECLINE_REQUEST_FAILURE:
    return {
    ...state,
    loading: false,
    error: action.payload
    };
    default:
    return state;
    }
    };
    
    export default declineRequestReducer;