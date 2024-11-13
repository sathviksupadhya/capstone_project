import React from 'react';

const CustomModal = ({ onClose, onSelect }) => {
  return (
    <div className="modal-active" id="modal-container">
      <div className="modal-background">
        <div className="modal">
          <h2 className="text-xl font-semibold mb-4">Choose how you want to be reminded</h2>
          <div className="flex flex-col space-y-2">
            <button 
              onClick={() => { onSelect('call'); onClose(); }} 
              className="p-2 bg-blue-600 text-white rounded"
            >
              Call
            </button>
            <button 
              onClick={() => { onSelect('email'); onClose(); }} 
              className="p-2 bg-green-600 text-white rounded"
            >
              Email
            </button>
            <button 
              onClick={() => { onSelect('sms'); onClose(); }} 
              className="p-2 bg-yellow-600 text-white rounded"
            >
              SMS
            </button>
          </div>
          <button 
            onClick={onClose} 
            className="mt-4 p-2 bg-red-600 text-white rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;