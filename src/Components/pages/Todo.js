import React, { Component } from 'react'

class Todo extends Component {
    
    constructor(props) {
        super(props)
        this.state = { 
            todoitem: this.props.todoItem,
            progress: 0
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
        
            const list = this.state.todoitem.concat(newTodo)
            
            this.setState({ todoitem: list })
            
            this.addItem(e.target.InputTodoTitle.value, false)   
        }
        e.target.InputTodoTitle.value = '';
    }
    
    addItem(item, checked) {
        var obj = {"title": item, "completed": checked}
        fetch("http://localhost:8000/todo-item", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
        
        })
    }
    
    handleDelete = (todoItem) => {
        
        //Filter through array and add all items except new item to array
        const list = this.state.todoitem.filter(item => item !== todoItem)
        const targetID = todoItem.id
        
        const url = "http://localhost:8000/todo-item/" + targetID
        
        fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify()
        
        })
        
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
    }
    
    handleUpdate = (todoList) => {
        fetch("http://localhost:8000/todo-item", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(todoList)
        
        })
    }
    
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
    
    
    render() {
        return (
            <div className="container-fluid w-50">
                <br/>
                <div className="container-fluid">
                    <h1>Current to do items</h1>
                    <br/>
                    
                    <div className="progress-div" style={{width: `100`}}>
                        <div style={{ width: `${this.state.progress}%`, backgroundColor: '#0d6efd' }} className="progress" />
                    </div>
                    <br/>
                    
                    <ul className="list-group d-flex justify-content-between">
                        {this.state.todoitem
                        
                        // If the item is checked, put a cross over the item, otherwise, display it as normal
                        .map(d => {
                            if (d.completed)
                                return <li key={d.title} id="todoItem" className="bg-light list-group-item d-flex justify-content-between"><div><input onClick={() => {this.handleComplete(d)}} className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>&nbsp; &nbsp; <del>{d.title}</del></div><button className="btn-close" onClick={() => { this.handleDelete(d) }} aria-label="Close"></button></li>
                                
                            else
                                return <li key={d.title} id="todoItem" className="list-group-item d-flex justify-content-between"><div><input onClick={() => {this.handleComplete(d)}} className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>&nbsp; &nbsp; {d.title}</div><button className="btn-close" onClick={() => { this.handleDelete(d) }} aria-label="Close"></button></li>
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
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Todo;
