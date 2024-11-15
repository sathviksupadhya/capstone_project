import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EventForm = () => {
  const navigate = useNavigate();
  const[i, setI] = useState(0);
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
    setI(i+1);

    try {
      const token = sessionStorage.getItem('jwtToken');
      const userId = sessionStorage.getItem('userId');
      const headers = { Authorization: token };

      const filename = `eventimg${i}.jpg`; 
      const imageUploadResponse = await axios.post(
        `https://api.github.com/repos/sathviksupadhya/capstone_project/contents/frontend/comm-front/vite-project/src/assets/${filename}`,
        {
          message: 'Upload event image',
          content: btoa(formData.imageUrl)
        },
        {
          headers: {
            'Authorization': `token ghp_yNUy41W5WO7FvcJsZhwYQD`,
            'Content-Type': 'application/json'
          }
        }
      );


      const githubImageUrl = imageUploadResponse.data.content.download_url;

      const response = await axios.post('http://localhost:9997/event/add',
        {
          eventTitle: formData.title,
          eventDescription: formData.description,
          eventDate: localDateTime,
          eventType: "Event",
          eventImg: githubImageUrl,
          userId: userId
        },
        { headers }
      );
      const data = await axios.post('http://localhost:9997/api/alert/add/${eventid}');
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

const FormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  margin-top: 70px; /* Add margin-top equal to navbar height */
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#000000'};
`;

const SubmitButton = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  background: linear-gradient(to right, #2563eb, #4f46e5);
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  
  &:hover {
    opacity: 0.9;
  }
`;


export default EventForm;
