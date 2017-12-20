// @flow

import React from 'react'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import { withStyles } from 'material-ui/styles'
import VolumeUp from 'material-ui-icons/VolumeUp'
import VolumeDown from 'material-ui-icons/VolumeDown'
import IconButton from 'material-ui/IconButton'
import { FormControl } from 'material-ui/Form'
import Select from 'material-ui/Select'
import { InputLabel } from 'material-ui/Input'
import { MenuItem } from 'material-ui/Menu'

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: 30,
    },
    button: {
        margin: theme.spacing.unit,
    },
    paper: {
        marginBottom: theme.spacing.unit,
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
})

type Props = {
    classes: Object,
    volume: number,
    handleVolumeUp: Function,
    handleVolumeDown: Function,
    handleChangeOfOscillatorType: Function,
    currentOscillatorType: string
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
                <IconButton>
                    {Math.floor((volume || 0) * 100 )}
                </IconButton>
                
            </Paper>
            <Paper>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="age-simple">Waveform</InputLabel>
                    <Select
                        value={props.currentOscillatorType}
                        onChange={props.handleChangeOfOscillatorType}
                    >
                        <MenuItem value={'sine'}>Sine</MenuItem>
                        <MenuItem value={'triangle'}>Triangle</MenuItem>
                        <MenuItem value={'sawtooth'}>Sawtooth</MenuItem>
                        <MenuItem value={'square'}>Square</MenuItem>
                    </Select>
                </FormControl>
            </Paper>
        </Grid>
    )
}

export default withStyles(styles)(Controls)