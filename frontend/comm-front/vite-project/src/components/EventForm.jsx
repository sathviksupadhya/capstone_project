import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaCamera } from 'react-icons/fa';

const EventForm = () => {
  const navigate = useNavigate();
  const[i, setI] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    imageUrl: null
  });
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      const reader = new FileReader();
      
      reader.onloadend = () => {
        const result = reader.result;
        setImagePreview(result);
        setFormData(prevState => ({
          ...prevState,
          imageUrl: result
        }));
      };

      reader.readAsDataURL(file);
    }
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

      const response = await axios.post('http://localhost:9997/event/add',
        {
          eventTitle: formData.title,
          eventDescription: formData.description,
          eventDate: localDateTime,
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
      <FormCard>
        <Title>Create Event</Title>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Event Title</Label>
            <Input
              type="text"
              placeholder="Enter event title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Event Description</Label>
            <TextArea
              placeholder="Enter event description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Event Date & Time</Label>
            <Input
              type="datetime-local"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Event Image</Label>
            <ImageUploadContainer>
              <ImagePreviewContainer>
                <img src={imagePreview || '/default-event.png'} alt="Event Preview" />
              </ImagePreviewContainer>
              <PhotoUploadButton htmlFor="image-upload">
                <FaCamera /> Upload Event Image
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
              </PhotoUploadButton>
            </ImageUploadContainer>
          </FormGroup>

          <Button type="submit">Create Event</Button>
        </Form>
      </FormCard>
  );
};

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

const ImageUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
`;

const ImagePreviewContainer = styled.div`
  width: 200px;
  height: 150px;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid #000000;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const PhotoUploadButton = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 12px 20px;
  background: #000000;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
  
  &:hover {
    background: #333333;
    transform: translateY(-1px);
  }

  svg {
    font-size: 1.1rem;
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
  margin-top: 70px;
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
