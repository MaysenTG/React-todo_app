import React, { Component } from 'react'
import EditItem from './EditItem'

class Todo extends Component {
    
    constructor(props) {
        super(props)
        this.state = { 
            todoitem: this.props.todoItem,
            progress: 0,
            showProgress: false,
            ShowEdit: false,
            itemToEdit: null
        }
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        //Checks if item already in todo list or if it's empty
        if(e.target.InputTodoTitle.value === '' || this.state.todoitem.filter(item => item.title === e.target.InputTodoTitle.value).length > 0) {
            alert("Please enter a valid item!")
        }
        else {
            var newTodo = {"title": e.target.InputTodoTitle.value, "completed": false}
        
            this.addItem(newTodo)
        }
        e.target.InputTodoTitle.value = '';
    }
    
    
    addItem(todoItem) {
        const list = this.state.todoitem
        
        list.push(todoItem)
        this.setState({ todoitem: list })
        localStorage.setItem("todo-list", JSON.stringify(list))
    }
    
    handleDelete = (todoItem) => {
        
        //Filter through array and add all items except new item to array
        const list = this.state.todoitem.filter(item => item !== todoItem)
        
        //Update data
        localStorage.setItem("todo-list", JSON.stringify(list))
        this.setState({ todoitem: list })
    }
    
    handleComplete = (todoItem) => {
        //Remove old item from object        
        const newObj = this.state.todoitem.filter(item => item !== todoItem)
        
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
        
        this.setState({ todoitem: newObj })
        localStorage.setItem("todo-list", JSON.stringify(newObj))
    }
    
    // Logic for processing the progress bar. Calculated by getting completed items / total as a percentage
    handleProgress(){
        let completed = 0;
        let total = 0
        let progressPercentage = 0;
        
        this.state.todoitem.forEach(function (eachItem) {
            if(eachItem.completed) {
                completed++;
            }
            total++;
        });
        
        progressPercentage = (completed / total) * 100;

        this.setState({ progress: progressPercentage })
    
    }
    
    // Logic for showing box to edit todo list
    handleShowEdit = (todoList) => {
        this.setState({ ShowEdit: true })
        this.setState({ itemToEdit: todoList })
    }
    
    componentDidMount() {
        //Sort array so checked items to to the end of the array
        this.state.todoitem.sort((a, b) => {
            return a.checked - b.checked 
        });
    }
    
    
    render() {
        return (
            <div className="container-fluid w-50">
                <br/>
                <div className="container-fluid">
                    <h1>Current to do items</h1>
                    
                    <br/>
                    <div className="progress-div d-flex" style={{width: `100`}}>
                        <div style={{ width: `${this.state.progress}%`, backgroundColor: '#0d6efd' }} className="progress" />
                    </div>
                    <br/>
                    
                    <ul className="list-group d-flex justify-content-between">
                        {this.state.todoitem
                        // If the item is checked, put a cross over the item, otherwise, display it as normal
                        .map(d => {
                            if (d.completed)
                                return <li key={d.title} id="todoItem" className="bg-light list-group-item d-flex justify-content-between">
                                        <div>
                                            <input onClick={() => {this.handleComplete(d)}} className="form-check-input" type="checkbox" value="" id="flexCheckDefault" defaultChecked={true}/>&nbsp; &nbsp; <del>{d.title}</del>
                                        </div>
                                        <div>
                                            <button type="submit" className="btn btn-link" onClick={() => { this.handleShowEdit(d) }}>Edit Item</button>
                                            <button className="btn-close" onClick={() => { this.handleDelete(d) }} aria-label="Close"></button>
                                        </div>
                                        
                                       </li>
                                
                            else
                                return <li key={d.title} id="todoItem" className="list-group-item d-flex justify-content-between">
                                        <div>
                                            <input onClick={() => {this.handleComplete(d)}} className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>&nbsp; &nbsp; {d.title}
                                        </div>
                                        <div>
                                            <button type="submit" className="btn btn-link" onClick={() => { this.handleShowEdit(d) }}>Edit Item</button>
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
                
                {this.state.ShowEdit && <EditItem visibility={this.state.ShowEdit} itemToEdit={this.state.itemToEdit} allTodos={this.state.todoitem}/>}
            </div>
        )
    }
}

export default Todo;
