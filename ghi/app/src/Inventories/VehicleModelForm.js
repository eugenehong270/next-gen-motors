import React from "react";

class VehicleModelForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            picture_url: "",
            manufacturers: [],
            manufacturer: "",
        }
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handlePictureChange = this.handlePictureChange.bind(this)
        this.handleManufacturerChange = this.handleManufacturerChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleNameChange = (event) => {
        const value = event.target.value
        this.setState({name: value})
    }
    handlePictureChange = (event) => {
        const value = event.target.value
        this.setState({picture_url: value})
    }
    handleManufacturerChange = (event) => {
        const value = event.target.value
        this.setState({manufacturer: value})
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        const data = {...this.state}
        console.log(data)
        delete data.manufacturers
        const modelUrl = 'http://localhost:8100/api/models/'
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const response = await fetch(modelUrl, fetchConfig)

        if (response.ok) {
            const newModel = await response.json()
            console.log(newModel)

            const cleared = {
                name: "",
                picture_url: "",
                manufacturer: "",
            }
            this.setState(cleared)
        }

    }

    async componentDidMount() {
        const url = 'http://localhost:8100/api/manufacturers/'
        const response = await fetch(url)

        if (response.ok) {
            const data = await response.json()
            this.setState({manufacturers: data.manufacturers})
        }
    }

    render() {
        return (
    <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                <h1>Create a Vehicle Model</h1>
                <form onSubmit={this.handleSubmit} id="create-model-form">
                    <div className="form-floating mb-3">
                    <input value={this.state.name} onChange={this.handleNameChange} placeholder="name" required type="text" name="name" id="name" className="form-control"/>
                    <label htmlFor="name">Name</label>
                    </div>
                    <div className="form-floating mb-3">
                    <input value={this.state.picture_url} onChange={this.handlePictureChange} placeholder="picture" name="picture" type="text" id="picture" className="form-control"/>
                    <label htmlFor="picture">Picture URL</label>
                    </div>
                    <div className="mb-3">
                    <select value={this.state.manufacturer} onChange={this.handleManufacturerChange} required id="manufacturer" name="manufacturer" className="form-select">
                        <option value="">Choose a manufacturer</option>
                        {this.state.manufacturers.map(manufacturer => {
                        return (
                            <option key={manufacturer.id} value={manufacturer.id}>
                            {manufacturer.name}
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

export default VehicleModelForm
