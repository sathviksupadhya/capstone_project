import React, { useState, useEffect } from 'react';
import { PlusCircle, X, ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const Schedule = () => {
  const [events, setEvents] = useState([]);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    datetime: '',
    imageUrl: ''
  });

  const token = sessionStorage.getItem('jwtToken');
  const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:9997/events', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const formattedEvents = response.data.map(event => {
        const eventDate = new Date(event.eventDate);
        return {
          id: event.id,
          title: event.eventTitle,
          start: eventDate,
          end: new Date(eventDate.setHours(eventDate.getHours() + 1)),
          description: event.eventDescription
        };
      });
      setEvents(formattedEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    if (newEvent.title && newEvent.datetime) {
      try {
        const eventDateTime = new Date(newEvent.datetime);
        
        const eventData = {
          eventTitle: newEvent.title,
          eventDate: eventDateTime.toISOString(),
          eventDescription: newEvent.description,
          eventImg: newEvent.imageUrl,
          userId: userId
        };

        const response = await axios.post('http://localhost:9997/events/create', eventData, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        fetchEvents();
        setNewEvent({ title: '', description: '', datetime: '', imageUrl: '' });
        setShowAddEvent(false);
      } catch (error) {
        console.error('Error adding event:', error);
      }
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await axios.delete(`http://localhost:9997/events/${eventId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setEvents(events.filter(event => event.id !== eventId));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <div className="flex flex-col items-center mt-16 w-full min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-2xl p-8 backdrop-blur-sm bg-opacity-90">
        <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-black drop-shadow-sm underline">Schedule</h2>

          <button 
            onClick={() => setShowAddEvent(true)}
            className="flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-200"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Add Event
          </button>
        </div>

        <div className="h-[75vh] rounded-xl overflow-hidden shadow-inner bg-white">
          <BigCalendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: '100%' }}
            className="p-4"
          />
        </div>

        {/* Add Event Modal */}
        {showAddEvent && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black bg-opacity-50">
            <div className="bg-white rounded-2xl shadow-lg w-full max-w-[500px] max-h-[90vh] mx-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold text-gray-800">Create Event</h3>
                  <button 
                    onClick={() => setShowAddEvent(false)}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>
              
              <div className="p-6 overflow-y-auto" style={{maxHeight: 'calc(90vh - 140px)'}}>
                <form onSubmit={handleAddEvent} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                    <textarea
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                      rows="3"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Date & Time</label>
                    <input
                      type="datetime-local"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      value={newEvent.datetime}
                      onChange={(e) => setNewEvent({...newEvent, datetime: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
                    <input
                      type="url"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      value={newEvent.imageUrl}
                      onChange={(e) => setNewEvent({...newEvent, imageUrl: e.target.value})}
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-6 border-t border-gray-200">
                    <button 
                      type="submit"
                      className="w-full sm:w-1/2 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-200"
                    >
                      Create Event
                    </button>
                    <button 
                      type="button" 
                      className="w-full sm:w-1/2 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200"
                      onClick={() => setShowAddEvent(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Schedule;