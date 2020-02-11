import React, { Component } from "react";
import { GoTrashcan } from "react-icons/go";
import axios from 'axios';
import {token$} from './Store';
import '../App.css';

let API_ROOT = 'http://3.120.96.16:3002';

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: token$.value,
            newTodo: '',
            todoList: [],
            redirect: false,
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        this.subscription = token$.subscribe(token => {
            this.setState({token});
        });
        this.getTodo();
    }

    componentWillUnmount() {
        this.subscription.unsubscribe();
    }

    getTodo() {
        axios.get(API_ROOT +'/todos', {
            headers: {
                Authorization: `Bearer ${this.state.token}`
            }
        })
        .then(response => {
            this.setState({todoList: response.data.todos});
        })
        .catch(error => {
            console.error(error);
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        
        axios.post(API_ROOT +'/todos', {content:this.state.newTodo},{
            headers: {
                Authorization: `Bearer ${this.state.token}`
                }
            })
            .then(response => {
                console.log(response);
                this.setState({redirect: true, newTodo: ''});
                return this.getTodo();
            })
            .catch(error => {
                console.error(error);
            })
    }

    delete(id){
        axios.delete(API_ROOT + '/todos/' + id, {
            headers: {
                Authorization: `Bearer ${this.state.token}`
            }
        })
        .then(() => this.getTodo())
        .catch((response) => {
            console.log(response);
            this.getTodo();
        })
    }

    handleChange(e) {  
        this.setState({ newTodo:e.target.value });
    }

    render() {

        return (
            <div>
                <form onSubmit = {this.handleSubmit}>
                    <div >
                        <input 
                            className = 'input'
                            type = 'text'
                            minLength = {1}
                            maxLength = {30}
                            placeholder = 'Write here...'
                            value = {this.state.newTodo}
                            onChange = {this.handleChange}
                            />
                        <button 
                            className ='btnTodo'
                            type = 'submit'>
                            Add item
                        </button>
                    </div>
                </form>
                <main>
                    <ul className ='section'>
                        {this.state.todoList.map(item => {
                            return (
                                <li 
                                    className = 'input'
                                    key = {item.id}>
                                        {item.content}
                                        <button
                                            className ='btnList'
                                            onClick = {(e) => this.delete(item.id)}>
                                            <GoTrashcan />
                                        </button>
                                </li>
                            )
                        })}
                    </ul>
                </main>
            </div>
        )
    }
}

export default TodoList;