import React, { Component } from "react";
import { Helmet } from 'react-helmet-async';
import  {Redirect, Link } from 'react-router-dom';
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
            .catch(response => {
                if(response.response.status === 404){
                    this.setState({infoMsg: 'Invalid value'})
                } else if(response.response.status === 400) {
                    this.setState({infoMsg: 'User with that email address exists'})
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
                    <div className = 'frame'>
                        <div className = 'cat'><img src = {Cat} alt = 'cat' /></div>
                        <div className = 'formContainer'>
                        <div className = 'header'>Create an account</div>
                            <form onSubmit = {this.handleSubmit}>
                                <div className = 'section'>
                                    <label className = 'email'></label>
                                    <input 
                                        className = 'input'
                                        type = 'email'
                                        name = 'email'
                                        placeholder = 'Email'
                                        required
                                        value = {this.state.email}
                                        onChange = {this.handleChange}
                                        />
                                </div>
                                <div className = 'section'>
                                    <label className = 'password'></label>
                                    <input 
                                        className = 'input'
                                        type = 'password'
                                        name = 'password'
                                        placeholder = 'Password: least 3 characters' 
                                        required
                                        value = {this.state.password}
                                        onChange = {this.handleChange}/>
                                </div> 
                                <div className = 'footer'>
                                    <button  
                                        className = 'btn'
                                        type = 'submit'>
                                        Sign up
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <p>{this.state.infoMsg}</p>
                    <p>Already a member ?</p>
                    <Link to= {'/'}>Login</Link>
                </div>
            </div>
        );
    }
}
export default Register;