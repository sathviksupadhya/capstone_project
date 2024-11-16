import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const navigate = useNavigate();

  const validatePhone = (phoneNumber) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUsernameError("");
    setPhoneError("");

    // if (!validatePhone(phone)) {
    //   setPhoneError("Phone number must be exactly 10 digits");
    //   return;
    // }

    try {
      // First register the user
      console.log("dsfas");
      const registerResponse = await axios.post(
        "http://localhost:9997/auth/register",
        {
          userName: username,
          password: password,
          role: "Resident",
        }
      );

      const validateResponse = await axios.post(
        "http://localhost:9997/auth/validate/user",
        {
          userName: username,
          password: password,
        }
      );
      const { token, userId } = validateResponse.data;
      console.log(userId);
      const response = await axios.put(
        `http://localhost:9997/api/residents/update/${userId}`,
        {
          email: email,
          phoneNumber: phone,
          image: "",
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("updated");
      toast.success("Registration successful! Redirecting to sign in...", {
        position: "top-right",
        autoClose: 3000,
      });
      

      setTimeout(() => {
        navigate("/signin");
      }, 3000);
    } catch (err) {
      console.error("Error during registration:", err);

      if (err.response) {
        switch (err.response.status) {
          case 400:
            toast.error(
              "Invalid registration details. Please check your input.",
              {
                position: "top-right",
              }
            );
            break;
          case 500:
            toast.error("Name is already taken. Please try another name.", {
              position: "top-right",
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
          <InputGroup>
            <Label>Username</Label>
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setUsernameError("");
              }}
              required
            />
            {usernameError && <ErrorText>{usernameError}</ErrorText>}
          </InputGroup>

          <InputGroup>
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputGroup>

          <InputGroup>
            <Label>Phone Number</Label>
            <Input
              type="tel"
              placeholder="10-digit phone number"
              value={phone}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0, 10);
                setPhone(value);
                setPhoneError("");
              }}
              required
            />
            {phoneError && <ErrorText>{phoneError}</ErrorText>}
          </InputGroup>

          <InputGroup>
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </InputGroup>

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
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f5f5;
`;

const FormCard = styled.div`
  background: white;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
  font-size: 24px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Label = styled.label`
  font-size: 14px;
  color: #333;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #000000;
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
  margin-top: 8px;

  &:hover {
    background: #333333;
  }
`;

const SignInText = styled.p`
  text-align: center;
  margin-top: 15px;
  color: #666;
  font-size: 14px;

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
  font-size: 12px;
  margin: 0;
  padding: 0;
`;

export default RegisterForm;
