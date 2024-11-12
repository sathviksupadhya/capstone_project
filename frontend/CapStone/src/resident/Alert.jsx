import React from 'react';
import '../CSS/Card.css';

const Alert = ({ onClose }) => {
  return (
    <div className="card-overlay">
      <div className="card-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h3>Login Here</h3>
        <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est maiores qui ut dolor 
            deserunt praesentium eveniet sequi eos quam libero voluptatum magni, quos facere error 
            ratione mollitia perferendis ea. Nemo!</h4>
        {/* Other card content like form fields */}
      </div>
    </div>
  );
};

export default Alert;
