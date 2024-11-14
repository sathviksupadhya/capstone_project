import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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

const LogoTitle = styled.span`
  font-size: 26px;
  font-weight: bold;
  color: #ffffff;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
`;

const NavLink = styled.a`
  color: #ffffff;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: ${props => props.isActive ? '2px solid #ffffff' : 'none'};
  padding-bottom: 3px;

  &:hover {
    opacity: 0.8;
  }
`;

const ProfileSection = styled.div`
  position: relative;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
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
  min-width: 150px;
`;

const DropdownItem = styled.div`
  padding: 10px 20px;
  cursor: pointer;
  color: #333;
  
  &:hover {
    background: #f5f5f5;
  }
`;

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [profileImage, setProfileImage] = useState('');

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
        const userId = sessionStorage.getItem('userId');
        const token = sessionStorage.getItem('jwtToken');
        console.log(userId);
        const response = await fetch(`http://localhost:9991/api/residents/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        console.log(data.image);
        setProfileImage(data.image);
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

  return (
    <Nav scrolled={scrolled}>
      <Logo onClick={handleLogoClick}>
        <LogoTitle>UnitySpace</LogoTitle>
      </Logo>
      
      <NavLinks>
        <NavLink isActive={currentPath === '/home'} href="/home">Home</NavLink>
        <NavLink isActive={currentPath === '/events'} href="/events">Events</NavLink>
        <NavLink isActive={currentPath === '/schedules'} href="/schedules">Schedules</NavLink>
        <NavLink isActive={currentPath === '/timesheet'} href="/timesheet">Timesheet</NavLink>
      </NavLinks>

      <ProfileSection>
        <ProfileImage 
          src={profileImage}
          alt="Profile" 
          onClick={() => setDropdownOpen(!dropdownOpen)}
        />
        <Dropdown isOpen={dropdownOpen}>
          <DropdownItem>User Details</DropdownItem>
          <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
        </Dropdown>
      </ProfileSection>
    </Nav>
  );
};

export default NavBar;
