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
  const [countryCode, setCountryCode] = useState("+1"); // Default to US
  const [usernameError, setUsernameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const navigate = useNavigate();

  const countryPhoneLengths = {
    "+1": 10,   // USA/Canada
    "+44": 10,  // UK
    "+91": 10,  // India
    "+86": 11,  // China
    "+81": 10,  // Japan
    "+82": 10,  // South Korea
    "+61": 9,   // Australia
    "+33": 9,   // France
    "+49": 11,  // Germany
  };

  const validatePhone = (phoneNumber, selectedCountryCode) => {
    const minLength = countryPhoneLengths[selectedCountryCode];
    return phoneNumber.length >= minLength;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUsernameError("");
    setPhoneError("");

    if (!validatePhone(phone, countryCode)) {
      setPhoneError(`Phone number must be at least ${countryPhoneLengths[countryCode]} digits for ${countryCode}`);
      return;
    }

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
          phoneNumber: countryCode + phone, // Include country code with phone
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
            <PhoneInputContainer>
              <CountryCodeSelect 
                value={countryCode}
                onChange={(e) => {
                  setCountryCode(e.target.value);
                  setPhoneError("");
                }}
              >
                <option value="+1">+1 (USA/Canada)</option>
                <option value="+44">+44 (UK)</option>
                <option value="+91">+91 (India)</option>
                <option value="+86">+86 (China)</option>
                <option value="+81">+81 (Japan)</option>
                <option value="+82">+82 (South Korea)</option>
                <option value="+61">+61 (Australia)</option>
                <option value="+33">+33 (France)</option>
                <option value="+49">+49 (Germany)</option>
              </CountryCodeSelect>
              <PhoneInput
                type="tel"
                placeholder={`Min ${countryPhoneLengths[countryCode]} digits`}
                value={phone}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setPhone(value);
                  setPhoneError("");
                }}
                required
              />
            </PhoneInputContainer>
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
  font-family: 'Poppins', sans-serif;
`;

const FormCard = styled.div`
  background: white;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  font-family: 'Poppins', sans-serif;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
  font-size: 28px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  letter-spacing: 0.5px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-family: 'Roboto', sans-serif;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Label = styled.label`
  font-size: 14px;
  color: #333;
  font-weight: 600;
  font-family: 'Roboto', sans-serif;
  letter-spacing: 0.3px;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  font-family: 'Inter', sans-serif;

  &:focus {
    outline: none;
    border-color: #000000;
  }
`;

const PhoneInputContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const CountryCodeSelect = styled.select`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  width: 140px;
  font-family: 'Inter', sans-serif;

  &:focus {
    outline: none;
    border-color: #000000;
  }
`;

const PhoneInput = styled(Input)`
  flex: 1;
`;

const Button = styled.button`
  padding: 12px;
  background: #000000;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
  margin-top: 8px;
  font-family: 'Poppins', sans-serif;
  letter-spacing: 0.5px;

  &:hover {
    background: #333333;
  }
`;

const SignInText = styled.p`
  text-align: center;
  margin-top: 15px;
  color: #666;
  font-size: 14px;
  font-family: 'Inter', sans-serif;

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
  font-family: 'Inter', sans-serif;
`;

export default RegisterForm;
