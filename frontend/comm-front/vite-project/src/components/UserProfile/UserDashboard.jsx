import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaHome, FaCalendarAlt, FaBell, FaCog, FaSignOutAlt, FaUser, FaSms, FaPhone, FaEnvelope, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: #E8EEF4;
  font-family: 'Inter', sans-serif;
`;

const Sidebar = styled.div`
  width: 280px;
  background: #000000;
  color: #FFFFFF;
  padding: 25px;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 2;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 40px;
  padding: 15px 0;
  border-bottom: 2px solid #333333;
  letter-spacing: 0.5px;
`;

const LogoImage = styled.img`
  height: 45px;
  width: 45px;
  border-radius: 12px;
  object-fit: cover;
`;

const SidebarMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  padding: 10px 0;
  margin-top: 20px;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: rgba(255, 255, 255, 0.1);
  }
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 16px 20px;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;
  color: #FFFFFF;
  font-weight: 500;
  letter-spacing: 0.3px;
  position: relative;
  overflow: hidden;
  background: ${props => props.active ? '#808080' : 'transparent'};
  transform: ${props => props.active ? 'translateX(5px)' : 'none'};
  box-shadow: ${props => props.active ? '0 4px 15px rgba(0, 0, 0, 0.2)' : 'none'};

  &:hover {
    background: #808080;
    color: #fff;
    transform: translateX(5px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: scale(0.98);
  }

  svg {
    font-size: 20px;
    transition: transform 0.2s ease;
  }

  &:hover svg {
    transform: scale(1.1);
  }

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 3px;
    background: #fff;
    transform: ${props => props.active ? 'scaleY(1)' : 'scaleY(0)'};
    transition: transform 0.2s;
  }

  &:hover:before {
    transform: scaleY(1);
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 40px;
  background: #E8EEF4;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  margin-bottom: 40px;
  background: #FFFFFF;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(44, 62, 80, 0.1);
  
  
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 20px;
  object-fit: cover;
`;

const UserInfo = styled.div`
  h1 {
    font-size: 28px;
    color: #2C3E50;
    margin: 0 0 8px;
    font-weight: 700;
  }
  p {
    color: #7F8C8D;
    font-size: 16px;
    margin: 0;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
  margin-bottom: 40px;
`;

const StatCard = styled.div`
  background: #FFFFFF;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(44, 62, 80, 0.1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: black;
  }

  h3 {
    color: #7F8C8D;
    font-size: 16px;
    margin: 0 0 15px;
    font-weight: 500;
  }

  p {
    color: #2C3E50;
    font-size: 36px;
    font-weight: 700;
    margin: 0;
  }
`;

const ActivitySection = styled.div`
  background: #FFFFFF;
  padding: 35px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(44, 62, 80, 0.1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: black;
  }

  h2 {
    margin: 0 0 25px;
    color: #2C3E50;
    font-size: 22px;
    font-weight: 700;
  }
`;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ActivityItem = styled.div`
  padding: 20px;
  background: #F8FAFC;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: 0.2s ease;

  &:hover {
    background: #EDF2F7;
  }

  span {
    &:first-child {
      color: #2C3E50;
      font-weight: 500;
    }
    &:last-child {
      color: #7F8C8D;
      font-size: 14px;
    }
  }
`;

const NotificationPopup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #FFFFFF;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(44, 62, 80, 0.15);
  z-index: 1000;
  width: 500px;
`;

const NotificationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  
  h3 {
    margin: 0;
    color: #2C3E50;
    font-size: 24px;
    font-weight: 700;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #7F8C8D;
  font-size: 24px;
  cursor: pointer;
  padding: 5px;
  transition: 0.2s ease;
  
  &:hover {
    color: #2C3E50;
  }
`;

const NotificationCard = styled.div`
  background: #F8FAFC;
  padding: 25px;
  border-radius: 16px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .icon-text {
    display: flex;
    align-items: center;
    gap: 20px;

    svg {
      font-size: 24px;
      color: #000000;
    }

    .text {
      h4 {
        margin: 0;
        color: #2C3E50;
        font-size: 18px;
        font-weight: 600;
      }
      p {
        margin: 5px 0 0;
        color: #7F8C8D;
        font-size: 14px;
      }
    }
  }
`;

const Checkbox = styled.input`
  width: 22px;
  height: 22px;
  cursor: pointer;
  accent-color: #3498DB;
`;

