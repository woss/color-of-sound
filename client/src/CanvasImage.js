import React, { Component } from 'react'

const rgbToInt = (rgb) => {

}

const getImageData = (x, y, canvas) => {
    var context = canvas.getContext('2d')
    const ImageData = context.getImageData(x, y, 1, 1)
    //returns rgba()
    var color = ImageData.data.slice(0,4)
    var style = 'background-color: rgba(' + color + ');'
    console.log('HEX %s Color %cRGBA', rgb2hex(color), style, color)
}
//Function to convert hex format to a rgb color

const rgb2hex = (rgb) => {
    console.log(rgb)
    var val = (rgb && rgb.length === 4) ? '#' +
  ('0' + parseInt(rgb[0], 10).toString(16)).slice(-2) +
  ('0' + parseInt(rgb[1], 10).toString(16)).slice(-2) +
  ('0' + parseInt(rgb[2], 10).toString(16)).slice(-2) : ''
    return val
}

const getCursorPosition = (event, canvas) =>{
    var rect = canvas.getBoundingClientRect()
    var x = event.clientX - rect.left
    var y = event.clientY - rect.top
    return {x, y}
}

class CanvasImage extends Component {
    componentDidMount() {
        const canvas = this.refs.canvas
        const ctx = canvas.getContext('2d')
        const img = this.refs.image
        img.onload = () => {
            ctx.drawImage(img, 0, 0, img.width, img.height)
        }
    }
    selectPixel(event) {
        const {canvas} = this.refs
        
        const cursorPosition = getCursorPosition(event, canvas)
        getImageData(cursorPosition.x, cursorPosition.y, canvas)
    }

    render() {
        return(
            <div>
                <canvas ref="canvas" width={640} height={425} onClick={(event) => this.selectPixel(event)} />
                
                <img width={640} height={425} ref="image" alt='asdads'src={this.props.image} className={this.props.classes.hidden} />
            </div>
        )
    }
}
export default CanvasImage