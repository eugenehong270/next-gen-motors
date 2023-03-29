import React from 'react';

class SaleList extends React.Component {
    constructor() {
        super()
        this.state = {
            sales: []
        }
    }
    // react will check for the function componentDidMount
    // cant have a await without async
    async componentDidMount() {
        let response = await fetch('http://localhost:8090/api/sales_records/')
        if (response.ok) {
            let data = await response.json()
            this.setState({"sales":data.sales})
        }
    }
    render () {
        return (
            <div>
            <h1>All Sales</h1>
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
                {this.state.sales.map(sale => {
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
        );
    }
}

export default SaleList