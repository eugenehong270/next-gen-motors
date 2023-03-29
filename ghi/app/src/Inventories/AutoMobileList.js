import '../App.css'
import React, { Component } from 'react'

class AutomobileList extends React.Component{
  constructor() {
    super()
    this.state = {
        autos: []
    }
  }
  async componentDidMount() {
    const url = 'http://localhost:8100/api/automobiles/'
    let response = await fetch(url)
    if (response.ok) {
        let data = await response.json()
        this.setState({autos: data.autos})
    }
  }
  render () {
    return (
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>VIN</th>
              <th>Color</th>
              <th>Year</th>
              <th>Model</th>
              <th>Manufacturer</th>
            </tr>
          </thead>
          <tbody>
            {this.state.autos.map(auto => {
              return (
              <tr key={auto.id}>
                <td>{ auto.vin }</td>
                <td>{ auto.color }</td>
                <td>{ auto.year }</td>
                <td>{ auto.model.name }</td>
                <td>{ auto.model.manufacturer.name }</td>
                {/* in dot.notation is basically getting the property from an instance */}
              </tr>
              )
              })}
          </tbody>
        </table>
      </div>
    );
}
}

export default AutomobileList
