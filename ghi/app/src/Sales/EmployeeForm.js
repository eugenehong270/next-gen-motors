import React from 'react';

class SalesPersonForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            employee_number: "",
        }
    }
    handleSellerNameChange = (event) => {
        const value = event.target.value
        this.setState({name: value})
    }
    handleEmployeeNumberChange = (event) => {
        const value = event.target.value
        this.setState({employee_number: value})
    }
    handleSubmit = async (event) => {
        event.preventDefault()
        const data = {...this.state}
        console.log(data)
        const SalesPeoplenUrl = 'http://localhost:8090/api/sales_people/'
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const response = await fetch(SalesPeoplenUrl, fetchConfig)
    if (response.ok) {

        const cleared = {
            name: "",
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
                    <h1>Enter Sale Person Information</h1>
                    <form onSubmit={this.handleSubmit} id="create-sale-person-form">
                        <div className="form-floating mb-3">
                        <input value={this.state.name} onChange={this.handleSellerNameChange} placeholder="Name"  name="name" type="text" id="name" className="form-control"/>
                        <label htmlFor="name">Employee Name</label>
                        </div>
                        <div className="form-floating mb-3">
                        <input value={this.state.employee_number} onChange={this.handleEmployeeNumberChange} placeholder="Number" name="employee_number" type="digit" id="employee_number" className="form-control"/>
                        <label htmlFor="employee_number">Employee Number</label>
                        </div>
                        <div className="mb-3">
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default SalesPersonForm
