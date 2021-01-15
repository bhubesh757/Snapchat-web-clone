import { Avatar } from '@material-ui/core'
import React from 'react'

import './Chat.css'

// Icons
import StopRoundedIcon from '@material-ui/icons/StopRounded';
import ReactTimeago from 'react-timeago';
import { selectImage, selectUser } from '../features/appSlice';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../firebase';
import { useHistory } from 'react-router-dom';

function Chat({id , username , timestamp , read , imageUrl , profilePic }) {

    // open the image of the status

    const dispatch = useDispatch();

    const history = useHistory();
    const user = useSelector(selectUser);


    const openImage = () => {
        if (!read) {
            dispatch(selectImage(imageUrl))
            db.collection('posts').doc(id).set({
                read : true,
            } , {merge : true}
            )
            history.push('/chats/view')
        }
    }
    return (
        <div onClick = {openImage} className = 'chat'>
            <Avatar src = {profilePic}></Avatar>
            <div className="chat__info">
                <h4>{username}</h4>
                <p>{ !read && "Tap to View -"}{" "} <ReactTimeago
                date ={new Date (timestamp?.toDate()).toUTCString()}
                >
                    </ReactTimeago>  </p>

            </div>

            {!read && <StopRoundedIcon className = 'chat_readIcon'></StopRoundedIcon> }
        </div>
    )
}

export default Chat
