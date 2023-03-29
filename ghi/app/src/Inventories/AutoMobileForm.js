import React from "react"

class AutomobileForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            color: "",
            year: "",
            vin: "",
            models: [],
            model: ""
        }
        this.handleColorChange = this.handleColorChange.bind(this)
        this.handleYearChange = this.handleYearChange.bind(this)
        this.handleVinChange = this.handleVinChange.bind(this)
        this.handleModelChange = this.handleModelChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleColorChange = (event) => {
        const value = event.target.value
        this.setState({color: value})
    }
    handleYearChange = (event) => {
        const value = event.target.value
        this.setState({year: value})
    }
    handleVinChange = (event) => {
        const value = event.target.value
        this.setState({vin: value})
    }
    handleModelChange = (event) => {
        const value = event.target.value
        this.setState({model: value})
    }
    handleSubmit = async(event) => {
        event.preventDefault()
        const data = {...this.state}
        delete data.models
        const autoUrl = 'http://localhost:8100/api/automobiles/'
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const response = await fetch(autoUrl, fetchConfig)
        if (response.ok) {
            const newAuto = await response.json()
            console.log(newAuto)

            const cleared = {
                color: "",
                year: "",
                vin: "",
                model: ""
            }
            this.setState(cleared)
        }
    }
    async componentDidMount() {
        const url = 'http://localhost:8100/api/models/'
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json()
            this.setState({models: data.models})
        }
    }
    render() {
        return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create an Automobile</h1>
                    <form onSubmit={this.handleSubmit} id="create-auto-form">
                        <div className="form-floating mb-3">
                            <input value={this.state.color} onChange={this.handleColorChange} placeholder="color" required type="text" name="color" id="color" className="form-control"/>
                            <label htmlFor="color">Color</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={this.state.year} onChange={this.handleYearChange} placeholder="year" name="year" type="text" id="year" className="form-control"/>
                            <label htmlFor="year">Year</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={this.state.vin} onChange={this.handleVinChange} placeholder="vin" name="vin" type="text" id="vin" className="form-control"/>
                            <label htmlFor="vin">VIN</label>
                        </div>
                        <div className="mb-3">
                            <select onChange={this.handleModelChange} value={this.state.model} required id="model" name="model" className="form-select">
                                <option value="">Choose a model</option>
                                {this.state.models.map(model => {
                                return (
                                    <option key={model.id} value={model.id}>
                                    {model.name}
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

export default AutomobileForm
