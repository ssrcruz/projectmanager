import React, { Component } from 'react';

class TodoItem extends Component {
  render() {
    return (
      <li className="TodoItem">
        <strong>{this.props.todo.title}</strong>: {this.props.todo.completed}
      </li>
    );
  }
}

// validation
TodoItem.propTypes = {
  TodoItem: React.PropTypes.object,
}

export default TodoItem;
