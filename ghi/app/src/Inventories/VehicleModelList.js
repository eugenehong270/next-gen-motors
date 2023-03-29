import '../App.css'
import React, { Component } from 'react'

class VehicleModelList extends React.Component {
    constructor() {
        super()
        this.state = {
            "models": []
        }
    }
    async componentDidMount() {
        const url = 'http://localhost:8100/api/models/'
        let response = await fetch(url)
        if (response.ok) {
            let data = await response.json()
            this.setState({"models": data.models})
        }
    }
    render () {
        return (
            <div>
            <table className="table table-striped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Manufacturer</th>
                    <th>Picture</th>
                </tr>
            </thead>
            <tbody>
                {this.state.models.map(model => {
                return (
                    <tr key={model.id}>
                        <td>{ model.name }</td>
                        <td>{ model.manufacturer.name }</td>
                        <td><img src ={ model.picture_url } style={{width:200, height:200, objectFit: 'contain'}} /></td>
                    </tr>
                );
                })}
            </tbody>
            </table>
            </div>
        );
        }
    }

export default VehicleModelList
