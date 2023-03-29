import React from "react";

class TechnicianForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            technician_name: "",
            employee_number: "",
        }
    }
    handleTechnicianNameChange = (event) => {
        const value = event.target.value
        this.setState({technician_name: value})
    }
    handleEmployeeNumberChange = (event) => {
        const value = event.target.value
        this.setState({employee_number: value})
    }
    handleSubmit = async (event) => {
        event.preventDefault()
        const data = {...this.state}
        console.log(data)
        const technicianUrl = 'http://localhost:8080/api/technicians/'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        }

        const response = await fetch(technicianUrl, fetchConfig)

    if (response.ok) {
        const newTechnician = await response.json()
        console.log(newTechnician)

        const cleared = {
            technician_name: "",
            employee_number: ""
        }
        this.setState(cleared)
    }
    }

    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Enter Technician Information</h1>
                        <form onSubmit={this.handleSubmit} id="create-technician-form">
                        <div className="form-floating mb-3">
                            <input value={this.state.technician_name} onChange={this.handleTechnicianNameChange} placeholder="Name"  name="technician_name" type="text" id="technician_name" className="form-control"/>
                            <label htmlFor="employee_name">Employee Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={this.state.employee_number} onChange={this.handleEmployeeNumberChange} placeholder="Number" name="employee_number" type="digit" id="employee_number" className="form-control"/>
                            <label htmlFor="employee_number">Employee Number</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}

export default TechnicianForm
