import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaUser, FaPhone, FaEnvelope, FaCamera } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const FormContainer = styled(motion.div)`
  max-width: 500px;
  width: 90%;
  margin: 2rem auto;
  padding: 2.5rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  max-height: 80vh;
  overflow-y: auto;
  position: relative;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
    
    &:hover {
      background: #666;
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;
  
  &:hover {
    color: #000;
  }
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 30px;
  color: #333;
  font-size: 28px;
  font-weight: 600;
  position: relative;
  padding-bottom: 10px;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: #000000;
    border-radius: 2px;
  }
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
  font-weight: 600;
  font-size: 1rem;
  color: #333;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    color: #000000;
  }
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #000000;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  }
`;

const ProfilePhotoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const PhotoPreview = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #000000;
  position: relative;
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

const SubmitButton = styled(motion.button)`
  padding: 14px;
  background: #000000;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  
  &:hover {
    background: #333333;
    transform: translateY(-1px);
  }
`;

const UserDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user;
  const [formData, setFormData] = useState({
    fullName: user?.userName || '',
    email: user?.email || '',
    phone: user?.phoneNumber || '',
    profilePhoto: user?.image || null
  });

  const [photoPreview, setPhotoPreview] = useState(null);
  const [githubImageUrl, setGithubImageUrl] = useState(null);
  const userId = sessionStorage.getItem('userId');
  const token = sessionStorage.getItem('jwtToken');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      const reader = new FileReader();
      
      reader.onloadend = () => {
        const result = reader.result;
        setPhotoPreview(result);
        setFormData(prevState => ({
          ...prevState,
          profilePhoto: reader.result
        }));
        console.log(formData.profilePhoto);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const response = await axios.put(`http://localhost:9997/api/residents/update/${userId}`, {
        email: formData.email,
        phoneNumber: formData.phone,
        image: formData.profilePhoto
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      toast.success('Successfully updated profile!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
      navigate('/home/profile');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleClose = () => {
    navigate('/home/profile');
  };

  return (
    <Container>
      <FormContainer
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <CloseButton onClick={handleClose}>&times;</CloseButton>
        <Title>Update Your Profile</Title>
        <StyledForm onSubmit={handleSubmit}>
          <ProfilePhotoContainer>
            <PhotoPreview>
              <img src={photoPreview || '/default-avatar.png'} alt="Profile Preview" />
            </PhotoPreview>
            <PhotoUploadButton htmlFor="photo-upload">
              <FaCamera /> Change Photo
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                style={{ display: 'none' }}
              />
            </PhotoUploadButton>
          </ProfilePhotoContainer>

          <FormGroup>
            <Label>
              <FaUser /> Full Name
            </Label>
            <Input
              type="text"
              name="fullName"
              value={formData.fullName}
              required
              disabled
            />
          </FormGroup>

          <FormGroup>
            <Label>
              <FaEnvelope /> Email Address
            </Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>
              <FaPhone /> Phone Number
            </Label>
            <Input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />
          </FormGroup>

          <SubmitButton
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Update Profile
          </SubmitButton>
        </StyledForm>
      </FormContainer>
    </Container>
  );
};

export default UserDetails;
