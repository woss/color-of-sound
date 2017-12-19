import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import MenuAppBar from './AppBar'
import Player from './Player/Player'

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <MenuAppBar/>
                    <Route exact path="/" component={Player}/>
                    {/* <Route path="/about" component={About}/>
                <Route path="/topics" component={Topics}/> */}
                </div>
                
            </Router>
        )
    }
}

export default App
