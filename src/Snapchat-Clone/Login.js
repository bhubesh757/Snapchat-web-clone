import { Button } from '@material-ui/core';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { login, selectUser } from '../features/appSlice';
import { auth, provider } from '../firebase';

import './Login.css'
function Login() {

    const user = useSelector(selectUser);

    const signIn = () => {
        auth.signInWithPopup(provider)
        .then((result) => {
            console.log(user);
            dispatch(login({
                username : result.user.displayName,
                id : result.user.uid,
                profilePic : result.user.photoUrl,

            }))
        })
        .catch((error) => alert(error.message))
}

    const dispatch = useDispatch();
    return (
        <div className = 'login'>
            <div className="login__container">
                <img src = 'https://variety.com/wp-content/uploads/2017/11/snapchat-logo.jpg'></img>

                <Button variants = 'outline' onClick = {signIn}>Sign In</Button>
            </div>
        </div>
    )
}

export default Login
