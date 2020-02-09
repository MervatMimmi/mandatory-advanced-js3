import React, { Component } from "react";
import { Helmet } from 'react-helmet';
import  {Redirect } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import Cat from '../Cat.jpg';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isRegistered: false,
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();

        const data = {
            email: this.state.email,
            password: this.state.password,
        }
        console.log(data);

        this.source = axios.CancelToken.source();
           
        let API_ROOT = 'http://3.120.96.16:3002';

        axios.post(API_ROOT +'/register', data, {CancelToken:this.source.token})
             .then((response) => {
                console.log(response);
                this.setState({isRegistered: true});
            })
            .catch((error) => {
                if(this.state.email === '' || this.state.password === '') {
                    this.setState({infoMsg : 'Please fill the empty fild'});
                    return;
                } else {
                    this.setState({infoMsg: 'User with that email address exists'});
                    return;
                }
            });
    }
    

    componentWillUnmount() {
        if(this.source) {
            this.source.cancel();
        }
    }

    handleChange(e){
        this.setState({ [e.target.name]: e.target.value})
    }


    render() {
        if(this.state.isRegistered) {
            return <Redirect to='/' />;
        }
        return (
            <div>
                <div>
                    <Helmet>
                        <title>Register</title>
                    </Helmet>
                </div>
                <div className ='window'>
                    <div className = 'header'>Register</div>
                    <div className = 'frame'>
                        <div className = 'cat'><img src = {Cat} /></div>
                        <div className = 'formContainer'>
                            <form onSubmit = {this.handleSubmit}>
                                <div className = 'section'>
                                    <label className = 'email'>Email</label>
                                    <input 
                                        className = 'input'
                                        type = 'email'
                                        name = 'email'
                                        placeholder = 'Enter your email...'
                                        required
                                        value = {this.state.email}
                                        onChange = {this.handleChange}
                                        />
                                </div>
                                <div className = 'section'>
                                    <label className = 'password'>Password</label>
                                    <input 
                                        className = 'input'
                                        type = 'password'
                                        name = 'password'
                                        placeholder = 'Enter your password...' 
                                        required
                                        value = {this.state.password}
                                        onChange = {this.handleChange}/>
                                </div> 
                                <div className = 'footer'>
                                    <button  
                                        className = 'btn'
                                        type = 'submit'>
                                        Register
                                    </button>
                                </div>
                            </form>
                            <p>{this.state.infoMsg}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Register;