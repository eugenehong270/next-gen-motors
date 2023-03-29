import React from 'react';
class ManufacturerForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
        }
    }
    handleNameChange = (event) => {
        const value = event.target.value
        const name = event.target.name
        this.setState({[name]: value})
    }
    handleSubmit = async (event) => {
        event.preventDefault()
        const data = {...this.state}
        console.log(data)
        const ManufacturersUrl = 'http://localhost:8100/api/manufacturers/'
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const response = await fetch(ManufacturersUrl, fetchConfig)
    if (response.ok) {
        const newTechnician = await response.json()
        console.log(newTechnician)

        const cleared = {
            name: "",
        }
        this.setState(cleared)
    }
    }
    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Enter Manufacturer Information</h1>
                        <form onSubmit={this.handleSubmit} id="create-manufacturer-form">
                        <div className="form-floating mb-3">
                            <input value={this.state.name} onChange={this.handleNameChange} placeholder="Name"  name="name" type="text" id="name" className="form-control"/>
                            <label htmlFor="name">Name</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default ManufacturerForm