import React from 'react';
import '../styles/TodoApp.css'
import Todos from './ToDoApp/ToDos'
import axios from 'axios'
const instance = axios.create({baseURL:'http://localhost:4000'})
class TodoApp extends React.Component {
    state =
        {
            todos: [],
            values: ''
        }
    /*todos: [{id:...,name:'...',checked:true/false}]*/

    componentDidMount = () =>
    {
        instance.get('/getTodos')
        .then((response) => {
            console.log(response)
            const todos = response.data.todos;
            this.setState({todos})
        })
    }
    addToDo = () => {
        let inputValue = this.state.inputValue;
        let newToDo =
        {
            id: inputValue + '__' + Math.random(),
            name: inputValue,
            checked: false
        }
        let newToDos = [
            ...this.state.todos,
            newToDo
        ]
            instance.post('/add', {
                todo: {
                    name: newToDo.name,
                    id: newToDo.id,
                    checked: newToDo.checked
                }
            })
        //let newTodos = this.state.todos.push(inputValue);

        
            .then((response) => {
                // handle success
                console.log(response);
                let newToDos = [
                    ...this.state.todos,
                    newToDo
                ]
                this.setState({
                    todos: newToDos
                })
            })
    }
    updateChecked = (id) => {
        instance.post('/checked/' + id)
        .then( (response) => {
            let updateTodos = [...this.state.todos];
            let index = updateTodos.findIndex(x => x.id === id);
            updateTodos[index] = {
            ...updateTodos[index],
            checked: !updateTodos[index].checked
            }

            this.setState({ todos: updateTodos });

        })
        
    }
    deleteItem = (id) => {
        instance.post('/delete/' + id)
        .then( (response) => {
            let updateTodos = [...this.state.todos];
            let index = updateTodos.findIndex(x => x.id === id);
            updateTodos.splice(index, 1);
            this.setState({ todos: updateTodos });

        })
       
    }

    inputChangeHandler = (e) => {
        this.setState({ inputValue: e.target.value })
    }
    render() {
        return (
            <div>
                <input value={this.state.InputValue} onChange={this.inputChangeHandler} />

                <button className={'add-button'} onClick={this.addToDo}>Add</button>
                <Todos todos={this.state.todos}
                    deleteItem={this.deleteItem}
                    updateChecked={this.updateChecked}
                />
            </div>
        );
    }

}

export default TodoApp;
