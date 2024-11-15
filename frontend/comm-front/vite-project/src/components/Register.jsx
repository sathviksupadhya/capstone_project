import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUsernameError('');
    
    try {
      const response = await axios.post("http://localhost:9997/auth/register", {
        userName: username,
        password: password,
        role: "Resident",
      });

      toast.success('Registration successful! Redirecting to sign in...', {
        position: "top-right",
        autoClose: 3000
      });

      setTimeout(() => {
        navigate('/signin');
      }, 3000);
      
    } catch (err) {
      console.error("Error during registration:", err);

      if (err.response) {
        switch (err.response.status) {
          case 400:
            toast.error('Invalid registration details. Please check your input.', {
              position: "top-right"
            });
            break;
          case 500:
            toast.error('Name is already taken. Please try another name.', {
              position: "top-right"
            });
        }
      }
    }
  };

  return (
    <Container>
      <FormCard>
        <Title>Register</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setUsernameError('');
            }}
            required
          />
          {usernameError && <ErrorText>{usernameError}</ErrorText>}
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit">Register</Button>
        </Form>
        <SignInText>
          Already registered? <Link to="/signin">Sign in here</Link>
        </SignInText>
      </FormCard>
      <ToastContainer />
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f5f5;
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

const SignInText = styled.p`
  text-align: center;
  margin-top: 20px;
  color: #666;
  
  a {
    color: #000000;
    text-decoration: none;
    font-weight: bold;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ErrorText = styled.p`
  color: #ff0000;
  font-size: 14px;
  margin: -15px 0 0 0;
  padding: 0;
`;

export default RegisterForm;
