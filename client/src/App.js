import React from 'react';
import SignIn from './components/signin';
import SignUp from './components/signup';
import AcceptReq from './components/AcceptReq';
import SendReq from './components/sendReq';
import Chat from './components/chat';
import Friends from './components/friends';

import { Routes, Route } from 'react-router-dom';


function App() {

  return (

    <Routes>
      
      <Route path="/" element={ <SignIn /> } />

      <Route path="/signin" element={ <SignIn /> } />

      <Route path="/signup" element={ <SignUp /> }  />

      <Route path="/sendrequest" element={ <SendReq/> }  />

      <Route path="/acceptrequest" element={ < AcceptReq /> }  />
      
      <Route path="/chat" element={ < Chat /> }  />

      <Route path="/friends" element={ < Friends /> }  />
      
    </Routes>

  );
}


export default App;
