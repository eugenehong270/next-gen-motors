import '../App.css'
import React, { Component } from 'react'

class ServiceHistory extends React.Component{
    constructor() {
        super()
        this.state = {
            vin: "",
            appointments: []
        }
    }
    handleVinChange = (event) => {
        const value = event.target.value
        this.setState({vin: value})
    }

    handleSubmitClick = async (event) => {
        event.preventDefault()
        const data = {...this.state}
        const submitUrl = `http://localhost:8080/api/history/${data.vin}/`
        const fetchConfig = {
            method: "GET",
            headers: {
                'Content-Type': 'application.json'
            }
        }
        const response = await fetch(submitUrl, fetchConfig)
        console.log(response)
        if (response.ok) {
            const bruh = await response.json()
            console.log("bruh", bruh)
            this.setState({appointments: bruh})

        }
    }


render () {
    return (
        <div>
        <div className="input-group">
            <form onSubmit = { this.handleSubmitClick } id = "searchbar" className = "search-bar" >
                <input value = { this.state.vin } onChange = { this.handleVinChange } placeholder="Search VIN" name="VIN" required type="search" id="VIN" />
                <button className="btn btn-outline-primary">Search</button>
            </form>
        </div>
        <div>
        <table className="table table-striped">
        <thead>
            <tr>
                <th>VIP Status</th>
                <th>VIN</th>
                <th>Customer Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Technician</th>
                <th>Reason</th>
            </tr>
        </thead>
        <tbody>
            {this.state.appointments.map(appointment => {
            return (
                <tr key={appointment.id}>
                    <td>{ String(appointment.VIP) }</td>
                    <td>{ appointment.add_vin }</td>
                    <td>{ appointment.customer_name }</td>
                    <td>{ appointment.date }</td>
                    <td>{ appointment.time }</td>
                    <td>{ appointment.technician.technician_name }</td>
                    <td>{ appointment.reason }</td>
                </tr>
            );
            })}
        </tbody>
        </table>
        </div>
        </div>
    );
    }
}

export default ServiceHistory;
