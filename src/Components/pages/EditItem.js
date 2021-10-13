import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'

// Firebase DB imports
import db from '../../config'
import { collection, setDoc, doc, addDoc } from 'firebase/firestore'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';



class EditItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visibility: this.props.visibility,
            editItem: this.props.itemToEdit,
            todoList: this.props.allTodos,
            newInputValue: '',
            showModal: true
        }
    }

    makeChanges() {
        const newTitle = this.state.newInputValue
        this.setState({ showModal: false })
        
        if(newTitle === '') {
            alert("Please enter a valid item!")
        }
        else {
            const itemToEdit = this.state.editItem
            const listWithoutItem = this.state.todoList.filter(item => item !== itemToEdit)
            
            itemToEdit.title = newTitle
            listWithoutItem.push(itemToEdit)
            this.setState({ todoList: listWithoutItem })
            
            const docRef = doc(db, "todolist", this.state.editItem);
            
            setDoc(docRef, itemToEdit)
            
            window.location.reload(false)
        }
        
        
    }
    
    handleChange(e) {
        this.setState({newInputValue: e.target.value});
    }
    
    componentDidMount() {
        console.log(this.state.editItem)
    }
    
    
    render() {
        return (
            <Modal aria-labelledby="contained-modal-title-vcenter" centered show={this.state.showModal} onHide={() => {this.setState({ showModal: false })}}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit To Do Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="text" className="form-control" id="editTodoItem" onChange={this.handleChange.bind(this)}/>
                </Modal.Body>
                <Modal.Footer>
                    <button type="submit" className="btn btn-primary" onClick={() => { this.makeChanges() }}>Save changes</button>
                </Modal.Footer>
            </Modal>
        )
    }
}


export default EditItem