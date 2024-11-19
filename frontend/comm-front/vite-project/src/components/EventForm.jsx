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
    <PageContainer>
      {/* <NavBar>
        <NavTitle>Event Management</NavTitle>
      </NavBar> */}
      <ContentContainer>
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
      </ContentContainer>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  min-height: 100vh;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
`;

const NavBar = styled.nav`
  background: #000000;
  color: white;
  padding: 1rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
`;

const NavTitle = styled.h1`
  margin: 0;
  font-size: 1.5rem;
`;

const ContentContainer = styled.div`
  margin-top: 80px;
  padding: 20px;
  display: flex;
  justify-content: center;
  overflow-y: auto;
`;

const FormCard = styled.div`
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 350px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #000000;
  }
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  min-height: 100px;
  
  &:focus {
    outline: none;
    border-color: #000000;
  }
`;

const ImageUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
`;

const ImagePreviewContainer = styled.div`
  width: 180px;
  height: 130px;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid #000000;
  
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
  padding: 10px 15px;
  background: #000000;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
  
  &:hover {
    background: #333333;
  }

  svg {
    font-size: 1rem;
  }
`;

const Button = styled.button`
  padding: 10px;
  background: #000000;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s ease;
  
  &:hover {
    background: #333333;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: #333;
`;

export default EventForm;