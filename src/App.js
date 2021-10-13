import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import React, { Component } from 'react'


// Firebase DB imports
import db from './config'

import { onSnapshot, collection, query, orderBy } from 'firebase/firestore'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


import Navbar from './Components/layouts/Navbar'
import Todo from './Components/pages/Todo';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { 
        todoList: null,
        isLoading: true,
        user: ''
    }
  }
  
  //Loads the JSON data from the local storage todo-list item when the app loads
  componentDidMount() {
    //const userAuth = prompt("Enter a user to see their todo list")
    try {
      const q = query(collection(db, "todolist"), orderBy("completed", "asc"))
      onSnapshot(q, (snapshot) => {
        this.setState({ todoList: snapshot.docs.map((doc) => ({...doc.data(), id: doc.id }))})
        this.setState({ isLoading: false })
        this.setState({ user: "todolist" })
    });  
    }
    catch(e) {
      console.log("No user by the name of todolist")
    }
  }

  
  render() {
    return (
      <Router>
          <div>
            <Navbar />
            {this.state.todoList && <Todo todoItem={this.state.todoList} user={this.state.user}/> }
            
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

