import { useEffect, useState } from "react";
import Carousel from "./Carousel";
import { useNavigate } from "react-router-dom";
import EventForm from "../EventForm";
import Events from "./Events";
import FeedbackForm from "../Feedbackform";

export default function HomePage() {
  const navigate = useNavigate();
  useEffect(() => {
    const userId = sessionStorage.getItem('userId')
    console.log(userId);
    if(!userId || userId === 'undefined'){
      navigate('/signin')
    }
  }, [])

  return (
    <div style={{display: "flex", flexDirection: "column", gap: "2rem"}}>
      <section id="home-section">
        <Carousel />
      </section>
      
      <section id="events-section">
        <Events />
      </section>

      <section id="schedules-section">
        {/* Schedules component will go here */}
      </section>

      <section id="timesheet-section">
        {/* Timesheet component will go here */}
      </section>

      <FeedbackForm />
    </div>
  );
}
