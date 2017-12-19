import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import MenuAppBar from './AppBar'
import Player from './Player/Player'

const styles = theme => ({
    root: {
        flexGrow: 1
        // marginTop: 30
    },
    containerWrapper: {
        padding : 24,
    },
    paper: {
        padding: 16,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
})
  

class App extends Component {
    render() {
        const { classes } = this.props
        return (
            <Router>
                <div className={classes.root}>
                    <MenuAppBar/>
                    <div className={classes.containerWrapper}>
                        <Route exact path="/" component={Player}/>
                    </div>
                    {/* <Route path="/about" component={About}/>
                <Route path="/topics" component={Topics}/> */}
                </div>
                
            </Router>
        )
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
}
  
export default withStyles(styles)(App)
  
