import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EventEditForm() {
 // const baseUrl = "http://localhost:3000/events"; // Adjust this URL based on your backend
  let { id } = useParams(); // Get the event ID from the URL
  let navigate = useNavigate();
  
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    date: "",
    eventType: ""
  });

  const [eventErrorData, setEventErrorData] = useState({
    title: true,
    description: true,
    imageUrl: true,
    date: true,
    eventType: true,
  });

  // Fetch the existing event data when the component mounts
  useEffect(() => {
    fetch(`${baseUrl}/${id}`)
      .then((res) => res.json())
      .then((data) => setEventData(data));
  }, [id]);

  function handleFormChange(event) {
    setEventErrorData({
      ...eventErrorData,
      [event.target.name]: event.target.validity.valid,
    });

    setEventData({ ...eventData, [event.target.name]: event.target.value });
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    
    fetch(`${baseUrl}/${id}`, {
      method: "PUT",
      body: JSON.stringify(eventData),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        navigate("/events"); // Navigate to events list or another page
      });
  }

  return (
    <div className="container m-5">
      <div className="card">
        <form onSubmit={handleFormSubmit}>
          <div className="card-header bg-primary text-light">
            <h3>UPDATE EVENT</h3>
          </div>
          <div className="card-body">
            <div className="form-control-group m-1">
              <label htmlFor="title" className="form-label">Event Title:</label>
              <input
                type="text"
                id="title"
                placeholder="Enter Event Title"
                className="form-control"
                value={eventData.title}
                required
                name="title"
                onChange={handleFormChange}
              />
              <div className="text-danger small">
                {eventErrorData.title ? "" : "Event Title is Required!"}
              </div>
            </div>
            <div className="form-control-group m-1">
              <label htmlFor="description" className="form-label">Description:</label>
              <textarea
                id="description"
                placeholder="Enter Event Description"
                className="form-control"
                value={eventData.description}
                required
                name="description"
                onChange={handleFormChange}
              />
              <div className="text-danger small">
                {eventErrorData.description ? "" : "Description is Required!"}
              </div>
            </div>
            <div className="form-control-group m-1">
              <label htmlFor="imageUrl" className="form-label">Image URL:</label>
              <input
                type="url"
                id="imageUrl"
                placeholder="Enter Image URL"
                className="form-control"
                value={eventData.imageUrl}
                required
                name="imageUrl"
                onChange={handleFormChange}
              />
              <div className="text-danger small">
                {eventErrorData.imageUrl ? "" : "Image URL is Required!"}
              </div>
            </div>
            <div className="form-control-group m-1">
              <label htmlFor="date" className="form-label">Event Date:</label>
              <input
                type="date"
                id="date"
                className="form-control"
                value={eventData.date}
                required
                name="date"
                onChange={handleFormChange}
              />
              <div className="text-danger small">
                {eventErrorData.date ? "" : "Event Date is Required!"}
              </div>
            </div>
            <div className="form-control-group m-1">
              <label htmlFor="eventType" className="form-label">Event Type:</label>
              <input
                type="text"
                id="eventType"
                placeholder="Enter Event Type"
                className="form-control"
                value={eventData.eventType}
                required
                name="eventType"
                onChange={handleFormChange}
              />
              <div className="text-danger small">
                {eventErrorData.eventType ? "" : "Event Type is Required!"}
              </div>
            </div>
          </div>
          <div className="card-footer bg-primary text-light">
            <button type="submit" className="btn btn-light text-primary">UPDATE</button>
            <button type="reset" className="btn btn-light text-primary mx-5">CLEAR</button>
          </div>
        </form>
      </div>
    </div>
  );
}