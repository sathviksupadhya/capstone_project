import React, { useState, useEffect } from 'react';
import { PlusCircle, Calendar, Edit2, Trash2, User } from 'lucide-react';
import EventForm from '../Components/EventForm';
import MyEvents from '../Components/MyEvents';
import { motion } from 'framer-motion'; // For smooth animations
import { css } from '@emotion/react'; // For custom styling

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showMyEvents, setShowMyEvents] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:8080/event/getAllEvents');
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleDelete = async (eventId) => {
    try {
      await fetch(`http://localhost:8080/event/deleteEvent/${eventId}`, {
        method: 'DELETE',
      });
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleEdit = (event) => {
    setSelectedEvent(event);
    setShowEditForm(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50" style={{ marginTop: '64px' }}>
      {/* Secondary Navigation Bar */}
      <div className="bg-white shadow-md w-full">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-2">
              <Calendar className="h-8 w-8 text-indigo-600" />
              Events Management
            </h1>
            <div className="flex gap-3">
              <button
                onClick={() => setShowMyEvents(true)}
                className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-200 transition-colors"
              >
                <User className="h-5 w-5" />
                My Events
              </button>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition-colors"
              >
                <PlusCircle className="h-5 w-5" />
                Add Event
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.eventId}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={event.eventImg || 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'}
                alt={event.eventTitle}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{event.eventTitle}</h3>
                <p className="text-gray-600 mb-2">{event.eventDescription}</p>
                <div className="flex items-center gap-2 text-gray-500 mb-4">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(event.eventDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                    {event.eventType}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(event)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit2 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(event.eventId)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      {showAddForm && (
        <EventForm
          onClose={() => setShowAddForm(false)}
          onSubmit={() => {
            setShowAddForm(false);
            fetchEvents();
          }}
        />
      )}

      {showEditForm && selectedEvent && (
        <EventForm
          event={selectedEvent}
          onClose={() => {
            setShowEditForm(false);
            setSelectedEvent(null);
          }}
          onSubmit={() => {
            setShowEditForm(false);
            setSelectedEvent(null);
            fetchEvents();
          }}
        />
      )}

      {showMyEvents && (
        <MyEvents
          events={events}
          onClose={() => setShowMyEvents(false)}
          onEdit={handleEdit}
        />
      )}
    </div>
  );
}

export default EventsPage;