import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';

const FeedbackForm = ({ eventId, onSubmit }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ eventId, message, id: Date.now() });
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="flex items-start space-x-4">
        <div className="min-w-0 flex-1">
          <div className="relative">
            <div className="border border-gray-300 rounded-lg shadow-sm overflow-hidden focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
              <label htmlFor="feedback" className="sr-only">
                Add your feedback
              </label>
              <textarea
                rows={3}
                name="feedback"
                id="feedback"
                className="block w-full py-3 px-4 resize-none border-0 focus:ring-0 sm:text-sm"
                placeholder="Add your feedback..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
          </div>
        </div>
        <div className="flex-shrink-0">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Send
          </button>
        </div>
      </div>
    </form>
  );
};

export default FeedbackForm;