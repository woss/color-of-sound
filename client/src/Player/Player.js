// @flow

import React, { Component } from 'react'
import image from '../assets/images/image.jpg'
import CanvasImage from './CanvasImage'

type Props = {
    image: string
}

class Player extends Component<Props>{
    static defaultProps = {
        image: image
    };
    render() {
        return (
            <div>
                <CanvasImage image={this.props.image}></CanvasImage>
            </div>
        )
    }
}

export default Player