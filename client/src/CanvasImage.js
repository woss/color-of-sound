import React, { Component } from 'react'
import paper from 'paper'
import { Raster, Path, Point } from 'paper'

import { rgbToInt, hexToRGB } from './helpers/color'
import { closest } from './helpers/math'

import HashTable from './colorOfSoundHash'

const ctx = new AudioContext()
let oscillator = null
let gain = null

class CanvasImage extends Component {
    constructor(props, context) {
        super(props, context)
        this.app = {
            hashByRgbInt: {}
        }
    }
    componentDidMount() {
        const canvas = document.getElementById('canvas')
        paper.setup(canvas)

        this.raster = new Raster('image')

        this.raster.onLoad = () => {
            this.raster.position = paper.view.center
        }

        this.path = new Path.Circle({
            center: [50, 200],
            radius: 30,
            strokeColor: 'white'
        })

        const hashTable = new HashTable()
        hashTable.calculate()
        this.app.hashByRgbInt = hashTable.hashByRgbInt
    }
    handleMouseMove(event) {
        // const { canvas } = document.getElementById('canvas')

        const mousePoint = new Point(event.nativeEvent.offsetX, event.nativeEvent.offsetY)
        const path = new Path.Circle({
            center: mousePoint,
            radius: 5,
            strokeColor: 'white'
        })
        const averageColor = this.raster.getAverageColor(path)
        this.path.fillColor = averageColor

        if (averageColor) {
            this.playSoundFor(averageColor)
            console.log('HEX %s %cRGBA', averageColor.toCSS(true), 'background-color: ' + averageColor.toCSS())
        }
    }
    playSoundFor(color) {
        const rgb = hexToRGB(color.toCSS(true))
        const colorAsInt = rgbToInt(rgb)

        const comparisonKeys = Object.keys(this.app.hashByRgbInt)
        const closestNote = closest(colorAsInt, comparisonKeys)
        // console.log(colorAsInt, closestNote, frequency)

        const soundObject = this.app.hashByRgbInt[closestNote]

        var frequency = soundObject.sound.frequency
        console.log(frequency)

        oscillator = ctx.createOscillator()
        gain = ctx.createGain()
        gain.gain.value = 0.3

        oscillator.connect(gain)
        gain.connect(ctx.destination)

        oscillator.frequency.value = frequency
        
        oscillator.start()
    }
    stopPlayingSound() {
        // gain.gain.value = 0.1
        gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1)
        setTimeout(function(){
            oscillator.stop(ctx.currentTime + 1)
        }, 100)
        // oscillator.stop(ctx.currentTime + 0.5)
        // oscillator.disconnect()
    }
    render() {
        return (
            <div>
                <canvas id="canvas" width={800} height={800} onMouseUp={this.stopPlayingSound} onMouseDown={(event) => this.handleMouseMove(event)} />

                <img width={800} height={800} id="image" alt='asdads' src={this.props.image} className={this.props.classes.hidden} />
            </div>
        )
    }
}
export default CanvasImage