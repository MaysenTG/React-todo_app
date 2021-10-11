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
  
  //Loads the JSON data from the local storage todo-list item when the app loads
  componentDidMount() {
    const todoData = JSON.parse(localStorage.getItem("todo-list"))
    
    if(todoData){ 
      todoData.sort((a, b) => {
        return a.checked - b.checked 
      });
      
      this.setState({ todoitem: todoData }) 
    }
    
    // If no list is found, create a single item for demonstration purposes
    else {
      this.setState({ todoitem: [{
        "title": "My first todo item",
        "completed": false
      }] })
    }
    
    this.setState({ isLoading: false })
  }
  
  render() {
    return (
      <Router>
          <div>
            <Navbar />  
            {this.state.todoitem && <Todo todoItem={this.state.todoitem}/> }
            
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
