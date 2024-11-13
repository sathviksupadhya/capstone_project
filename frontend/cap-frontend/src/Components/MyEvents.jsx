import React from 'react';
import { X, Calendar, Edit2 } from 'lucide-react';

function MyEvents({ events, onClose, onEdit }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <Calendar className="h-6 w-6 text-indigo-600" />
            My Events
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {events.map((event) => (
              <div
                key={event.eventId}
                className="flex bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <img
                  src={event.eventImg || 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'}
                  alt={event.eventTitle}
                  className="w-24 h-24 object-cover"
                />
                <div className="flex-1 p-3">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-gray-800">{event.eventTitle}</h3>
                    <button
                      onClick={() => {
                        onEdit(event);
                        onClose();
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500 mt-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(event.eventDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyEvents;