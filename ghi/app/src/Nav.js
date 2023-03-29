import { NavLink } from 'react-router-dom';
import './index.css'
import logo from './assets/nextgenmotors.png'

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          <img src={logo} style={{ height: "30px" }}/>
        </NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* <li className="nav-item"><NavLink className="nav-link active" aria-current="page" to="/">HOME</NavLink></li> */}

            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">SERVICES</a>
                  <ul className="dropdown-menu">
                      <li><NavLink className="dropdown-item" to="/technicians/new">Technician Form</NavLink></li>
                      <li><NavLink className="dropdown-item" to="/appointments/new">Appointment Form</NavLink></li>
                      <li><NavLink className="dropdown-item" to="/appointments/">Appointment List</NavLink></li>
                      <li><NavLink className="dropdown-item" to="/history/">Service History</NavLink></li>
                  </ul>
            </li>
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">INVENTORY</a>
                  <ul className="dropdown-menu">
                      <li><NavLink className="dropdown-item" to="/manufacturer/new">Manufacturer Form</NavLink></li>
                      <li><NavLink className="dropdown-item" to="/manufacturer/">Manufacturer List</NavLink></li>
                      <li><NavLink className="dropdown-item" to="/models/new">Vehicle Form</NavLink></li>
                      <li><NavLink className="dropdown-item" to="/models/">Vehicle List</NavLink></li>
                      <li><NavLink className="dropdown-item" to="/automobiles/new">AutoMobile Form</NavLink></li>
                      <li><NavLink className="dropdown-item" to="/automobiles/">AutoMobile List</NavLink></li>
                  </ul>
            </li>
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">SALES</a>
                  <ul className="dropdown-menu">
                      <li><NavLink className="dropdown-item" to="/sales/person">Employee Form</NavLink></li>
                      <li><NavLink className="dropdown-item" to="/customer/new">Customer Form</NavLink></li>
                      <li><NavLink className="dropdown-item" to="/sales/new">Sales Form</NavLink></li>
                      <li><NavLink className="dropdown-item" to="/sales/">Sales List</NavLink></li>
                      <li><NavLink className="dropdown-item" to="/sales/history">Sales History</NavLink></li>
                      
                      
                  </ul>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
