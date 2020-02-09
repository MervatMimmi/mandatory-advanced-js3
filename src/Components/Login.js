import React, { Component } from "react";
import {Helmet} from 'react-helmet';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import {token$, updateToken} from './Store';
import '../App.css';
import Cat from '../Cat.jpg';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            IsLoggedIn : false,
            token: token$.value,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount(){
        this.subscription = token$.subscribe(token => {
            this.setState({token});
        });
    }   

    componentWillUnmount() {
        this.subscription.unsubscribe();
    }

    handleSubmit(e){
        e.preventDefault();

        const loginData = {
            email:this.state.email,
            password: this.state.password,
            }

        console.log(loginData);

        let API_ROOT = 'http://3.120.96.16:3002';

        axios.post(API_ROOT + '/auth', loginData)
            .then((response) => {
                this.setState({isLoggedIn :true});
                updateToken(response.data.token);
                window.localStorage.setItem('token', response.data.token)
                })
            .catch((error) => {
                this.setState({isLoggedIn: false});
                console.error(error);
                });
        }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value})
    }
    
    render() {
        if(this.state.isLoggedIn) {
            return <Redirect to= '/home' />;
        }
        return(
            <div>
                <div>
                    <Helmet>
                        <title>Login</title>
                    </Helmet>
                </div>
            <   div className ='window'>
                    <div className = 'header'>
                        Login
                    </div>
                    <div className = 'frame'>
                        <div className = 'cat'><img src = {Cat} /></div>
                        <div className = 'formContainer'>
                            <form onSubmit = {this.handleSubmit}>
                                <div className = 'section'>
                                    <label className = 'email'>Email</label>
                                    <input className = 'input'
                                        type = 'email'
                                        name = 'email'
                                        placeholder = 'Enter your email...' 
                                        required
                                        value = {this.state.email}
                                        onChange = {this.onChange}
                                        />
                                    
                                    </div>
                                <div className = 'section'>
                                    <label className = 'password'>Password</label>
                                    <input className = 'input'
                                        type = 'password'
                                        name = 'password'
                                        placeholder = 'Enter your password...' 
                                        required
                                        value = {this.state.password}
                                        onChange ={this.onChange}
                                        />
                                </div> 
                                <div className = 'footer'>
                                    <button  
                                        className = 'btn'
                                        type = 'submit'>
                                        Login
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Login;