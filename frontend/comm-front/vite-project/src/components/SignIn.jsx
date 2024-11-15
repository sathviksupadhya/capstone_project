import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const SignInForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("username:", username);

    try {
      // Add loading state or spinner here if needed

      const response = await axios.post(
        "http://localhost:9997/auth/validate/user",
        {
          userName: username,
          password: password,
        },
      );

      // Check if response contains required data
      if (!response.data || !response.data.token || !response.data.userId) {
        throw new Error('Invalid response from server');
      }
      const { token, userId } = response.data;
      sessionStorage.setItem("jwtToken", token);
      sessionStorage.setItem("userId", userId);  


      // const user = await axios.get(`http://localhost:9997/api/residents/${userId}`,
      //   {
      //     headers: {
      //       Authorization: token
      //     }
      //   }
      // );
      // const userStatus = user.data.status;
      // console.log(userStatus);
      // if(userStatus === "APPROVE"){ 
      if(username.toLowerCase() === "admin"){
        navigate("/admin");
      }else{
        navigate("/home");
      }
      // }else{
      //   setError("Your account is not approved yet. Please wait for approval.");
      // }

    } catch (err) {
      console.error('Login error:', err);
      if (err.code === 'ECONNABORTED') {
        setError("Request timed out. Please try again.");
      } else {
        setError("Invalid credentials or server error. Please try again.");
      }
    }
  };

  return (
    <Container>
      <FormCard>
        <Title>Sign In</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit">Sign In</Button>
        </Form>
        <RegisterText>
          First time user? <Link to="/register">Register here</Link>
        </RegisterText>
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

const RegisterText = styled.p`
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

export default SignInForm;
