import React, { Component } from 'react'

class Navbar extends Component {
    render() {
        return (
            <div className="container">
                <nav className="navbar navbar-light">
                    <div className="container-fluid">
                        <a href="/todo" className="navbar-brand">To Do List App</a>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search for an item" aria-label="Search"/>
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Navbar;