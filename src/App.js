import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import{HelmetProvider} from 'react-helmet-async';
import Login from './Components/Login';
import Register from './Components/Register';
import Home from './Components/Home';
import './App.css';


class App extends Component {

  render() {
    return (
      <HelmetProvider>
        <div className="App">
          <Router>
            <Route exact path = '/' component = {Login} />
            <Route path ='/register' component = {Register} />
            <Route path = '/home' component = {Home}/>
          </Router>
        </div>
      </HelmetProvider>
    );
  } 
}

export default App;
