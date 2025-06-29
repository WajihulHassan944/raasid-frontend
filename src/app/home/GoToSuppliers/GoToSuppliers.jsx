import React from 'react';
import "./GoToSuppliers.css";

const GoToSuppliers = () => {
  return (
    <div className="suppliers-container">
      <div className="supplier-card orange-card">
        <img src="/assets/home/GoToSuppliers/one.png" alt="Juices" className="supplier-image" />
        <div className="supplier-content">
          <h3>Smart Meal for</h3>
          {/* <p className="sale-text">Raasid Ready to Eat Meals</p> */}
          <p className="supplier-link">Busy Lives</p>
        </div>
      </div>

      <div className="supplier-card blue-card">
        <img src="/assets/home/GoToSuppliers/two.png" alt="Spices" className="supplier-image" />
        <div className="supplier-content">
          <h3>Tactical Nutrition</h3>
          {/* <p className="sale-text">Raasid MRE's</p> */}
          <p className="supplier-link">Ready for Action</p>
        </div>
      </div>
    </div>
  );
};

export default GoToSuppliers;
