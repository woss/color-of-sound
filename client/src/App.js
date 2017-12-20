// @flow

import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Route,Redirect
} from 'react-router-dom'
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

type Props = {
    classes: Object
}

class App extends Component<Props> {
    render() {
        const { classes } = this.props
        return (
            <Router basename="/color-to-sound">
                <div className={classes.root}>
                    <MenuAppBar/>
                    <div className={classes.containerWrapper}>
                        <Route path="/player" component={Player}/>
                    </div>
                    <Route exact path="/" render={() => (
                        <Redirect to="/player"/> )
                    }/>
                    {/* <Route path="/about" component={About}/>
                <Route path="/topics" component={Topics}/> */}
                </div>
                
            </Router>
        )
    }
}
  
export default withStyles(styles)(App)
