import React from 'react';
class SaleRecordForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            price: "",
            automobile: "",
            salesperson: "",
            customer: "",
            autos: [],
            people: [],
            sales: [],
        }
    }
    handleChange = (event) => {
        const value = event.target.value
        const name = event.target.name
        this.setState({[name]: value})
    }

    async refresh() {
        const urlA = 'http://localhost:8100/api/automobiles/'
        const urlB = 'http://localhost:8090/api/sales_people/'
        const urlC = 'http://localhost:8090/api/customers/'
        const responseA = await fetch(urlA)
        const responseB = await fetch(urlB)
        const responseC = await fetch(urlC)

        if (responseA.ok && responseB.ok && responseC.ok) {

            let dataA = await responseA.json()
            // added filter to show where sold = false
            let filteredData = await dataA.autos.filter(automobile => automobile.sold === false)
            const dataB = await responseB.json()
            const dataC = await responseC.json()


            this.setState({
                    autos: filteredData,
                    people: dataB.people,
                    sales: dataC.sales

                })
        }
    }

    handlePriceChange = (event) => {
        const value = event.target.value
        this.setState({price: Number(value)})
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        const data = {...this.state}
        delete data.autos
        delete data.people
        delete data.sales

        console.log(data)
        // sending a put update to make sold == true
        const vin = data.automobile
        const VehicleUrl = `http://localhost:8100/api/automobiles/${vin}/`
        const fetchConfig = {
            method: "PUT",
            body: JSON.stringify({
                "sold": true
            }),
            headers: {
                'Content-Type': 'application.json'
            }
        }

        const SaleRecordUrl = 'http://localhost:8090/api/sales_records/'
        const fetchConfig2 = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        }


        const response = await fetch(VehicleUrl, fetchConfig)
        const response2 = await fetch(SaleRecordUrl, fetchConfig2)
    if (response.ok && response2.ok) {
        this.setState({
            automobile: "",
            salesperson: "",
            customer: "",
            price: "",
        })
    }

    this.refresh()
    }


    async componentDidMount() {
        this.refresh()
    }
    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                    <h1>Record a new sale</h1>
                    <form onSubmit={this.handleSubmit} id="create-sales-record-form">
                        {/* add a filter here */}
                        <div className="mb-3">
                            <select onChange={this.handleChange} value={this.state.automobile} required name="automobile" className="form-select">
                            <option value="">Choose an Automobile</option>
                            {this.state.autos.map(automobile => {
                            return (
                                <option key={automobile.id} value={automobile.vin}>
                                {automobile.vin}
                                </option>
                            )
                            })}
                            </select>
                        </div>
                        <div className="mb-3">
                            <select value={this.state.salesperson} onChange={this.handleChange} required name="salesperson" className="form-select">
                            <option>Choose an Employee</option>

                            {this.state.people.map(salesperson => {
                            return (
                                <option key={salesperson.id} value={salesperson.employee_number}>
                                {salesperson.name}
                                </option>
                            )
                            })}
                            </select>
                        </div>
                        <div className="mb-3">
                            <select value={this.state.customer} onChange={this.handleChange} required  name="customer" className="form-select">
                            <option value="">Choose a Customer</option>
                            {this.state.sales.map(customer => {
                            return (
                                <option key={customer.id} value={customer.phone_number}>
                                {customer.name}
                                </option>
                            )
                            })}
                            </select>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={this.state.price} onChange={this.handlePriceChange} placeholder="price" name="price" type="text"  className="form-control" />
                            <label htmlFor="price">Price</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default SaleRecordForm
