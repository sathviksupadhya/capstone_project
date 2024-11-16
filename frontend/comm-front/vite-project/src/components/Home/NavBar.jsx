import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from "axios";
import "../../CSS/cardStyles.css";
import { FaChevronDown, FaUserCircle } from 'react-icons/fa';
import mainLogo from '../../assets/mainlogo.jpg?url';

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [profileImage, setProfileImage] = useState('');
  const [userName, setUserName] = useState('');
  const userId = sessionStorage.getItem('userId');
  const token = sessionStorage.getItem('jwtToken');

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, [window.location.pathname]);

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        // console.log(123, userId);
        const response = await axios.get(`http://localhost:9997/api/residents/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.data;
        console.log(data);
        setProfileImage(data.image);
        setUserName(data.firstName);
      } catch (error) {
        console.error('Error fetching profile image:', error);
      }
    };

    fetchProfileImage();
  }, []);

  const handleLogoClick = () => {
    navigate('/home');
  };

  const handleLogout = () => {
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('jwtToken');
    navigate('/');
  };

  const handleDropdownClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleMyAccount = () => {
    navigate('/home/profile');
    setDropdownOpen(false);
  };

  const [cards, setCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [checkboxValues, setCheckboxValues] = useState({
    needsms: false,
    needcall: false,
    needemail: false,
  });

  const [shouldRefetch, setShouldRefetch] = useState(false);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9997/api/alert/user/${userId}`, 
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );
          setCards(response.data);
      } catch (error) {
        setCards([]);
        console.error('Error fetching alerts:', error);
      }
    };

    fetchAlerts();
  }, [shouldRefetch]);

  const handleCheckboxChange = ({ target: { name, checked } }) => {
    setCheckboxValues(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSetRem = async (eventid) => {
    try{
      const baseUrl = 'http://localhost:9997/reminder/create';
      await axios.post(`${baseUrl}`, {
        userId,
        eventId: eventid,
        needSms: checkboxValues.needsms,
        needCall: checkboxValues.needcall, 
        needEmail: checkboxValues.needemail
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      handleIgnore(eventid);
    } catch (error) {
      console.error('Error marking alert as seen:', error);
    }
  }

  const handleIgnore = async (eventid) => {
    try {
      const headers = { Authorization: token };
      const baseUrl = 'http://localhost:9997/api/alert';

      await axios.put(
        `${baseUrl}/seen/${userId}/${eventid}`,
        null,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      setShouldRefetch(prev => !prev);
    } catch (error) {
      console.error('Error marking alert as seen:', error);
    }
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCardClick = (index) => {
    setCurrentCardIndex(index);
  };

  const getCardClass = (index) => {
    if (index === currentCardIndex) {
      return "card card--current";
    } else if (
      index === currentCardIndex + 1 ||
      (currentCardIndex === cards.length - 1 && index === 0)
    ) {
      return "card card--next";
    } else {
      return "card card--out";
    }
  };

  return (
    <>
    <Nav scrolled={scrolled}>
      <Logo onClick={handleLogoClick}>
        <LogoImage src={mainLogo} alt="UnitySpace Logo" />
        <LogoTitle>UnitySpace</LogoTitle>
      </Logo>
      
      <NavLinks>
        <NavLink onClick={() => scrollToSection('home-section')}>Home</NavLink>
        <NavLink onClick={() => scrollToSection('events-section')}>Events</NavLink>
        <NavLink onClick={() => scrollToSection('schedules-section')}>Schedules</NavLink>
        <NavLink onClick={() => scrollToSection('timesheet-section')}>Timesheet</NavLink>
      </NavLinks>

      <ProfileSection>
        <ProfileImage 
          src={profileImage}
          alt="Profile" 
          onClick={() => setDropdownOpen(!dropdownOpen)}
        />
        <ChevronIcon isOpen={dropdownOpen} onClick={() => setDropdownOpen(!dropdownOpen)} />
        <Dropdown isOpen={dropdownOpen}>
          <DropdownUserName>{userName || 'User'}</DropdownUserName>
          <DropdownItem onClick={handleMyAccount}>My Account</DropdownItem>
          <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
        </Dropdown>
      </ProfileSection>
    </Nav>
    {cards.length > 0 && (
      <div
        style={{
          display: "flex",
          justifyContent: "center", 
          alignItems: "center",
          padding: "20px",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 10,
          marginTop: '45px'
        }}
      >
        <ul className="cards">
          {cards.map((card, index) => (
            <li
              key={index}
              className={getCardClass(index)}
              onClick={() => handleCardClick(index)}
              style={{padding: '30px'}}
            >
              <h1
              style={{marginTop: '-14px'}}
              >{card.eventTitle}</h1>
              <img src={card.eventImg} alt={card.title} className="card-image" />
              <p>{card.eventDescription}</p>
              <p>
                {(() => {
                  const date = new Date(card.eventDate);
                  const day = date.getDate();
                  const month = date.toLocaleString('default', { month: 'short' });
                  const hour = date.getHours();
                  const ampm = hour >= 12 ? 'PM' : 'AM';
                  const hour12 = hour % 12 || 12;
                  const message = `${day}${getSuffix(day)} ${month} at ${hour12}${ampm}`;
                  function getSuffix(day) {
                    if (day >= 11 && day <= 13) return 'th';
                    const lastDigit = day % 10;
                    switch (lastDigit) {
                      case 1: return 'st';
                      case 2: return 'nd'; 
                      case 3: return 'rd';
                      default: return 'th';
                    }
                  }
                  return message;
                })()}
              </p>
              <div className="checkbox-container" style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '30px',
                margin: '20px 0'
              }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '16px'
                }}>
                  <input
                    type="checkbox"
                    name="needsms"
                    checked={checkboxValues.needsms}
                    onChange={handleCheckboxChange}
                    style={{
                      width: '18px',
                      height: '18px',
                      cursor: 'pointer'
                    }}
                  />
                  SMS
                </label>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '16px'
                }}>
                  <input
                    type="checkbox"
                    name="needcall"
                    checked={checkboxValues.needcall}
                    onChange={handleCheckboxChange}
                    style={{
                      width: '18px',
                      height: '18px',
                      cursor: 'pointer'
                    }}
                  />
                  Call
                </label>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '16px'
                }}>
                  <input
                    type="checkbox"
                    name="needemail"
                    checked={checkboxValues.needemail}
                    onChange={handleCheckboxChange}
                    style={{
                      width: '18px',
                      height: '18px',
                      cursor: 'pointer'
                    }}
                  />
                  Email
                </label>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '20px',
                marginTop: '20px'
              }}>
                <button 
                  onClick={() => handleSetRem(card.eventId)}
                  style={{
                    padding: '10px 25px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}
                >
                  Submit
                </button>
                <button 
                  onClick={() => handleIgnore(card.eventId)}
                  style={{
                    padding: '10px 25px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    backgroundColor: '#f44336',
                    color: 'white',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#da190b'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#f44336'}
                >
                  Ignore
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )}
    </>
  );
};

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
  transition: all 0.3s ease-in-out;
  z-index: 1000;
  background: ${props => props.scrolled ? '#000000' : 'none'};
  -webkit-backdrop-filter: blur(8px);
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

const LogoImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const LogoTitle = styled.span`
  font-size: 26px;
  font-weight: bold;
  color: #FFFFFF;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
`;

const NavLink = styled.a`
  color: #FFFFFF;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -3px;
    left: 0;
    background-color: #FFFFFF;
    transition: width 0.3s ease;
  }

  &:hover:after {
    width: 100%;
  }
`;

const ProfileSection = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
`;

const ChevronIcon = styled(FaChevronDown)`
  color: #FFFFFF;
  transition: transform 0.3s ease;
  transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0)'};
`;

const Dropdown = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 10px 0;
  display: ${props => props.isOpen ? 'block' : 'none'};
  min-width: 200px;
`;

const DropdownItem = styled.div`
  padding: 10px 20px;
  cursor: pointer;
  color: #333;
  display: flex;
  align-items: center;
  gap: 10px;
  
  &:hover {
    background: #f5f5f5;
  }
`;

const DropdownUserName = styled.div`
  padding: 10px 20px;
  color: #333;
  font-weight: bold;
  border-bottom: 1px solid #eee;
`;

const SettingsSubmenu = styled.div`
  padding: 10px 0;
  border-top: 1px solid #eee;
`;

export default NavBar;
