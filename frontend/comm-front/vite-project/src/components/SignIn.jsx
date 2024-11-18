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
      const response = await axios.post(
        "http://localhost:9997/auth/validate/user",
        {
          userName: username,
          password: password,
        }
      );
      if (!response.data || !response.data.token || !response.data.userId) {
        throw new Error('Invalid response from server');
      }

      const { token, userId } = response.data;
      console.log(token);
      sessionStorage.setItem("jwtToken", token);
      sessionStorage.setItem("userId", userId);

      try{
      const user = await axios.get(`http://localhost:9997/api/residents/${userId}`,
        {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
      );
      const userStatus = user.data.status;
      console.log(userStatus);
      if(userStatus === "APPROVED"){ 
        toast.success('Successfully signed in!', {
          position: "top-right",
          autoClose: 500,
          onClose: () => {
            if(username.toLowerCase() === "admin"){
              navigate("/admin");
            }else{
              navigate("/home");
            }
          }
        });
      }
    }catch(error){
      toast.error('You are not approved yet. Please wait for approval.', {
        position: "top-right",
        autoClose: 5000
      });
        }
    } catch (err) {
      console.error('Login error:', err);
      
      if (err.code === 'ECONNABORTED') {
        toast.error('Request timed out. Please try again.', {
          position: "top-right",
          autoClose: 5000
        });
      } else if (err.response) {
        // Handle different HTTP error codes
        switch (err.response.status) {
          case 400:
            toast.error('Invalid username or password format', {
              position: "top-right",
              autoClose: 5000
            });
            break;
          case 500:
            toast.error('Internal server error. Please try again later.', {
              position: "top-right",
              autoClose: 5000
            });
        }
      } else {
        toast.error('Network error. Please check your connection.', {
          position: "top-right",
          autoClose: 5000
        });
      }
      setError(err.message);
    }
  };

  return (
    <Container>
      <FormCard>
        <Title>Welcome Back! to UnitySpace</Title>
        <Form onSubmit={handleSubmit}>
          <FormField>
            <Label htmlFor="username">Username</Label>
            <div className="group relative">
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="peer"
              />
              <span className="pointer-events-none absolute -top-7 left-0 opacity-0 transition-opacity peer-hover:opacity-100 bg-gray-700 text-white p-2 rounded text-sm">
                Enter your registered username
              </span>
            </div>
          </FormField>

          <FormField>
            <Label htmlFor="password">Password</Label>
            <div className="group relative">
              <Input
                id="password"
                type="password"
                placeholder="Enter your password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="peer"
              />
              <span className="pointer-events-none absolute -top-7 left-0 opacity-0 transition-opacity peer-hover:opacity-100 bg-gray-700 text-white p-2 rounded text-sm">
                Enter your secure password
              </span>
            </div>
          </FormField>
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
  font-family: 'Poppins', sans-serif;
`;

const FormCard = styled.div`
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  font-family: 'Poppins', sans-serif;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 30px;
  color: #333;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 28px;
  letter-spacing: 0.5px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #333;
  font-family: 'Roboto', sans-serif;
  letter-spacing: 0.3px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
  font-family: 'Inter', sans-serif;
  
  &:focus {
    outline: none;
    border-color: #000000;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background: #000000;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  letter-spacing: 0.5px;
  
  &:hover {
    background: #333333;
  }
`;

const RegisterText = styled.p`
  text-align: center;
  margin-top: 20px;
  color: #666;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  
  a {
    color: #000000;
    text-decoration: none;
    font-weight: bold;
    font-family: 'Inter', sans-serif;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default SignInForm;
