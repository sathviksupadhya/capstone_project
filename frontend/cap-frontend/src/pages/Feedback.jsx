// src/pages/Feedback.jsx
import React, { useState, useEffect } from 'react';
import FeedbackForm from '../Components/FeedbackForm';

const Feedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const fetchFeedbacks = async () => {
        try {
            const response = await fetch('http://localhost:8080/feedback/getAllFeedbacks');
            const data = await response.json();
            setFeedbacks(data);
        } catch (error) {
            console.error('Error fetching feedbacks:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50" style={{ marginTop: '64px' }}>
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Feedback Page</h2>
                <p className="text-gray-600 mb-8">Your feedback is important to us!</p>
                <FeedbackForm onSubmitSuccess={fetchFeedbacks} />

                <div className="mt-12">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-6">Your Previous Feedbacks</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Type</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feedback</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {feedbacks.map((feedback) => (
                                    <tr key={feedback.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{feedback.eventTitle}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{feedback.eventType}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">{feedback.message}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {new Date(feedback.createdAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                                {feedbacks.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                                            No feedbacks found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Feedback;