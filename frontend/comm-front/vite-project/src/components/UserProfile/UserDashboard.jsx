import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaHome, FaCalendarAlt, FaBell, FaCog, FaSignOutAlt, FaUser, FaSms, FaPhone, FaEnvelope } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Sidebar = styled.div`
  width: 250px;
  background: #1a1a1a;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 40px;
  padding: 20px 0;
  border-bottom: 1px solid #333;
`;

const LogoImage = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
`;

const SidebarMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 15px;
  cursor: pointer;
  border-radius: 8px;
  transition: background 0.3s;

  &:hover {
    background: #333;
  }

  svg {
    font-size: 20px;
  }
`;

const MainContent = styled.div`
  flex: 1;
  background: #f5f5f5;
  padding: 30px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  margin-bottom: 30px;
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.05);
`;

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #f5f5f5;
`;

const UserInfo = styled.div`
  h1 {
    font-size: 24px;
    margin: 0 0 8px;
  }
  p {
    color: #666;
    margin: 0;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const StatCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.05);
  text-align: center;

  h3 {
    color: #666;
    font-size: 16px;
    margin: 0 0 10px;
  }

  p {
    color: #333;
    font-size: 24px;
    font-weight: bold;
    margin: 0;
  }
`;

const ActivitySection = styled.div`
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.05);

  h2 {
    margin: 0 0 20px;
    color: #333;
  }
`;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ActivityItem = styled.div`
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    color: #666;
  }
`;

const NotificationPopup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  z-index: 1000;
  width: 500px;
`;

const NotificationCard = styled.div`
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateX(5px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }

  .icon-text {
    display: flex;
    align-items: center;
    gap: 15px;

    svg {
      font-size: 24px;
      color: #666;
    }

    .text {
      h4 {
        margin: 0;
        color: #333;
      }
      p {
        margin: 5px 0 0;
        color: #666;
        font-size: 14px;
      }
    }
  }
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const SaveButton = styled.button`
  width: 100%;
  padding: 12px;
  background: #1a1a1a;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 20px;
  font-size: 16px;
  transition: background 0.3s;

  &:hover {
    background: #333;
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

  // const extractNameFromEmail = (email) => {
  //   return email.split('@')[0];
  // };

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
          <MenuItem>
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
          <h3>Notification Preferences</h3>
          
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
