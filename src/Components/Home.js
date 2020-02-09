import React, { Component } from "react";
import {Helmet} from 'react-helmet';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import {updateToken, token$} from './Store';
import TodoList from './TodoList';
import '../App.css';
import Cat from '../Cat.jpg';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: token$.value,
            email: '',
        };
        this.logOut = this.logOut.bind(this);
    }

    componentDidMount() {
       this.subscribe = token$.subscribe((token) => {
           this.setState({token}); // varför? kan jag ta bort den?
           const decode = jwt.decode(this.state.token);
           this.setState({email: decode.email});
       });
    }
    
    componentWillUnmount() {
        this.subscribe.unsubscribe();
    }
    
    logOut() {
        updateToken(null);
    }
    
    render() {

        let name = this.state.email.split('@')[0];
        let username = name.charAt(0).toUpperCase() + name.slice(1);

        if(!this.state.token){
            return <Redirect to= '/' />
        }

        return (
           <div>
               <div>
                   <Helmet>
                       <title>TodoList</title>
                   </Helmet>
               </div>
               <div className = 'window'>
                   <div className = 'header'>
                       TodoList
                   </div>
                   <div className = 'frame'>
                       <div className = 'cat'><img src = {Cat}/></div>
                       <div>
                           <h3>Welcome {username}</h3>
                       </div>
                        <TodoList />
                    </div>
                </div>
                <button 
                    className = 'btn'
                    onClick = {this.logOut}
                    >LOGOUT
                </button>
            </div>
        )
    }
}

export default Home;