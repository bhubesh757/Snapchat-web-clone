import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {resetCameraImage, selectCameraImage} from '/home/bhubesh/redux-clone-two/src/features/cameraSlice.js'
import './Preview.css'
import { useHistory } from 'react-router-dom';

// Icons
import CloseIcon from '@material-ui/icons/Close';

// Icons in Right side of the review
import SendIcon from '@material-ui/icons/Send';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import CreateIcon from '@material-ui/icons/Create';
import NoteIcon from '@material-ui/icons/Note';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import CropIcon from '@material-ui/icons/Crop';
import TimerIcon from '@material-ui/icons/Timer';
import AttachFileIcon from '@material-ui/icons/AttachFile';

// uuid

import {v4 as uuid} from 'uuid';

// firebase storage

import {db, storage} from '../firebase'
import firebase from '../firebase'
import { selectUser } from '../features/appSlice';

function Preview() {

    const cameraImage = useSelector(selectCameraImage);  // useSelector it grabs it from the redux
    const history = useHistory();
    const dispatch = useDispatch();
   


    // if we click it goes bakc to the home page
    const closePreview = () => {
        dispatch(resetCameraImage());
        history.replace('/')
    }

    const user = useSelector(selectUser);
    console.log(user);
    // sendButton 

    const sendPost = () => {
    const id = uuid(); // it creates a random id
       
        const uploadTask = storage.ref(`posts/${id}`)
        .putString(cameraImage ,  'data_url')

        uploadTask.on(`state_changed` , 
        null , 
        (error) => {
            // Error 
            console.log("Error" , error);
        },
        () => {
            // complete fn
            storage.ref('posts').child(id).getDownloadURL()
            .then((url) => {
                db.collection('posts').add({
                    imageUrl : url,
                    username :  user.username,
                    profilePic : user.profilePic,
                    read : false,
                    timestamp : firebase.firestore.FieldValue.serverTimestamp(),
                    
                });
                history.replace('/chats')
            });
        }
        )
    }

    useEffect(() => {
       
        if (!cameraImage) {
            history.replace('/')
        }
    }, [cameraImage , history])
    return (
        <div className = 'preview'>
                <CloseIcon onClick = {closePreview} className = 'preview__close'></CloseIcon>
                <div className="preview__toolRight">
                    <TextFieldsIcon></TextFieldsIcon>
                    <CreateIcon></CreateIcon>
                    <NoteIcon></NoteIcon>
                    <MusicNoteIcon></MusicNoteIcon>
                    <CropIcon></CropIcon>
                    <TimerIcon></TimerIcon>
                    <AttachFileIcon></AttachFileIcon>
                </div>
                {/* <h1>This is Preview</h1> */}
                <img src = {cameraImage}>
                </img>
                
                <div onClick = {sendPost} className="preview__footer">
                    <h2>Send Now</h2>
                    <SendIcon className = 'preview__sendIcon'></SendIcon>
                </div>
                <div className="">
               <img className = 'preview__image' src = 'https://i.pinimg.com/originals/24/60/9a/24609abdac0b01f737ce7557b1495f30.png'></img>
               </div>
        </div>
    )
}

export default Preview
