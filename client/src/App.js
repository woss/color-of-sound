import React, { Component } from 'react'
import image from './assets/images/image.jpg'
import image1 from './assets/images/image1.jpg'
import './App.css'
import CanvasImage from './CanvasImage'

class App extends Component {
    render() {
        return (
            <div className="App">
                <CanvasImage image={image1} classes={{hidden: 'hidden'}}></CanvasImage>
            </div>
        )
    }
}

export default App
