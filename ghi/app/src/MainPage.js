import React from 'react'
import './mainpage.css'
import bm from './assets/bm.jpg'
import tools from'./assets/tools.png'
import bcr from'./assets/bcr.png'




function MainPage() {


  return (
    <div>
    {/* Hero section */}
    <section className="ngm-hero">
      <div className="ngm-hero-content">
        <h1 className="ngm-heading">
          NextGen Motors <br />
          It's a new generation.
        </h1>
        <p className="ngm-description">
          The most innovative car management system ever.<br />
          With advanced inventory management, <br />
          Sales tracking, and more.
        </p>
        {/* <button className="ngm-button">Learn More</button> */}
      </div>
      <img className="bcr" src={bcr} />
    </section>

       {/* Service station section */}
       <section className="ngm-sales">
      <div className="ngm-sales-content">
        <h2 className="ngm-subheading2">Service Station</h2>
        <p className="ngm-sales-description">
        Our car management system tracks service history, upcoming maintenance tasks,
         and service appointments effortlessly. Stay informed about each vehicle's
         service status, ensuring you never miss a service appointment again.
        </p>
        <button className="ngm-button2">Learn More</button>
      </div>
      <img className="tools" src={tools} />
    </section>




    {/* Inventory management section */}
    <section className="ngm-inventory">
      <div className="ngm-inventory-content">
        <h2 className="ngm-subheading">Inventory Management</h2>
        <p className="ngm-inventory-description">
        Manage your car inventory in real-time with our system.
        Track every car, view detailed specs, and schedule maintenance
        tasks to stay on top of your fleet.
        </p>
        <button className="ngm-button">Learn More</button>
      </div>
      <img className="bm" src={bm} />
    </section>


{/* Sales management section */}
    <section className="ngm-sales">
      <div className="ngm-sales-content">
        <h2 className="ngm-subheading2">Sales Management</h2>
        <p className="ngm-sales-description">
        Track your sales in real-time with our car management system.
        Monitor sales by model, sales person, and client providing you with powerful insights.
        </p>
        <button className="ngm-button2">Learn More</button>
      </div>
    </section>
  </div>


  )
}

export default MainPage;
