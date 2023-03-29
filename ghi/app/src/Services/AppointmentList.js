import React, { Component } from 'react'

class AppointmentList extends React.Component{
    constructor() {
        super()
        this.state = {
            "appointments": []
        }
    }
    async componentDidMount() {
        this.showAppointments()

    }
    async showAppointments() {
        const url = 'http://localhost:8080/api/appointments'
        let response = await fetch(url)
        if (response.ok) {
            let data = await response.json()
            let filteredData = await data.appointments.filter(appointment => appointment.finished != true)
            this.setState({"appointments": filteredData})
        }
    }
    handleDeleteClick = async (event) => {
        console.log('remove')
        const id = event.target.value
        const url = `http://localhost:8080/api/appointments/${id}/`
        const fetchConfig = {
            method: "DELETE",
            headers: {
                'Content-Type': 'application.json'
            }
        }
        const response = await fetch(url, fetchConfig)
        if (response.ok) {
            this.setState({appointments: this.state.appointments.filter(appointment => appointment.id != id)})
            alert("Appointment Deleted")
        }
    }
    handleFinishClick = async (event) => {
        const id = event.target.value
        const url = `http://localhost:8080/api/appointments/${id}/`
        const fetchConfig = {
            method: "PUT",
            body: JSON.stringify({
                "finished": true
            }),
            headers: {
                'Content-Type': 'application.json'
            }
        }
        const response = await fetch(url, fetchConfig)
        if (response.ok) {
            this.showAppointments()
            alert("Appointment Finished")
        }
    }
    render () {
        return (
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
                            <th>Status</th>
                            <th></th>
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
                                <td><button onClick={ this.handleDeleteClick} value = {appointment.id} className="btn btn-outline-danger btn-sm">Cancel</button></td>
                                <td><button onClick={ this.handleFinishClick} value = {appointment.id} className="btn btn-outline-danger btn-sm">Finish</button></td>
                            </tr>
                        );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default AppointmentList;
