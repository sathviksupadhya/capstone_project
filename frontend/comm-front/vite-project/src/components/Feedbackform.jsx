import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const FeedbackForm = ({ eventId, theme }) => {
  const [formData, setFormData] = useState({
    rating: null,
    comment: '',
    userName: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleRatingClick = (rating) => {
    setFormData(prevState => ({
      ...prevState,
      rating
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the feedback data to your backend
    console.log({
      ...formData,
      eventId
    });
  };

  return (
    <FormContainer>
      <StyledForm onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="userName">Your Name</Label>
          <Input
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Rating</Label>
          <RatingContainer>
            {[1, 2, 3, 4, 5].map((rating) => (
              <RatingButton
                key={rating}
                type="button"
                selected={formData.rating === rating}
                onClick={() => handleRatingClick(rating)}
                theme={theme}
              >
                {rating}
              </RatingButton>
            ))}
          </RatingContainer>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="comment">Your Feedback</Label>
          <TextArea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            placeholder="Share your experience about this event..."
            required
          />
        </FormGroup>

        <SubmitButton
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Submit Feedback
        </SubmitButton>
      </StyledForm>
    </FormContainer>
  );
};

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

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 1rem;
  background: ${props => props.theme === 'dark' ? '#2d2d2d' : 'white'};
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#000000'};
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 1rem;
  min-height: 120px;
  background: ${props => props.theme === 'dark' ? '#2d2d2d' : 'white'};
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#000000'};
`;

const RatingContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const RatingButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  background: ${props => props.selected ? 'linear-gradient(to right, #2563eb, #4f46e5)' : 'transparent'};
  color: ${props => props.selected ? 'white' : (props.theme === 'dark' ? '#ffffff' : '#000000')};
  cursor: pointer;
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


export default FeedbackForm;
