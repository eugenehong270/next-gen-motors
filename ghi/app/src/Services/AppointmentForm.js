import React from "react";

class AppointmentForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            add_vin: "",
            customer_name: "",
            date: "",
            time: "",
            technicians: [],
            reason: "",
            technician: ""
        }
    }
    handleAddVinChange = (event) => {
        const value = event.target.value
        this.setState({add_vin: value})
    }
    handleCustomerNameChange = (event) => {
        const value = event.target.value
        this.setState({customer_name: value})
    }
    handleDateChange = (event) => {
        const value = event.target.value
        this.setState({date: value})
    }
    handleTimeChange = (event) =>{
        const value = event.target.value
        this.setState({time: value})
    }
    handleTechnicianChange = (event) => {
        const value = event.target.value
        this.setState({technician: value})
    }
    handleReasonChange = (event) => {
        const value = event.target.value
        this.setState({reason: value})
    }
    handleSubmit = async (event) => {
        event.preventDefault()
        const data = {...this.state}
        delete data.technicians
        console.log(data)
        const appointmentUrl = 'http://localhost:8080/api/appointments/'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const response = await fetch(appointmentUrl, fetchConfig)
    if (response.ok) {
        const newAppointment = await response.json()
        console.log(newAppointment)
        const cleared = {
            add_vin: "",
            customer_name: "",
            date: "",
            time: "",
            technician: "",
            reason: "",
        }
        this.setState(cleared)
        }
    }

    //lists technicians
    async componentDidMount() {
        const url = 'http://localhost:8080/api/technicians/'
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json()
            this.setState({technicians: data.technicians })
        }
    }
    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                    <h1>Schedule an Appointment</h1>
                    <form onSubmit={this.handleSubmit} id="create-appointment-form">
                        <div className="form-floating mb-3">
                            <input value={this.state.add_vin} onChange={this.handleAddVinChange} placeholder="add_vin" required type="text" name="add_vin" id="add_vin" className="form-control"/>
                            <label htmlFor="add_vin">VIN</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={this.state.customer_name} onChange={this.handleCustomerNameChange} placeholder="customer_name" name="customer_name" type="text" id="customer_name" className="form-control"/>
                            <label htmlFor="customer_name">Customer Name</label>
                        </div>
                            <div className="form-floating mb-3">
                            <input value={this.state.date} onChange={this.handleDateChange} placeholder="date" name="date" type="date" id="date" className="form-control"/>
                            <label htmlFor="date">Date</label>
                        </div>
                        <div className="mb-3">
                            <div className="form-floating mb-3">
                                <input value={this.state.time} onChange={this.handleTimeChange} placeholder="time" name="time" type="time" id="time" className="form-control"/>
                                <label htmlFor="time">Time</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={this.state.reason} onChange={this.handleReasonChange} placeholder="reason" name="color" type="text" id="reason" className="form-control"/>
                                <label htmlFor="reason">Reason</label>
                            </div>
                            <select onChange={this.handleTechnicianChange} value={this.state.technician} required id="technician" name="technician" className="form-select">
                                <option value="">Choose a Technician</option>
                                {this.state.technicians.map(technician => {
                                return (
                                    <option key={technician.id} value={technician.id}>
                                    {technician.technician_name}
                                    </option>
                                )
                                })}
                            </select>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default AppointmentForm
