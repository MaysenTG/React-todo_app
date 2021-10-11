import React, { Component } from 'react'

class EditItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visibility: this.props.visibility,
            editItem: this.props.itemToEdit,
            todoList: this.props.allTodos,
            newInputValue: ''
        }
    }

    makeChanges() {
        const itemToEdit = this.state.editItem
        const listWithoutItem = this.state.todoList.filter(item => item !== itemToEdit)

        itemToEdit.title = this.state.newInputValue
        
        listWithoutItem.push(itemToEdit)

        localStorage.setItem("todo-list", JSON.stringify(listWithoutItem))
    }
    
    handleChange(e) {
        this.setState({newInputValue: e.target.value});
    }
    
    
    render() {
        return (
            <div>
                <form onSubmit={() => { this.makeChanges() }}>
                    <div className="form-group">
                        <label htmlFor="editTodoItem">Todo Item</label>
                        <input type="text" className="form-control" id="editTodoItem" defaultValue={this.state.editItem.title} onChange={this.handleChange.bind(this)}/>
                    </div>
                    <br/>
                    <button type="submit" className="btn btn-primary">Save todo item</button>
                </form>
            </div>
        )
    }
}


export default EditItem