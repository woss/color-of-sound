import React, { Component } from 'react'

import image from '../assets/images/image.jpg'
import CanvasImage from './CanvasImage'

class Player extends Component {
    render() {
        return (
            <div>
                <CanvasImage image={image}></CanvasImage>
            </div>
        )
    }
}

export default Player