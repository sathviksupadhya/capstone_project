import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f5f5;
  padding-top: 70px;
`;

const FormCard = styled.div`
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 30px;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: #000000;
  }
`;

const TextArea = styled.textarea`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  min-height: 120px;
  
  &:focus {
    outline: none;
    border-color: #000000;
  }
`;

const Button = styled.button`
  padding: 12px;
  background: #000000;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease;
  
  &:hover {
    background: #333333;
  }
`;

const EventForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    imageUrl: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const localDateTime = new Date(formData.date).toISOString();
    console.log(localDateTime);

    try {
      const token = sessionStorage.getItem('jwtToken');
      const userId = sessionStorage.getItem('userId');
      const headers = { Authorization: token };
      const response = await axios.post('http://localhost:9997/event/add',
        {
          eventTitle: formData.title,
          eventDescription: formData.description,
          eventDate: localDateTime,
          eventType: "Event",
          eventImg: formData.imageUrl,
          userId: userId
        },
        { headers }
      );
      navigate(-1);
    } catch(error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <Container>
      <FormCard>
        <Title>Create Event</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Event Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <TextArea
            placeholder="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <Input
            type="datetime-local"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />

          <Input
            type="url"
            placeholder="Image URL"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
          />

          <Button type="submit">Create Event</Button>
        </Form>
      </FormCard>
    </Container>
  );
};

export default EventForm;
