import React from 'react';
import { Calendar, Clock, Tag } from 'lucide-react';
import FeedbackForm from './FeedbackForm';

const EventCard = ({ event, feedbacks, onFeedbackSubmit }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            <Tag className="w-4 h-4 mr-1" />
            {event.type}
          </span>
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            {event.date}
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            {event.time}
          </div>
        </div>

        <p className="mt-4 text-gray-600">{event.description}</p>

        <div className="mt-6">
          <h4 className="font-semibold text-gray-900 mb-4">Feedback</h4>
          <FeedbackForm eventId={event.id} onSubmit={onFeedbackSubmit} />
          
          <div className="mt-4 space-y-4">
            {feedbacks
              .filter((feedback) => feedback.eventId === event.id)
              .map((feedback) => (
                <div
                  key={feedback.id}
                  className="bg-gray-50 rounded-lg p-4"
                >
                  <p className="text-gray-700">{feedback.message}</p>
                  <span className="text-sm text-gray-500">
                    {new Date(feedback.id).toLocaleDateString()}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;