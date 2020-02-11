import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {updateToken} from './Store';
import '../App.css';

class Nav extends Component {
    constructor(props) {
        super(props);

        this.logOut = this.logOut.bind(this);
    }

    logOut() {
        updateToken(null);
    }

    render() {
      return (
        <nav>
            <ul className = 'nav-links'>
                <Link to ='/home'>
                    <li className = 'nav-li'>
                        <button 
                            className = 'btnLogout'
                            onClick = {this.logOut}
                            >LOGOUT
                        </button>
                    </li>
                </Link>
            </ul>
        </nav>
      );
    } 
  }
  
  export default Nav;