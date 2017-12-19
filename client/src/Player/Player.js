// @flow

import React, { Component } from 'react'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import paper, { Raster, Path, Point } from 'paper'
import { withStyles } from 'material-ui/styles'
import { rgbToInt, hexToRGB, rgbToHex } from '../helpers/color'
import { closest } from '../helpers/math'
import HashTable from './colorOfSoundHash'

import image from '../assets/images/image.jpg'
import CanvasImage from './CanvasImage'

const ctx = new AudioContext()
let oscillator = null
let gain = null

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: 30,
    },
    paper: {
        padding: 16,
        color: theme.palette.text.secondary,
        minHeight:400
    },
    hidden: {
        display: 'none'
    },
    canvas:{
        width: 800,
        height: 533
    }
})

type Props = {
    classes: Object,
    image: string
}

type State = {
    hashByRgbInt: Object,
    circles: Array<any>,
    settings: {
        circleRadius: number
    },
    currentSound: {
        model: Object,
        selectedColor: string,
        playedColor: string
    }
}

class Player extends Component<Props>{
    static defaultProps = {
        image: image
    }
    constructor(props, context) {
        super(props, context)
        
        this.state = {
            hashByRgbInt: {},
            circles: [], // not used for now
            settings: {
                circleRadius: 15
            },
            currentSound :{
                model: {},
                selectedColor: '',
                playedColor: ''
            }
        }
    }
    componentDidMount() {
        const canvas = document.getElementById('canvas')
        paper.setup(canvas)

        const image = document.getElementById('image')
        this.raster = new Raster(image)
        this.raster.onLoad = () => {
            this.raster.position = paper.view.center
        }
        this.path = new Path.Circle({
            center: [50, 100],
            radius: this.state.settings.circleRadius,
            strokeColor: 'white'
        })

        const hashTable = new HashTable()
        hashTable.calculate()
        const hashByRgbInt = hashTable.hashByRgbInt
        this.setState({hashByRgbInt})
    }
    newCircles(amount) {
        amount = amount || 10
        let circles = []
        let circle = {}
        for (let i = 0; i < amount; i++) {
            const x = Math.floor(Math.random() * 800)
            const y = Math.floor(Math.random() * 800)
            const point = new Point(x, y)
            const countdown = 500 + Math.random() * 1000
            circle = {
                countdown,
                point
            }
            circles.push(circle)
        }
        this.setState({ circles })
        if (amount === 1) {
            return circle
        }
        return circles
    }

    animate(time) {
        const { circleRadius } = this.state.settings
        const circles = this.newCircles(20)
            
        if (!circles) {
            return
        }
        // calc elapsed time since the last frame
        var elapsed = time - this.state.lastTime
        console.log(time, this.state.lastTime)
        this.setState({lastTime: time})


        // reduce countdown timer of each circle by the elapsed time
        // remove any circles where countdown<0
        let i = circles.length
        setInterval(()=>{
            i = circles.length
            console.log('circle length', i)
        }, 1000)

        while (--i >= 0) {
            var circle = circles[i]
            console.log(circle.countdown, elapsed)
            circle.countdown -= elapsed
            
            if (circle.countdown < 0) {
                circles.splice(i, 1)
                const path = new Path.Circle({
                    center: circle.point,
                    radius: circleRadius,
                    strokeColor: 'white'
                })
                this.placeTheClick(path)
                this.stopPlayingSound(null, Math.floor(Math.random() * 2))
                circles.push(this.newCircles(1))
            }
        }
    }
    startTheSong() {
        let lastTime = performance.now()
        this.setState({lastTime})
        requestAnimationFrame((time)=>{
            this.animate(time)
        })
    }
    placeTheClick(path) {

        const averageColor = this.raster.getAverageColor(path)
        this.path.fillColor = averageColor
        if (averageColor) {
            this.playSoundFor(averageColor)
            // console.log('HEX %s %cRGBA', averageColor.toCSS(true), 'background-color: ' + averageColor.toCSS())
        }
    }
    playSoundFor(color) {
        
        const rgb = hexToRGB(color.toCSS(true))
        const colorAsInt = rgbToInt(rgb)

        const comparisonKeys = Object.keys(this.state.hashByRgbInt)
        const closestNote = closest(colorAsInt, comparisonKeys)
        // console.log(colorAsInt, closestNote, frequency)

        const soundObject = this.state.hashByRgbInt[closestNote]
        const frequency = soundObject.sound.frequency
        const model = this.state.hashByRgbInt[closestNote]
        const currentSound = {
            model: model,
            selectedColor: rgbToHex(rgb),
            playedColor: model.hex
        }
        this.setState({currentSound})
        oscillator = ctx.createOscillator()
        gain = ctx.createGain()
        gain.gain.value = 0.7

        oscillator.connect(gain)
        gain.connect(ctx.destination)

        oscillator.frequency.value = frequency

        oscillator.start()
    }
    stopPlayingSound(event, whenToStop) {
        // gain.gain.value = 0.1
        gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1)
        whenToStop = whenToStop || 1
        setTimeout(function () {
            oscillator.stop(ctx.currentTime + whenToStop)
        }, 100)
        // oscillator.stop(ctx.currentTime + 0.5)
        // oscillator.disconnect()
    }
    handleSoundRadiusChnage(e) {
        const {settings} = this.state
        settings.circleRadius = e.target.value
        this.setState({settings})
    }
    handlePlayClick(e) {
        const mousePoint = new Point(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
        this.placeTheClick(mousePoint)
    }
    render() {
        const {currentSound} = this.state
        const styles ={
            selectedColor: {
                backgroundColor: currentSound.selectedColor
            },
            playedColor: {
                backgroundColor: currentSound.playedColor
            },
        }
        const { classes } = this.props
        return (
            <div>
                <CanvasImage 
                    stopPlayingSound={(event)=>{this.stopPlayingSound(event)}} 
                    handlePlayClick={(event)=>{this.handlePlayClick(event)}}
                    image={this.props.image}></CanvasImage>
                <Grid row >
                    <Grid container >
                        <Grid item xs>
                            <Paper className={classes.paper}> 
                                <pre>
                                    {JSON.stringify(currentSound, null, 2)}
                                </pre>
                            </Paper>
                        </Grid>
                        <Grid item xs>
                            <Paper style={styles.selectedColor} className={classes.paper}>Selected Average color</Paper>
                        </Grid>
                        <Grid item xs>
                            <Paper style={styles.playedColor} className={classes.paper}>Played Color/Note</Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(Player)