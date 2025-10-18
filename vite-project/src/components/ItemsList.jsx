import React, { Component } from 'react'

class ItemsList extends Component {
  render() {
    return (
      <div>
        <h2>TO DO List for React Homework:</h2>
        <ul className="list">
          <li>Create new repository</li>
          <li>Create React project using Vite (JS)</li>
          <li>Remove unnecessary code</li>
          <li>Create basic structure</li>
          <li>Edit package.json</li>
          <li>Create class component with list</li>
          <li>Push code and open merge request</li>
        </ul>
      </div>
    )
  }
}

export default ItemsList
