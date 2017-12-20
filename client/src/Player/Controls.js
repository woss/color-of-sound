// @flow

import React from 'react'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import { withStyles } from 'material-ui/styles'
import VolumeUp from 'material-ui-icons/VolumeUp'
import VolumeDown from 'material-ui-icons/VolumeDown'
import IconButton from 'material-ui/IconButton'

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: 30,
    },
    button: {
        margin: theme.spacing.unit,
    }
})

type Props = {
    classes: Object,
    volume: number,
    handleVolumeUp: Function,
    handleVolumeDown: Function,
}

const Controls = (props: Props) => {
    const {classes,handleVolumeDown, handleVolumeUp, volume} = props
    
    return (
        <Grid item xs>
            <Paper className={classes.paper}>
                <IconButton onClick={handleVolumeDown} onClickCapture={handleVolumeDown} color="primary" aria-label="add" className={classes.button}>
                    <VolumeDown/>
                </IconButton>
                <IconButton onClick={handleVolumeUp} onClickCapture={handleVolumeUp} color="primary" aria-label="add" className={classes.button}>
                    <VolumeUp/>
                </IconButton>
                <span>
                    {(volume || 0) * 100}
                </span>
            </Paper>
        </Grid>
    )
}

export default withStyles(styles)(Controls)