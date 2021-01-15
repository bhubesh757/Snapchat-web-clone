import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'

// Icosn

import SearchIcon from '@material-ui/icons/Search';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import './Chats.css'
import { auth, db } from '../firebase';
import Chat from './Chat';
import { selectUser } from '../features/appSlice';
import { useDispatch, useSelector } from 'react-redux';

import CameraAltIcon from '@material-ui/icons/CameraAlt';
import { useHistory } from 'react-router-dom';
import { resetCameraImage } from '../features/cameraSlice';
function Chats() {
    // useState
    const [posts, setposts] = useState([])
    const user = useSelector(selectUser)
    const dispatch = useDispatch();
    const history = useHistory();

    // logout 

    // useEffect
    // Lsitener

    useEffect(() => {
        db.collection('posts').orderBy('timestamp' , 'desc').
        onSnapshot(
            snapshot => setposts (snapshot.docs.map(doc => ({
                id : doc.id,
                data : doc.data()
            })))
        )
    }, [])

    // takeSnap

    const takeSnap = () => {
        dispatch(resetCameraImage())
        history.push('/')
    }


    return (
        <div className = 'chats'>
            <div className="chats___header">
                <Avatar src = {user.profilePic} onClick = {() => auth.signOut()} className = 'chats__Avatar'></Avatar>
                <div className="chats__Search">
                    <SearchIcon className = 'chats__searchIcon'></SearchIcon>
                    <input type = 'text' placeholder = 'Friends'></input>
                </div>
                <ChatBubbleIcon className = 'chats__chatIcon'></ChatBubbleIcon>
            </div>

            <div className="chats__posts">
            {posts.map(({id , data : {
                    profilePic , username , timestamp , imageUrl ,read
                }}) => (
                    <Chat
                    id = {id}
                    key = {id}
                    username = {username}
                    profilePic = {profilePic}
                    imageUrl = {imageUrl}
                    read = {read}
                    timestamp = {timestamp}
                    ></Chat>
                ))}
            </div>

            <CameraAltIcon className = 'takePic__icon'
            onClick = {takeSnap} fontSize = 'large' ></CameraAltIcon>
        </div>
    )
}

export default Chats
