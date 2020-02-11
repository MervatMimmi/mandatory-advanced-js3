import React, { Component } from "react";
import { Helmet } from 'react-helmet-async';
import {Redirect} from 'react-router-dom';
import jwt from 'jsonwebtoken';
import {token$} from './Store';
import Nav from './Nav';
import TodoList from './TodoList';
import '../App.css';
import Cat from '../Cat.jpg';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: token$.value,
            decodedEmail: '',
        };
    }

    componentDidMount() {
        this.subscribe = token$.subscribe((token) => {
            this.setState({token}); 
            if (token) {
             const decode = jwt.decode(this.state.token);
             console.log(decode);
             this.setState({decodedEmail: decode.email});
            }
        });
    }
    
    componentWillUnmount() {
        this.subscribe.unsubscribe();
    }
    
    render() {

        let name = this.state.decodedEmail.split('@')[0];
        let username = name.charAt(0).toUpperCase() + name.slice(1);

        if(!this.state.token){
            return <Redirect to= '/' />
        }

        return (
            <div>
                <div>
                    <Helmet>
                       <title>Home</title>
                    </Helmet>
                </div>
                <div className = 'header'>
                <Nav/>
                </div>
                <div className = 'window'>
                    <div className = 'header'>
                       TodoList
                    </div>
                    <div className = 'frame'>
                        <div className = 'cat'><img src = {Cat} alt = 'cat'/></div>
                        <div className = 'welcome'>
                           <h3>Welcome {username}</h3>
                        </div>
                        <TodoList />
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;