import { useNavigate } from "react-router-dom";
import { FocusCards } from "../ui/FocusCards";
import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const EventsContainer = styled.div`
  margin-top: 140px;

  display: flex;

  flex-direction: column;

  gap: 40px;

  padding: 0 20px;
`;

const AddEventButton = styled.button`
  padding: 12px 24px;

  background: #000000;

  color: white;

  border: none;

  border-radius: 5px;

  font-size: 16px;

  cursor: pointer;

  transition: background 0.3s ease;

  align-self: flex-end;

  &:hover {
    background: #333333;
  }
`;

export default function Events() {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("userId");
  const token = sessionStorage.getItem("jwtToken");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        console.log(userId);
        const response = await axios.get(
          `http://localhost:9997/event/getAllEvents`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.data;
        setCards([...data].reverse());
      } catch (error) {
        console.log(error);
      }
    };
    fetchEvents();
  }, []);

  const navigateForm = () => {
    navigate("/create-event");
  };

  return (
    <div style={{ marginTop: "80px" }}>
      <AddEventButton onClick={navigateForm}>Add an Event</AddEventButton>
      <FocusCards cards={cards} />
    </div>
  );
}
