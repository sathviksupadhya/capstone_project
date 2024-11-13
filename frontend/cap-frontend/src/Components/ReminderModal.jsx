import React from 'react';

const ReminderModal = ({ onClose, onSelect }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto">
        <h2 className="text-xl font-semibold mb-4">Choose how you want to be reminded</h2>
        <div className="flex flex-col space-y-2">
          <button 
            onClick={() => { onSelect('call'); onClose(); }} 
            className="p-2 bg-blue-500 text-white rounded"
          >
            Call
          </button>
          <button 
            onClick={() => { onSelect('email'); onClose(); }} 
            className="p-2 bg-green-500 text-white rounded"
          >
            Email
          </button>
          <button 
            onClick={() => { onSelect('sms'); onClose(); }} 
            className="p-2 bg-yellow-500 text-white rounded"
          >
            SMS
          </button>
        </div>
        <button 
          onClick={onClose} 
          className="mt-4 p-2 bg-red-500 text-white rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ReminderModal;