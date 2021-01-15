import React, { useEffect } from 'react';
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import './App.css';
import WebcamCapture from './Snapchat-Clone/WebcamCapture';

// React Router Dom

import {BrowserRouter as Router , Switch , Route} from 'react-router-dom'
import Preview from './Snapchat-Clone/Preview';
import Chats from './Snapchat-Clone/Chats';
import ChatView from './Snapchat-Clone/ChatView';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/appSlice';
import Login from './Snapchat-Clone/Login';
import { auth } from './firebase';

function App() {

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect (() => {
    auth.onAuthStateChanged(user => {
      if (user) {
         // logged in

         dispatch(login({
                   username : user.displayName,
                   id : user.uid,
                   profilePic : user.photoURL,
         }))
      }
      else {
          dispatch(logout())
      }
    })
  }, [])

  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login></Login>
        ) : (
          <>
          <img className = 'app_logo' src = 'https://variety.com/wp-content/uploads/2017/11/snapchat-logo.jpg'></img>
      <div className="app__body">
        <div className="app__bodyBackground">

        <Switch> 
          <Route path = '/chats/view'>
            <ChatView></ChatView>
          </Route>
          <Route path = '/chats'>
            <Chats></Chats>
          </Route>
          <Route path = '/preview'>
          <Preview></Preview>
          </Route>
          <Route path = '/'>
          <WebcamCapture></WebcamCapture>
          </Route>
        </Switch>
        </div>
      </div>
      </>
        )}
      </Router>
    </div>
  );
}

export default App;
