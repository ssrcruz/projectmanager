import React, { Component } from 'react';
import uuid from 'uuid'
import $ from 'jquery';
import Projects from './Components/Projects';
import AddProject from './Components/AddProject';
import Todos from './Components/Todos';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  getTodos(){
    $.ajax({
      url: 'https://jsonplaceholder.typicode.com/todos',
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({todos: data}, function(){
          console.log(this.state);
        });
      }.bind(this),
      error: function(xhr, status, err){
        console.log(err);
      }
    });
  }

  getProjects(){
    this.setState({projects: [
        {
          id: uuid.v4(), // will generate a unique id everytime uuid.v4(); is called
          title: "Business Website",
          category: "Web Design"
        },
        {
          id: uuid.v4(),
          title: "Social App",
          category: "Mobile Development"
        },
        {
          id: uuid.v4(),
          title: "Ecommerce Shopping Cart",
          category: "Web Development"
        }
    ]});
  }

  componentWillMount(){
    this.getProjects();
    this.getTodos();
  }

  componentDidMount(){
    this.getTodos();
  }
  // will take in the new project and add it to the state in App.
  // it will take a copy of the projects array and add in the new project,
  // then update the existing projects array with the new one.
  handleAddProject(project){
    let projects = this.state.projects;
    projects.push(project);
    this.setState({projects: projects});
  }

  // will delete project from the state.
  // it will take a copy of the state and find the project it wants to delete based on the id,
  // it will then delete the project from the state using .splice
  // then update the existing state with the new one
  handleDeleteProject(id){
    let projects = this.state.projects;
    let index = projects.findIndex(x => x.id === id);
    projects.splice(index, 1);
    this.setState({projects: projects});
  }

  render() {
    return (
      <div className="App">
        <AddProject addProject={this.handleAddProject.bind(this)} />
        <Projects projects={this.state.projects} onDelete={this.handleDeleteProject.bind(this)} />
        <hr />
        <Todos todos={this.state.todos}/>
      </div>
    );
  }
}

export default App;
