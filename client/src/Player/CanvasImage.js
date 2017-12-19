// @flow

import React, { Component } from 'react'
import Grid from 'material-ui/Grid'
import { withStyles } from 'material-ui/styles'



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
    image: string,
    stopPlayingSound: Function,
    handlePlayClick: Function
}


class CanvasImage extends Component<Props> {
    
    render() {
        const { classes } = this.props

        return (
            <div>
                <Grid>
                    <canvas resize={true} id="canvas" className={classes.canvas} 
                        onMouseUp={(event) => this.props.stopPlayingSound(event)} 
                        onMouseDown={(event) => this.props.handlePlayClick(event)} />
                    <img  id="image" alt='Place where NAME should go' src={this.props.image} className={classes.hidden} />
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(CanvasImage)
