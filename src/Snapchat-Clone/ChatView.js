import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { selectSelectedImage } from '../features/appSlice'

import './ChatView.css'

import {CountdownCircleTimer, CoutdownCircleTimer} from 'react-countdown-circle-timer'
function ChatView() {

    const selectedImage = useSelector(selectSelectedImage);
    const history = useHistory();

    useEffect(() => {
      if (!selectedImage) {
          exit()
      }
    }, [selectedImage])

    const exit = () => {
        history.replace('/chats')

    }
    return (
        <div className = 'chatview'>
            <img onClick = {exit} src = {selectedImage} >
            </img>
            <div className="chatview__timer">
            <CountdownCircleTimer
            isPlaying
            duration = {15}
            strokeWidth = {6}
            size = {50}
            colors = {[
                ['#fc03db' , 0.3],
                ['#fc030b' , 0.3],
                ['#fc0384' , 0.3],
                ['#03fceb' , 0.3],
                ['#24fc03' , 0.3],
                ['#fc0303' , 0.3],
            ]}
            >
            {({remainingTime}) => {

                if (remainingTime === 0 ) {
                    exit();
                }
                return remainingTime
            }}
            </CountdownCircleTimer>
            </div>
            
        </div>
    )
}

export default ChatView
