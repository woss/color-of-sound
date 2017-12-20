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
import TextField from 'material-ui/TextField'


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
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
})

type Props = {
    classes: Object,
    volume: number,
    handleVolumeUp: Function,
    handleVolumeDown: Function,
    handleChangeOfOscillatorType: Function,
    onCircleRadiusChange: Function,
    handleClickStroke: Function,
    currentOscillatorType: string,
    circleRadius: number,
    clickStroke: string,

}

const Controls = (props: Props) => {
    const {classes, handleVolumeDown, handleVolumeUp, volume} = props
    console.log(props)
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
                        className={classes.textField}
                    >
                        <MenuItem value={'sine'}>Sine</MenuItem>
                        <MenuItem value={'triangle'}>Triangle</MenuItem>
                        <MenuItem value={'sawtooth'}>Sawtooth</MenuItem>
                        <MenuItem value={'square'}>Square</MenuItem>
                    </Select>
                    <TextField
                        id="clickStroke"
                        name="clickStroke"
                        label="Stroke Color"
                        placeholder="white, black, #ffe33ew"
                        type="text"
                        className={classes.textField}
                        value={props.clickStroke}
                        onChange={props.handleClickStroke}
                        margin="normal"
                    ></TextField>
                    <TextField
                        id="circleRadius"
                        name="circleRadius"
                        label="Sound threshold"
                        type="text"
                        className={classes.textField}
                        value={props.circleRadius}
                        onChange={props.onCircleRadiusChange}
                        margin="normal"
                    />
                </FormControl>
            </Paper>
        </Grid>
    )
}

export default withStyles(styles)(Controls)