const SaveButton = styled.button`
  width: 100%;
  padding: 16px;
  background: black;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  margin-top: 25px;
  font-size: 16px;
  font-weight: 600;
  transition: 0.2s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
`;

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [events, setEvents] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);
  const [notificationPreferences, setNotificationPreferences] = useState({
    sms: false,
    call: false,
    email: false
  });
  const userId = sessionStorage.getItem('userId');
  const token = sessionStorage.getItem('jwtToken');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:9997/api/residents/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setUserData(data);

        const eventsResponse = await fetch(`http://localhost:9997/event/getAllEvents`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const eventsData = await eventsResponse.json();
        setEvents(eventsData);

        const reminder = await fetch(`http://localhost:9997/reminder/getbyUserId/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const reminderData = await reminder.json();
        setReminders(reminderData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId, token]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  const handleProfileClick = () => {
    console.log(userData);
    navigate('/home/profile/profile', { state: { user: userData } });
  };

  const handleSettingsClick = () => {
    navigate('/home/profile/settings');
  };

  const handleNotificationClick = () => {
    setShowNotificationPopup(true);
  };

  const handleCheckboxChange = (type) => {
    setNotificationPreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleSaveNotifications = () => {
    alert('Notification preferences saved: ' + 
          Object.entries(notificationPreferences)
            .filter(([_, value]) => value)
            .map(([key]) => key)
            .join(', '));
    setShowNotificationPopup(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('jwtToken');
    navigate('/');
  };

  return (
    <DashboardContainer>
      <Sidebar>
        <Logo onClick={() => navigate('/home')}>
          <LogoImage src="/src/assets/mainlogo.jpg" alt="UnitySpace Logo" />
          UnitySpace
        </Logo>
        <SidebarMenu>
          <MenuItem active={true}>
            <FaHome />
            Dashboard
          </MenuItem>
          <MenuItem>
            <FaCalendarAlt />
            Events
          </MenuItem>
          <MenuItem onClick={handleNotificationClick}>
            <FaBell />
            Notifications
          </MenuItem>
          <MenuItem onClick={handleProfileClick}>
            <FaUser />
            Profile
          </MenuItem>
          <MenuItem onClick={handleSettingsClick}>
            <FaCog />
            Settings
          </MenuItem>
          <MenuItem style={{ marginTop: 'auto' }} onClick={handleLogout}>
            <FaSignOutAlt />
            Logout
          </MenuItem>
        </SidebarMenu>
      </Sidebar>

      {showNotificationPopup && (
        <NotificationPopup>
          <NotificationHeader>
            <h3>Notification Preferences</h3>
            <CloseButton onClick={() => setShowNotificationPopup(false)}>
              <FaTimes />
            </CloseButton>
          </NotificationHeader>
          
          <NotificationCard>
            <div className="icon-text">
              <FaSms />
              <div className="text">
                <h4>SMS Notifications</h4>
                <p>Receive updates via text message</p>
              </div>
            </div>
            <Checkbox
              type="checkbox"
              checked={notificationPreferences.sms}
              onChange={() => handleCheckboxChange('sms')}
            />
          </NotificationCard>

          <NotificationCard>
            <div className="icon-text">
              <FaPhone />
              <div className="text">
                <h4>Phone Calls</h4>
                <p>Get important alerts via phone call</p>
              </div>
            </div>
            <Checkbox
              type="checkbox"
              checked={notificationPreferences.call}
              onChange={() => handleCheckboxChange('call')}
            />
          </NotificationCard>

          <NotificationCard>
            <div className="icon-text">
              <FaEnvelope />
              <div className="text">
                <h4>Email Notifications</h4>
                <p>Receive detailed updates in your inbox</p>
              </div>
            </div>
            <Checkbox
              type="checkbox"
              checked={notificationPreferences.email}
              onChange={() => handleCheckboxChange('email')}
            />
          </NotificationCard>

          <SaveButton onClick={handleSaveNotifications}>
            Save Preferences
          </SaveButton>
        </NotificationPopup>
      )}

      <MainContent>
        <Header>
          <ProfileImage src={userData.image} alt="Profile" />
          <UserInfo>
            <h1>{userData.userName}</h1>
            <p>{userData.email}</p>
          </UserInfo>
        </Header>

        <StatsGrid>
          <StatCard>
            <h3>Total Events</h3>
            <p>{events.length}</p>
          </StatCard>
          <StatCard>
            <h3>Upcoming Events</h3>
            <p>{events.filter(event => new Date(event.eventDate) > new Date()).length}</p>
          </StatCard>
          <StatCard>
            <h3>Reminders</h3>
            <p>{reminders.filter(reminder => reminder.needSms || reminder.needCall || reminder.needEmail).length}</p>
          </StatCard>
          <StatCard>
            <h3>Notifications</h3>
            <p>8</p>
          </StatCard>
        </StatsGrid>

        <ActivitySection>
          <h2>Recent Activity</h2>
          <ActivityList>
            <ActivityItem>
              <span>Registered for Community BBQ</span>
              <span>2 hours ago</span>
            </ActivityItem>
            <ActivityItem>
              <span>Updated Profile Information</span>
              <span>1 day ago</span>
            </ActivityItem>
            <ActivityItem>
              <span>Set Reminder for Pool Party</span>
              <span>2 days ago</span>
            </ActivityItem>
          </ActivityList>
        </ActivitySection>
      </MainContent>
    </DashboardContainer>
  );
};

export default UserDashboard;
