import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { FaCalendarAlt, FaBell, FaClock, FaComments, FaRss, FaRegCalendarCheck, FaLinkedin, FaGithub, FaUserCircle, FaSun, FaMoon } from 'react-icons/fa';

const HeroSection = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 120px 50px 20px 50px;
  background: ${props => props.theme === 'dark' 
    ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
    : 'linear-gradient(135deg, #e6f0ff 0%, #f5f5ff 100%)'
  };
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#000000'};
`;

const ContentWrapper = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 0 auto;
  gap: 12.5vh;
`;

const AnimationCard = styled(motion.div)`
  background: ${props => props.theme === 'dark' 
    ? 'rgba(45, 45, 45, 0.9)' 
    : 'rgba(255, 255, 255, 0.95)'
  };
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: ${props => props.theme === 'dark'
    ? '0 10px 30px -10px rgba(0, 0, 0, 0.3)'
    : '0 10px 30px -10px rgba(37, 99, 235, 0.2)'
  };
  max-width: 1200px;
  width: 100%;
  backdrop-filter: blur(10px);
  border: 1px solid ${props => props.theme === 'dark' 
    ? 'rgba(255, 255, 255, 0.1)'
    : 'rgba(37, 99, 235, 0.1)'
  };
  display: flex;
  flex-direction: column;
  align-items: center;
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

  span {
    background: none;
    -webkit-background-clip: unset;
    -webkit-text-fill-color: ${props => props.theme === 'dark' ? '#ffffff' : '#000000'};
    font-weight: bold;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.25rem;
  line-height: 1.75;
  color: ${props => props.theme === 'dark' ? '#e0e0e0' : '#4b5563'};
  margin-bottom: 2rem;
  text-align: center;
  max-width: 90%;
  margin-left: auto;
  margin-right: auto;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const ThemeToggleButton = styled(motion.button)`
  padding: 1rem;
  font-size: 1.125rem;
  color: white;
  background: ${props => props.theme === 'dark' 
    ? 'linear-gradient(to right, #4f46e5, #6366f1)'
    : 'linear-gradient(to right, #2563eb, #4f46e5)'
  };
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: transform 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: translateY(-2px);
  }
