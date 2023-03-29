import React from 'react';

class SalePersonHistory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sales: [],
            people: [],
            salesperson: '',
            filterSales: []
        }
    }
    handleChange = (event) => {
        const value = event.target.value
        const name = event.target.name
        this.setState(
            {[name]: value}, 
            () => {const filterSalePerson = this.state.sales.filter(sale => sale.salesperson.employee_number === Number(this.state.salesperson));
            // this causes the site/browser to reset/rerender
            this.setState(
                {
                    filterSales: filterSalePerson,
                },
            )}
        )
    }

    async componentDidMount() {

        const urlA = `http://localhost:8090/api/sales_records/`
        const urlB = 'http://localhost:8090/api/sales_people/'
        const response = await fetch(urlA)
        const responseB = await fetch(urlB)

        if (response.ok && responseB.ok) {
            const data = await response.json()
            const dataB = await responseB.json()
            // this causes the site/browser to reset/rerender
            this.setState({
                sales:data.sales,
                people: dataB.people,
                filterSales: data.sales
        })
        }
        }
    render () {
        return (
            <div>
            <h1>Sales Person History</h1>
            <div className="form-floating mb-3">
                <select onChange={this.handleChange} value={this.state.salesperson} required id="people" name="salesperson" className="form-select">
                    <option value="">Sales Person</option>
                    {this.state.people.map(client => {
                        return (
                            <option key={client.id} value={client.employee_number}>
                            {client.name}
                            </option>
                        );
                    })}
                </select>
            </div>
            <table className="table table-striped">
            <thead>
                <tr>
                <th>Sales Person</th>
                <th>Customer</th>
                <th>VIN</th>
                <th>Sale Price</th>
                <th>Sold Status</th>
                </tr>
            </thead>
            <tbody>
                {this.state.filterSales.map(sale => {
                return (
                    <tr key={sale.id}>
                    <td>{ sale.salesperson.name }</td>
                    <td>{ sale.customer.name }</td>
                    <td>{ sale.automobile.vin }</td>
                    <td>{ sale.price }</td>
                    <td>{ sale.automobile.sold.toString() }</td>
                    </tr>
                );
                })}
            </tbody>
            </table>
            </div>
        )
    }
}

export default SalePersonHistory