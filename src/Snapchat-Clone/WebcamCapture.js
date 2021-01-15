import React, { useCallback, useRef, useState } from 'react'
import Webcam from 'react-webcam';

import './WebcamCapture.css'

// Icons 

import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { useDispatch } from 'react-redux';
import { setCameraImage } from '../features/cameraSlice';
import { useHistory } from 'react-router-dom';

const videoConstraints = {
    width: 246,
    height: 410,
    facingMode: "user"
  };


  
  function WebcamCapture() {

    const dispatch = useDispatch();
    const webcamRef = useRef(null);
    const history = useHistory();

    // using useState
    // const [image, setimage] = useState(null)
    const capture = useCallback(() => {
            const imageSrc = webcamRef.current.getScreenshot();
            dispatch(setCameraImage(imageSrc));
            history.push('/preview')  // it takes you to the preview page , which is to next page which you have been created
        
    },[webcamRef])

   
      return (
          <div className = 'webcamCapture'>
            <img className = 'webcamCapture___image' src = 'https://cdn.worldvectorlogo.com/logos/snapchat-1.svg'></img>
                <Webcam
                  audio = {false}
                  height = {videoConstraints.height}
                  ref = {webcamRef}
                  screenshotFormat="image/jpeg"
                  width={videoConstraints.width}
                  videoConstraints={videoConstraints} 
                  >     
                </Webcam>
                <RadioButtonUncheckedIcon fontSize = 'large' onClick = {capture} className = 'webcamCapture__button'></RadioButtonUncheckedIcon>
                {/* <img src = {image} ></img> */}
          </div>
      )
  }
  
  export default WebcamCapture
  