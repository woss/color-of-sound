// @flow

import React, { Component } from 'react'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import paper, { Raster, Path, Point } from 'paper'
import { withStyles } from 'material-ui/styles'


import { rgbToInt, hexToRGB, rgbToHex } from '../helpers/color'
import { closest } from '../helpers/math'
import HashTable from './440-optimised-hashtable'

import image from '../assets/images/image.jpg'
import CanvasImage from './CanvasImage'
import Controls from './Controls'

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: 30,
    },
    paper: {
        padding: theme.spacing.unit,
        color: theme.palette.text.secondary,
        minHeight: 400
    },
    hidden: {
        display: 'none'
    },
    canvas: {
        width: 800,
        height: 533
    }
})

type Props = {
    classes: Object,
    image: string
}

type State = {
    oscillatorType: string,
    hashByRgbInt: Object,
    circles: Array<any>,
    settings: {
        circleRadius: number,
        volume: number
    },
    currentSound: {
        model: Object,
        selectedColor: string,
        playedColor: string
    }
}

class Player extends Component<Props, State>{
    static defaultProps = {
        image: image
    }

    constructor(props, context) {
        super(props, context)
        
        this.soundApp = {}
        this.paperJs = {}

        this.state = {
            oscillatorType: 'sine',
            hashByRgbInt: {},
            circles: [], // not used for now
            settings: {
                circleRadius: 15,
                volume: 0.2
            },
            currentSound: {
                model: {},
                selectedColor: '',
                playedColor: ''
            }
        }
    }
    componentDidMount() {
        paper.setup(document.getElementById('canvas'))
        
        const raster = new Raster(document.getElementById('image'))

        raster.onLoad = () => {
            raster.position = paper.view.center
        }
        
        this.soundApp = {
            ctx: new AudioContext(),
            oscillator: null,
            gain: null,
        }
        this.paperJs = {
            raster: raster,
            // path: new Path.Circle({
            //     center: [50, 100],
            //     radius: this.state.settings.circleRadius,
            //     strokeColor: 'white'
            // })
        }
        
        const hashTable = new HashTable()
        hashTable.calculate()
        const hashByRgbInt = hashTable.hashByRgbInt

        this.setState({ hashByRgbInt })
    }
    placeTheClick(path) {
        const averageColor = this.paperJs.raster.getAverageColor(path)

        // this.paperJs.path.fillColor = averageColor

        if (averageColor) {
            this.playSoundFor(averageColor)
            // console.log('HEX %s %cRGBA', averageColor.toCSS(true), 'background-color: ' + averageColor.toCSS())
        }
    }
    playSoundFor(color) {
        const  soundApp = this.soundApp
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
        this.setState({ currentSound })
        soundApp.oscillator = soundApp.ctx.createOscillator()
        soundApp.oscillator.type = this.state.oscillatorType
        soundApp.gain = soundApp.ctx.createGain()
        soundApp.gain.gain.value = this.state.settings.volume
        
        soundApp.oscillator.connect(soundApp.gain)
        soundApp.gain.connect(soundApp.ctx.destination)

        soundApp.oscillator.frequency.value = frequency

        soundApp.oscillator.start()
    }
    stopPlayingSound(event, whenToStop) {
        const  soundApp = this.soundApp

        soundApp.gain.gain.setValueAtTime(soundApp.gain.gain.value, soundApp.ctx.currentTime)
        soundApp.gain.gain.exponentialRampToValueAtTime(0.0001, soundApp.ctx.currentTime + 1)
        whenToStop = whenToStop || 1
        setTimeout(function () {
            soundApp.oscillator.stop(soundApp.ctx.currentTime + whenToStop)
        }, 100)
    }
    handleSoundRadiusChnage(e) {
        const { settings } = this.state
        settings.circleRadius = e.target.value
        this.setState({ settings })
    }
    handlePlayClick(e) {
        const mousePoint = new Point(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
        this.placeTheClick(mousePoint)
    }
    handleVolumeUp(volume) {
        volume += 0.01
        const { settings } = this.state
        settings.volume = volume
        this.setState({ settings })
    }

    handleVolumeDown(volume) {
        volume -= 0.01
        const { settings } = this.state
        settings.volume = volume
        this.setState({ settings })
    }
    handleChangeOfOscillatorType(event) {
        const oscillatorType = event.target.value
        this.setState({oscillatorType})
    }
    render() {
        const { currentSound, settings } = this.state
        const styles = {
            selectedColor: {
                backgroundColor: currentSound.selectedColor
            },
            playedColor: {
                backgroundColor: currentSound.playedColor
            },
        }
        const { classes } = this.props
        return (
            <Grid>
                <Grid>
                    <Grid container>
                        <Grid item xs>
                            <CanvasImage
                                stopPlayingSound={(event) => { this.stopPlayingSound(event) }}
                                handlePlayClick={(event) => { this.handlePlayClick(event) }}
                                image={this.props.image}></CanvasImage>
                        </Grid>
                        <Controls
                            handleVolumeUp={this.handleVolumeUp.bind(this, settings.volume)}
                            handleVolumeDown={this.handleVolumeDown.bind(this, settings.volume)}
                            handleChangeOfOscillatorType={(e)=>{this.handleChangeOfOscillatorType(e)}}
                            currentOscillatorType={this.state.oscillatorType}
                            volume={settings.volume}>
                        </Controls>
                    </Grid>
                </Grid>

                <Grid>
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
            </Grid>
        )
    }
}

export default withStyles(styles)(Player)