import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
// SERVICES
import TechnicianForm from './Services/TechnicianForm';
import AppointmentForm from './Services/AppointmentForm';
import AppointmentList from './Services/AppointmentList';
import SaleRecordForm from './Sales/SaleForm';
import ServiceHistory from './Services/ServiceHistory';
// SALES
import SaleList from './Sales/SaleList';
import SalePersonHistory from './Sales/SaleHistory';
import SalesPersonForm from './Sales/EmployeeForm';
import PotentialCustomerForm from './Sales/PotentialCustomerForm';
// INVENTORY
import ManufacturerForm from './Inventories/ManufacturerForm';
import ManufacturerList from './Inventories/ManufacturerList';
import VehicleModelList from './Inventories/VehicleModelList';
import AutomobileList from './Inventories/AutoMobileList';
import VehicleModelForm from './Inventories/VehicleModelForm';
import AutomobileForm from './Inventories/AutoMobileForm';
import './index.css'


function App() {
  return (
    <BrowserRouter>
      <Nav />
        <Routes>
          <Route path="/" element={<MainPage />} />

          <Route path="technicians">
            <Route path="new" element={<TechnicianForm />} />
          </Route>

          <Route path="appointments">
            <Route path="new" element={<AppointmentForm />} />
            <Route path="" element={<AppointmentList />} />
          </Route>

          <Route path="history">
            <Route path="" element={<ServiceHistory />} />
          </Route>

          <Route path="sales">
            <Route path="person" element={<SalesPersonForm />} />
            <Route path="history" element={<SalePersonHistory />} />
            <Route path="new" element={<SaleRecordForm />} />
            <Route path="" element={<SaleList />} />
          </Route>

          <Route path="customer">
            <Route path="new" element={<PotentialCustomerForm />} />
          </Route>

          <Route path="manufacturer">
            <Route path="new" element={<ManufacturerForm />} />
            <Route path="" element={<ManufacturerList />} />
          </Route>

          <Route path="models">
            <Route path="" element={<VehicleModelList />} />
            <Route path="new" element={<VehicleModelForm />} />
          </Route>

          <Route path="automobiles">
            <Route path="" element={<AutomobileList />} />
            <Route path="new" element={<AutomobileForm />} />
          </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
