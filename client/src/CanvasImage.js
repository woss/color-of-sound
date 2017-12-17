import React, { Component } from 'react'
import {rgbToHex, rgbToInt} from './helpers/color'

import HashTable from './colorOfSoundHash'

const getImageData = (x, y, canvas) => {
    const context = canvas.getContext('2d')
    const ImageData = context.getImageData(x, y, 1, 1)
    //returns rgba()
    const color = ImageData.data.slice(0, 4)
    const rgbInt = rgbToInt(color)
    const style = 'background-color: rgba(' + color + ');'
    console.log('HEX %s Color %cRGBA', rgbToHex(color), style, color, rgbInt)
}

const getCursorPosition = (event, canvas) => {
    var rect = canvas.getBoundingClientRect()
    var x = event.clientX - rect.left
    var y = event.clientY - rect.top
    return { x, y }
}

class CanvasImage extends Component {
    componentDidMount() {
        const canvas = this.refs.canvas
        const ctx = canvas.getContext('2d')
        const img = this.refs.image
        img.onload = () => {
            ctx.drawImage(img, 0, 0, img.width, img.height)
        }

        const hashTable = new HashTable()
        hashTable.calculate()
    }
    selectPixel(event) {
        const { canvas } = this.refs

        const cursorPosition = getCursorPosition(event, canvas)
        getImageData(cursorPosition.x, cursorPosition.y, canvas)
    }

    render() {
        return (
            <div>
                <canvas ref="canvas" width={640} height={425} onClick={(event) => this.selectPixel(event)} />

                <img width={640} height={425} ref="image" alt='asdads' src={this.props.image} className={this.props.classes.hidden} />
            </div>
        )
    }
}
export default CanvasImage