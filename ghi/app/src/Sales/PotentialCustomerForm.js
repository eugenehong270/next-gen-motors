import React from 'react';

class PotentialCustomerForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            address:"",
            phone_number: "",
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleCustomerNameChange = (event) => {
        const value = event.target.value
        this.setState({name: value})
    }
    handleAddressChange = (event) => {
        const value = event.target.value
        this.setState({address: value})
    }
    handlePhoneNumberChange = (event) => {
        const value = event.target.value
        this.setState({phone_number: value})
    }
    handleSubmit = async (event) => {
        event.preventDefault()
        const data = {...this.state}
        console.log(data)
        const SalesPeoplenUrl = 'http://localhost:8090/api/customers/'
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const response = await fetch(SalesPeoplenUrl, fetchConfig)
    if (response.ok) {
        const moana = await response.json()
        console.log(moana)
        const cleared = {
            name: "",
            address: "",
            phone_number: "",
        }
        this.setState(cleared)
    }
    }
    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                    <h1>Enter Potential Customer Information</h1>
                    <form onSubmit={this.handleSubmit} id="create-sale-person-form">
                        <div className="form-floating mb-3">
                            <input value={this.state.name} onChange={this.handleCustomerNameChange} placeholder="Name"  name="name" type="text" id="name" className="form-control"/>
                            <label htmlFor="name">Customer Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={this.state.address} onChange={this.handleAddressChange} placeholder="Address" name="address" type="text" id="address" className="form-control"/>
                            <label htmlFor="address">Address</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={this.state.phone_number} onChange={this.handlePhoneNumberChange} placeholder="Phone Number" name="phone_number" type="digit" id="phone_number" className="form-control"/>
                            <label htmlFor="phone_number">Phone Number</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                    </div>
                </div>
            </div>
            )
    }
}

export default PotentialCustomerForm