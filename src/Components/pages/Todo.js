import React, { Component } from 'react'
import EditItem from './EditItem'


// Firebase DB imports
import db from '../../config'
import { collection, setDoc, doc, addDoc, deleteDoc } from 'firebase/firestore'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


class Todo extends Component {
    
    constructor(props) {
        super(props)
        this.state = { 
            todoList: props.todoItem,
            user: this.props.user,
            progress: 0,
            showProgress: false,
            itemToEdit: null,
        }
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        //Checks if item already in todo list or if it's empty
        if(e.target.InputTodoTitle.value === '' || this.state.todoList.filter(item => item.title === e.target.InputTodoTitle.value).length > 0) {
            alert("Please enter a valid item!")
        }
        else {
            var newTodo = {"title": e.target.InputTodoTitle.value, "completed": false}
        
            this.addItem(newTodo)
        }
        e.target.InputTodoTitle.value = '';
        alert("Update successful!")
    }
    
    
    addItem = async (todoItem) => {
        const list = this.state.todoList
        list.push(todoItem)
        this.setState({ todoList: list })
        
        //Add data to DB
        const payload = todoItem  
        const collectionRef = collection(db, "todolist")
        const docRef = await addDoc(collectionRef, payload);
        console.log(docRef.id)
        
        
        // Update progress after adding item
        //this.handleProgress()
    }
    
    handleDelete = async (todoItem) => {
        
        //Filter through array and add all items except new item to array
        const list = this.state.todoList.filter(item => item !== todoItem)
        
        //Update data
        this.setState({ todoList: list })
        
        //Update progress bar
        this.handleProgress()
        
        const docRef = doc(db, "todolist", todoItem.id)
        await deleteDoc(docRef)
    }
    
    handleComplete = async (todoItem) => {
        //Remove old item from object        
        const newObj = this.state.todoList.filter(item => item !== todoItem)
        
        //Change complete status
        if(todoItem.completed) {
            todoItem.completed = false;
        }
        else {
            todoItem.completed = true;
        }
        
        newObj.push(todoItem)
        
        //Sort array so checked items to to the end of the array
        newObj.sort((a, b) => {
           return a.completed - b.completed 
        });
        
        this.handleProgress();
        this.setState({ todoList: newObj })
        
        // Updating the data within the Firebase DB
        const docRef = doc(db, "todolist", todoItem.id);
        await setDoc(docRef, todoItem)

    }
    
    // Logic for processing the progress bar. Calculated by getting completed items / total as a percentage
    handleProgress(){
        let completed = 0;
        let total = 0
        let progressPercentage = 0;
        
        this.state.todoList.forEach(function (eachItem) {
            if(eachItem.completed) {
                completed++;
            }
            total++;
        });
        
        progressPercentage = (completed / total) * 100;

        this.setState({ progress: progressPercentage })
    
    }
    
    // Logic for showing box to edit todo list
    handleProcessEdit = async (todoItem) => {
        const newTitle = prompt("Edit the following to-do item", todoItem.title)   
          
        if(newTitle === '') {
            alert("Please enter a valid item!")
        }
        else {
            const itemToEdit = todoItem
            const listWithoutItem = this.state.todoList.filter(item => item !== itemToEdit)
            
            itemToEdit.title = newTitle
            listWithoutItem.push(itemToEdit)
            this.setState({ todoList: listWithoutItem })
            
            // Updating the data within the Firebase DB
            const docRef = doc(db, "todolist", todoItem.id);
            await setDoc(docRef, itemToEdit)
        }
    }
    
    componentDidMount() {
        //Sort array so checked items to to the end of the array
        
        this.state.todoList.sort((a, b) => {
            return a.checked - b.checked 
        });
    }
    
    
    render() {
        return (
            <div className="container-fluid w-50">
                
                {this.state.ShowEdit && <EditItem visibility={this.state.ShowEdit} itemToEdit={this.state.itemToEdit} allTodos={this.state.todoList} showModal={this.state.showModal}/>}
                <br/>
                <div className="container-fluid">
                    <h1>Current to do items</h1>
                    
                    <br/>
                    <div className="progress-div d-flex" style={{width: `100`}}>
                        <div style={{ width: `${this.state.progress}%`, backgroundColor: '#0d6efd' }} className="progress" />
                    </div>
                    <br/>
                    
                    <ul className="list-group d-flex justify-content-between">
                        {this.state.todoList
                        // If the item is checked, put a cross over the item, otherwise, display it as normal
                        .map(d => {
                            if (d.completed)
                                return <li key={d.title} id="todoItem" className="bg-light list-group-item d-flex justify-content-between">
                                        <div>
                                            <input onClick={() => {this.handleComplete(d)}} className="form-check-input" type="checkbox" value="" id="flexCheckDefault" defaultChecked={true}/>&nbsp; &nbsp; <del>{d.title}</del>
                                        </div>
                                        <div>
                                            <button type="submit" className="btn btn-link" onClick={() => { this.handleProcessEdit(d) }}>Edit Item</button>
                                            <button className="btn-close" onClick={() => { this.handleDelete(d) }} aria-label="Close"></button>
                                        </div>
                                        
                                       </li>
                                
                            else
                                return <li key={d.title} id="todoItem" className="list-group-item d-flex justify-content-between">
                                        <div>
                                            <input onClick={() => {this.handleComplete(d)}} className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>&nbsp; &nbsp; {d.title}
                                        </div>
                                        <div>
                                            <button type="submit" className="btn btn-link" onClick={() => { this.handleProcessEdit(d) }}>Edit Item</button>
                                            <button className="btn-close" onClick={() => { this.handleDelete(d) }} aria-label="Close"></button>
                                        </div>
                                       </li>
                        })}
                    </ul>
                </div>
                
                <br/>
                <br/>
                
                <div className="container-fluid">
                    <form onSubmit={this.handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="InputTodoTitle" className="form-label">Add new Todo item</label>
                            <input type="text" className="form-control" placeholder="Take the dog for a walk" id="InputTodoTitle" aria-describedby="emailHelp"/>
                        </div>
                        <button type="submit" className="btn btn-primary">Add</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Todo;
