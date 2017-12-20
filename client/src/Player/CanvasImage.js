// @flow

import React, { Component } from 'react'
import Grid from 'material-ui/Grid'
import { withStyles } from 'material-ui/styles'



const styles = () => ({
    root: {
        flexGrow: 1,
    },
    hidden: {display:'none'},
    canvas:{
        width: 800,
        height: 533
    }
})

type Props = {
    classes: Object,
    image: string,
    stopPlayingSound: Function,
    handlePlayClick: Function,
    width: string,
    height: string
}


class CanvasImage extends Component<Props> {
    static defaultProps = {
        width: 800,
        height: 533
    }

    render() {
        const { image, classes, width, height, stopPlayingSound, handlePlayClick } = this.props

        return (
            <div className={classes.root}>
                <Grid>
                    <canvas 
                        width={width}
                        height={height} 
                        id="canvas" className={classes.canvas} 
                        onMouseUp={(event) => stopPlayingSound(event)} 
                        onMouseDown={(event) => handlePlayClick(event)} />
                    <img id="image" alt='Place where NAME should go' src={image} className={classes.hidden} />
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(CanvasImage)
