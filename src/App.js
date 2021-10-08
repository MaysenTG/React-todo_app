import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import React, { Component } from 'react'

import Navbar from './Components/layouts/Navbar'
import Todo from './Components/pages/Todo';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { 
        todoitem: null,
        
        isLoading: true
    }
  }
  
  //Loads the JSON file todolist items when the app loads
  componentDidMount() {
    fetch('http://localhost:8000/todo-item')
        .then(res => {
            return res.json();
        })
        .then(data => {
            //Sort array so checked items to to the end of the array
            data.sort((a, b) => {
                return a.checked - b.checked 
            });
            this.setState({ todoItem: data })
            this.setState({ isLoading: false })
        })
  }
  
  render() {
    return (
      <Router>
          <div>
            <Navbar />  
            {this.state.todoItem && <Todo todoItem={this.state.todoItem}/> }
            
            {this.state.isLoading &&
            <div className="h-400 d-flex justify-content-center align-items-center">
              <h1>Loading Data &nbsp;</h1>
              <br/>
              <div className="spinner-border" role="status">
                <span className="sr-only"></span>
              </div> 
            </div>
            }
            
          </div>
      </Router>
    );  
  }
}

export default App;
