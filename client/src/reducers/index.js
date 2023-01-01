import { combineReducers } from 'redux';
import userReducer from './userReducer';
import userUpReducer from './userUpReducer';
import messageReducer from './chatReducer';
import getFriendsReducer from './friendReducer';
import deleteFriendReducer from './deletefriendRed';
import sendRequestReducer from './requests/SendReqReducer';
import getRequestReducer from './requests/GetRequestReducer';
import AcceptRequestReducer from './requests/AcceptReqReducer';
import DeclineRequestReducer from './requests/DeclineReqReducer';
import addMessageReducer from './addReducer';


export default combineReducers({
user: userReducer,
userUp: userUpReducer,
message: messageReducer,
friends: getFriendsReducer,
deletefriend: deleteFriendReducer,
sendreq: sendRequestReducer,
requests: getRequestReducer,
acceptreq: AcceptRequestReducer,
declinereq: DeclineRequestReducer,
addMessage: addMessageReducer
});