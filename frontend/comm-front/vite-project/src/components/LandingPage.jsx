import { motion } from 'framer-motion';
import styled from 'styled-components';

const HeroSection = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 100px 20px 20px 20px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.2)
  );
`;

const ContentWrapper = styled.div`
  max-width: 800px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const Title = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  background: linear-gradient(to right, #2563eb, #4f46e5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  width: 100%;
`;

const Description = styled(motion.p)`
  font-size: 1.25rem;
  line-height: 1.75;
  color: #4b5563;
  margin-bottom: 2rem;
  text-align: center;
  max-width: 90%;
`;

const LandingPage = () => {
  return (
    <HeroSection>
      <ContentWrapper>
        <Title
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to Our Platform
        </Title>
        <Description
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Discover a seamless experience where innovation meets simplicity. Our platform 
          provides cutting-edge solutions designed to enhance your digital journey. 
          Join us and be part of the future of digital transformation.
        </Description>
      </ContentWrapper>
    </HeroSection>
  );
};

export default LandingPage;
