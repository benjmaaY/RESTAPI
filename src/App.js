import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { Button, Modal } from 'react-materialize'

class App extends Component {

  constructor() {
    super()
    this.state = {
      title: '',
      description: '',
      tasks: [],
      _id: ''
    };
    this.handleChange = this.handleChange.bind(this)
  }
  

  onSubmit(e) {

    // axios.post('http://localhost:5000/api/tasks').then(res => {
    //   console.log(res)
    // })
    if (this.state._id) {
      fetch('http://localhost:5000/api/tasks/' + this.state._id, {
        method: 'PUT',
        body: JSON.stringify(this.state),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => {
        console.log(data)

        window.Materialize.toast('List updated', 2000);

        this.setState({ title: '', description: '', _id: '' })

        this.fetchTasks();
      })
    } else {
      fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);

          window.Materialize.toast('Contact added', 2000);

          this.setState({ title: '', description: '' })

          this.fetchTasks();
        })
        .catch(err => console.log(err))
    }
    e.preventDefault()
    console.log(this.state)
  }


  componentDidMount() {
    this.fetchTasks();
  }
  fetchTasks() {
    fetch('http://localhost:5000/api/tasks')
      .then(res => res.json())
      .then(data => {
        this.setState({tasks: data})
        console.log(this.state.tasks)
      })
  }

  deleteTask(id) {
      fetch('http://localhost:5000/api/tasks/' + id, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data)

          window.Materialize.toast('Contact removed', 2000);

          this.setState({ title: '', description: '' })

          this.fetchTasks();
        })  
  }

  editTask(id) {
    fetch('http://localhost:5000/api/tasks/' + id)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState({
          title: data.title,
          description: data.description,
          _id: data._id
        })
      })
  }

  handleChange(e) {
   const { name, value } = e.target;
   this.setState({
     [name]: value,
   })
  }
  render() {
    return (
      <div className="App">

        
        <nav className="light-blue">
          <div className="nav-wrapper">
            <a className="brand-logo center">Contact App</a>
          </div>
        </nav>
        <div className="row">
        <div className="container-fluid" style={{margin: '10px'}}>
            <div className="col s5">
              <div className="card">
                <div className="card-content">
                  <form onSubmit={this.onSubmit.bind(this)}>
                    <div className="row">
                      <div className="input-field col s12">
                        <input placeholder="Enter Name" name="title" value={this.state.title} onChange={this.handleChange} type="text" className="validate"></input>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <input placeholder="Enter Number" name="description" value={this.state.description} onChange={this.handleChange} type="text" className="validate"></input>
                      </div>
                    </div>
                    <button type="submit" className="btn dark-light darken">
                      Send
                    </button>
                  </form>
            </div>
                </div>
              </div>
            <div className="col s7">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Phone number</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.state.tasks.map(task => {
                      return (
                        <tr key={task._id}>
                          <td>{task.title}</td>
                          <td>{task.description}</td>
                          <td>
                            <button className="btn" onClick={() => this.deleteTask(task._id)}>
                              <i className="material-icons">delete</i>
                            </button>
                            <button className="btn" onClick={() => this.editTask(task._id)} style={{margin: '4px'}}>
                              <i className="material-icons">edit</i>
                            </button>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
