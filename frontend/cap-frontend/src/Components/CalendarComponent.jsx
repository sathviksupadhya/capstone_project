import React, { useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'; // Default styles
import './CalendarStyle.css'; // Import custom styles for dark mode
import ReminderModal from './ReminderModal'; // Import the ReminderModal

const localizer = momentLocalizer(moment);

const CalendarComponent = () => {
  const [events] = useState([
    {
      start: new Date(),
      end: new Date(new Date().setHours(new Date().getHours() + 1)),
      title: 'Sample Event',
    },
    {
      start: new Date(new Date().setDate(new Date().getDate() + 1)),
      end: new Date(new Date().setDate(new Date().getDate() + 1)).setHours(new Date().getHours() + 1),
      title: 'Another Event',
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleRemindMe = () => {
    setIsModalOpen(true);
  };

  const handleSelectReminder = (method) => {
    alert(`Reminder set via ${method}!`);
  };

  return (
    <div style={{ height: '500px', position: 'relative' }}>
      {/* Positioning the Remind Me button */}
      <button 
        onClick={handleRemindMe} 
        className="absolute top-4 right-4 p-2 bg-navy-600 text-white rounded shadow"
      >
        Remind Me
      </button>
      
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
      
      {/* Render the modal if it is open */}
      {isModalOpen && (
        <ReminderModal 
          onClose={() => setIsModalOpen(false)} 
          onSelect={handleSelectReminder} 
        />
      )}
    </div>
  );
};

export default CalendarComponent;