`;

const GetStartedButton = styled(motion.button)`
  padding: 1rem 2rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(to right, #2563eb, #4f46e5);
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const KnowMoreButton = styled(motion.button)`
  padding: 1rem 2rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: white;
  background: ${props => props.theme === 'dark'
    ? 'linear-gradient(to right, #4f46e5, #6366f1)'
    : 'linear-gradient(to right, #1f2937, #374151)'
  };
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const FeaturesSection = styled.div`
  width: 100%;
  max-width: 1200px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem 0;
`;

const FeatureItem = styled(motion.div)`
  padding: 2rem;
  background: ${props => props.theme === 'dark'
    ? 'rgba(45, 45, 45, 0.9)'
    : 'rgba(255, 255, 255, 0.95)'
  };
  border-radius: 1rem;
  text-align: left;
  box-shadow: ${props => props.theme === 'dark'
    ? '0 4px 6px rgba(0, 0, 0, 0.2)'
    : '0 4px 6px rgba(37, 99, 235, 0.1)'
  };
  margin-bottom: 1rem;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  
  h3 {
    font-size: 1.5rem;
    color: ${props => props.isBlue 
      ? '#2563eb' 
      : props.theme === 'dark' ? '#ffffff' : '#000000'
    };
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  p {
    color: ${props => props.theme === 'dark' 
      ? '#e0e0e0' 
      : props.isBlue ? '#4b5563' : '#000000'
    };
    line-height: 1.6;
  }

  &:hover {
    transform: translateY(-10px);
    box-shadow: ${props => props.theme === 'dark'
      ? '0 25px 30px -5px rgba(0, 0, 0, 0.3), 0 15px 15px -5px rgba(0, 0, 0, 0.15)'
      : '0 25px 30px -5px rgba(37, 99, 235, 0.2), 0 15px 15px -5px rgba(37, 99, 235, 0.1)'
    };
  }
`;

const TeamSection = styled(motion.div)`
  width: 100%;
  max-width: 1200px;
  padding: 4rem 2rem;
  background: ${props => props.theme === 'dark'
    ? 'rgba(45, 45, 45, 0.9)'
    : 'rgba(255, 255, 255, 0.95)'
  };
  border-radius: 1rem;
  box-shadow: ${props => props.theme === 'dark'
    ? '0 4px 6px rgba(0, 0, 0, 0.2)'
    : '0 4px 6px rgba(37, 99, 235, 0.1)'
  };
`;

const TeamTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 3rem;
  text-align: center;
  color: #2563eb;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const TeamMember = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background: ${props => props.theme === 'dark'
    ? 'rgba(61, 61, 61, 0.9)'
    : 'rgba(255, 255, 255, 0.95)'
  };
  border-radius: 1rem;
  box-shadow: ${props => props.theme === 'dark'
    ? '0 4px 6px rgba(0, 0, 0, 0.2)'
    : '0 4px 6px rgba(37, 99, 235, 0.1)'
  };
`;

const MemberIcon = styled(FaUserCircle)`
  font-size: 6rem;
  color: #4f46e5;
  margin-bottom: 1rem;
`;

const MemberName = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${props => props.theme === 'dark' ? '#ffffff' : 'inherit'};
`;

const MemberRole = styled.p`
  color: ${props => props.theme === 'dark' ? '#b0b0b0' : '#6b7280'};
  margin-bottom: 1rem;
`;

const SocialButton = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  text-decoration: none;
  color: white;
  background: ${props => props.platform === 'linkedin' 
    ? '#0077B5' 
    : props.theme === 'dark' ? '#444' : '#333'
  };
  margin: 0.5rem 0;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const LandingPage = () => {
  const navigate = useNavigate();
  const featuresSectionRef = useRef(null);
  const [theme, setTheme] = useState('light');

  const handleGetStarted = () => {
    navigate('/register');
  };

  const handleKnowMore = () => {
    featuresSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const titleVariants = {
    initial: {
      opacity: 0,
      y: -50,
      scale: 0.8
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 2.5,
        ease: "easeInOut",
        staggerChildren: 0.2
      },
    },
  };

  const spanVariants = {
    initial: {
      opacity: 0,
      y: 50,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 2.5,
        ease: "easeInOut",
      },
    },
  };

  const cardVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 2,
        ease: "easeOut"
      }
    }
  };

  const featureVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const teamMemberVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <HeroSection theme={theme}>
      <ContentWrapper>
        <AnimationCard
          variants={cardVariants}
          initial="initial"
          animate="animate"
          theme={theme}
        >
          <Title
            variants={titleVariants}
            initial="initial"
            animate="animate"
            viewport={{ once: true }}
            theme={theme}
          >
            Welcome to{" "}
            <motion.span
              variants={spanVariants}
            >
              UnitySpace
            </motion.span>
          </Title>
          <Description
            initial={{ opacity: 0, z: -100 }}
            animate={{ opacity: 1, z: 0 }}
            transition={{ duration: 2.5, ease: "backOut" }}
            style={{ 
              perspective: 1000,
              transformStyle: "preserve-3d"
            }}
            viewport={{ once: true }}
            theme={theme}
          >
            Experience a connected community like never before. 
            UnitySpace is your digital hub for staying updated 
            on all events happening in your society. Whether 
            it's a celebration, meeting, or community initiative, 
            UnitySpace keeps you informed, engaged, and part of 
            every moment. Join your neighbors in building a 
            vibrant, united community!
          </Description>
          <ButtonContainer>
            <ThemeToggleButton
              onClick={toggleTheme}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              theme={theme}
            >
              {theme === 'light' ? <FaMoon /> : <FaSun />}
            </ThemeToggleButton>
            <GetStartedButton
              onClick={handleGetStarted}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Get Started
            </GetStartedButton>
            <KnowMoreButton
              onClick={handleKnowMore}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              viewport={{ once: true }}
              theme={theme}
            >
              Know More
            </KnowMoreButton>
          </ButtonContainer>
        </AnimationCard>

        <FeaturesSection ref={featuresSectionRef}>
          <FeatureItem
            variants={featureVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            isBlue={true}
            theme={theme}
          >
            <h3><FaCalendarAlt /> Event Management</h3>
            <p>Create, organize, and manage community events effortlessly. Set dates, venues, and track attendance all in one place.</p>
          </FeatureItem>

          <FeatureItem
            variants={featureVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            isBlue={false}
            theme={theme}
          >
            <h3><FaBell /> Smart Reminders</h3>
            <p>Never miss an important event with our intelligent reminder system. Get notifications about upcoming events and important updates.</p>
          </FeatureItem>

          <FeatureItem
            variants={featureVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            isBlue={true}
            theme={theme}
          >
            <h3><FaClock /> Event Scheduling</h3>
            <p>Plan ahead with our intuitive scheduling system. Check availability, avoid conflicts, and find the perfect time for your events.</p>
          </FeatureItem>

          <FeatureItem
            variants={featureVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            isBlue={false}
            theme={theme}
          >
            <h3><FaComments /> Community Feedback</h3>
            <p>Share your thoughts and experiences. Rate events, provide suggestions, and help shape future community gatherings.</p>
          </FeatureItem>

          <FeatureItem
            variants={featureVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            isBlue={true}
            theme={theme}
          >
            <h3><FaRss /> Real-time Updates</h3>
            <p>Stay informed with instant updates about event changes, new announcements, and community news.</p>
          </FeatureItem>

          <FeatureItem
            variants={featureVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            isBlue={false}
            theme={theme}
          >
            <h3><FaRegCalendarCheck /> Community Calendar</h3>
            <p>Access a shared calendar showing all upcoming events, making it easy to plan and participate in community activities.</p>
          </FeatureItem>
        </FeaturesSection>

        <TeamSection 
          theme={theme}
          variants={cardVariants}
          initial="initial"
          animate="animate"
        >
          <TeamTitle>Meet Our Team</TeamTitle>
          <TeamGrid>
            <TeamMember
              variants={teamMemberVariants}
              initial="initial"
              animate="animate"
              theme={theme}
            >
              <MemberIcon />
              <MemberName theme={theme}>Sathvik S </MemberName>
              <MemberRole theme={theme}>Lead Developer</MemberRole>
              <SocialButton 
                href="https://linkedin.com/sathviksupadhya19/" 
                target="_blank"
                rel="noopener noreferrer"
                platform="linkedin"
              >
                <FaLinkedin /> Connect via LinkedIn
              </SocialButton>
              <SocialButton 
                href="https://github.com/sathviksupadhya/" 
                target="_blank"
                rel="noopener noreferrer"
                platform="github"
                theme={theme}
              >
                <FaGithub /> Connect via GitHub
              </SocialButton>
            </TeamMember>

            <TeamMember
              variants={teamMemberVariants}
              initial="initial"
              animate="animate"
              theme={theme}
            >
              <MemberIcon />
              <MemberName theme={theme}>Rahul K</MemberName>
              <MemberRole theme={theme}>Lead Developer</MemberRole>
              <SocialButton 
                href="https://linkedin.com" 
                target="_blank"
                rel="noopener noreferrer"
                platform="linkedin"
              >
                <FaLinkedin /> Connect via LinkedIn
              </SocialButton>
              <SocialButton 
                href="https://github.com/Rahul-char/" 
                target="_blank"
                rel="noopener noreferrer"
                platform="github"
                theme={theme}
              >
                <FaGithub /> Connect via GitHub
              </SocialButton>
            </TeamMember>
          </TeamGrid>
        </TeamSection>
      </ContentWrapper>
    </HeroSection>
  );
};

export default LandingPage;
