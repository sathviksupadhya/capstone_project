import React from 'react';
import CalendarComponent from '../Components/CalendarComponent';

const Schedule = () => {
  return (
    <div className="bg-white py-24 sm:py-32 flex flex-col items-center">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center"> {/* Center align text */}
        <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
          Schedule
        </h2>
        <p className="mt-6 text-2xl text-gray-600"> {/* Increased font size */}
          View and manage your upcoming events.
        </p>
        <CalendarComponent />
      </div>
    </div>
  );
};

export default Schedule;