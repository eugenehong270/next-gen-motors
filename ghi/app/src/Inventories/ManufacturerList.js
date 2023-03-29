import '../App.css'
import React, { Component } from 'react'

class ManufacturerList extends React.Component{
    constructor() {
        super()
        this.state = {
            "manufacturers": []
        }
    }
  async componentDidMount() {
      const url = "http://localhost:8100/api/manufacturers/"
      let response = await fetch(url)
      if (response.ok) {
          let data = await response.json()
          this.setState({"manufacturers": data.manufacturers})
      }
  }
  render () {
    return (
      <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {this.state.manufacturers.map(manufacturer => {
            return (
            <tr key={manufacturer.id}>
              <td>{ manufacturer.name }</td>
            </tr>
            )
            })}
        </tbody>
      </table>
      </div>
    );
  }
}

export default ManufacturerList
