import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaUsers, FaCalendarAlt, FaChartLine, FaSearch, FaFilter, FaDownload, FaBell, FaComments, FaMoneyBillWave, FaUserClock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const DashboardContainer = styled.div`
  padding: 90px 50px 30px;
  background: ${props => props.$theme === 'dark' ? '#1a1a1a' : '#f5f5f5'};
  min-height: 100vh;
  color: ${props => props.$theme === 'dark' ? '#ffffff' : '#000000'};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
`;

const StatCard = styled.div`
  background: ${props => props.$theme === 'dark' ? '#333' : '#ffffff'};
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 20px;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
    cursor: pointer;
  }
`;

const StatIcon = styled.div`
  font-size: 2.5rem;
  color: #4CAF50;
`;

const StatInfo = styled.div`
  h3 {
    font-size: 1.8rem;
    margin: 0;
  }
  p {
    margin: 5px 0 0;
    color: ${props => props.$theme === 'dark' ? '#ccc' : '#666'};
  }
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 40px 0 20px;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin: 0;
`;

const ControlsContainer = styled.div`
  display: flex;
  gap: 15px;
`;

const SearchBar = styled.input`
  padding: 8px 15px;
  border: 1px solid ${props => props.$theme === 'dark' ? '#444' : '#ddd'};
  border-radius: 5px;
  background: ${props => props.$theme === 'dark' ? '#444' : '#fff'};
  color: ${props => props.$theme === 'dark' ? '#fff' : '#333'};
`;

const Button = styled.button`
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  background: #4CAF50;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    background: #45a049;
  }
`;

const EventsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const EventCard = styled.div`
  background: ${props => props.$theme === 'dark' ? '#333' : '#ffffff'};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
    cursor: pointer;
  }

  h4 {
    margin: 0 0 10px;
    color: ${props => props.$theme === 'dark' ? '#ffffff' : '#000000'};
  }

  p {
    margin: 5px 0;
    color: ${props => props.$theme === 'dark' ? '#ccc' : '#666'};
  }
`;

const StatusBadge = styled.span`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  background: ${props => props.$status === 'active' ? '#4CAF50' : props.$status === 'pending' ? '#ff9800' : '#f44336'};
  color: white;
  margin-left: 10px;
`;

const NotificationsContainer = styled.div`
  margin: 30px 0;
  background: ${props => props.$theme === 'dark' ? '#333' : '#ffffff'};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NotificationItem = styled.div`
  padding: 15px;
  border-bottom: 1px solid ${props => props.$theme === 'dark' ? '#444' : '#eee'};
  display: flex;
  align-items: center;
  gap: 15px;

  &:last-child {
    border-bottom: none;
  }
`;

const RecentActivityContainer = styled.div`
  margin: 30px 0;
  background: ${props => props.$theme === 'dark' ? '#333' : '#ffffff'};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ActivityItem = styled.div`
  padding: 10px;
  border-left: 3px solid #4CAF50;
  margin: 10px 0;
  background: ${props => props.$theme === 'dark' ? '#444' : '#f9f9f9'};
`;

const AdminHome = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    users: 0,
    events: 0,
    activeUsers: 0,
    revenue: 0,
    newRegistrations: 0
  });
  
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [theme] = useState('light');

  useEffect(() => {
    // Fetch stats from your API
    setStats({
      users: 1234,
      events: 45,
      activeUsers: 890,
      revenue: 15000,
      newRegistrations: 56
    });

    // Fetch notifications
    setNotifications([
      { id: 1, message: "New event registration request", time: "2 minutes ago" },
      { id: 2, message: "User reported an issue", time: "1 hour ago" },
      { id: 3, message: "System maintenance scheduled", time: "3 hours ago" }
    ]);

    // Fetch recent activity
    setRecentActivity([
      { id: 1, action: "User John Doe registered for Summer Music Festival", time: "10 minutes ago" },
      { id: 2, action: "New event created: Winter Workshop", time: "2 hours ago" },
      { id: 3, action: "Payment received for Tech Conference", time: "5 hours ago" }
    ]);

    // Fetch upcoming events
    setUpcomingEvents([
      {
        id: 1,
        title: "Summer Music Festival",
        date: "2024-07-15",
        location: "Central Park",
        registrations: 156,
        status: 'active'
      },
      {
        id: 2,
        title: "Tech Conference 2024",
        date: "2024-06-20",
        location: "Convention Center",
        registrations: 89,
        status: 'pending'
      },
      {
        id: 3,
        title: "Food & Wine Expo",
        date: "2024-08-05",
        location: "City Hall",
        registrations: 234,
        status: 'active'
      }
    ]);
  }, [navigate]);

  const handleExportData = () => {
    console.log('Exporting data...');
  };

  const handleCardClick = (id) => {
    navigate(`/admin/events/${id}`);
  };

  const filteredEvents = upcomingEvents.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardContainer $theme={theme}>
      <StatsGrid>
        <StatCard $theme={theme} onClick={() => navigate('/admin/users')}>
          <StatIcon>
            <FaUsers />
          </StatIcon>
          <StatInfo>
            <h3>{stats.users}</h3>
            <p>Registered Users</p>
          </StatInfo>
        </StatCard>

        <StatCard $theme={theme} onClick={() => navigate('/admin/events')}>
          <StatIcon>
            <FaCalendarAlt />
          </StatIcon>
          <StatInfo>
            <h3>{stats.events}</h3>
            <p>Total Events</p>
          </StatInfo>
        </StatCard>

        <StatCard $theme={theme} onClick={() => navigate('/admin/analytics')}>
          <StatIcon>
            <FaChartLine />
          </StatIcon>
          <StatInfo>
            <h3>{stats.activeUsers}</h3>
            <p>Active Users</p>
          </StatInfo>
        </StatCard>

        <StatCard $theme={theme} onClick={() => navigate('/admin/revenue')}>
          <StatIcon>
            <FaMoneyBillWave />
          </StatIcon>
          <StatInfo>
            <h3>${stats.revenue}</h3>
            <p>Total Revenue</p>
          </StatInfo>
        </StatCard>

        <StatCard $theme={theme} onClick={() => navigate('/admin/registrations')}>
          <StatIcon>
            <FaUserClock />
          </StatIcon>
          <StatInfo>
            <h3>{stats.newRegistrations}</h3>
            <p>New Registrations Today</p>
          </StatInfo>
        </StatCard>
      </StatsGrid>

      <NotificationsContainer $theme={theme}>
        <SectionHeader>
          <SectionTitle>Recent Notifications</SectionTitle>
        </SectionHeader>
        {notifications.map(notification => (
          <NotificationItem key={notification.id} $theme={theme}>
            <FaBell />
            <div>
              <p>{notification.message}</p>
              <small>{notification.time}</small>
            </div>
          </NotificationItem>
        ))}
      </NotificationsContainer>

      <RecentActivityContainer $theme={theme}>
        <SectionHeader>
          <SectionTitle>Recent Activity</SectionTitle>
        </SectionHeader>
        {recentActivity.map(activity => (
          <ActivityItem key={activity.id} $theme={theme}>
            <p>{activity.action}</p>
            <small>{activity.time}</small>
          </ActivityItem>
        ))}
      </RecentActivityContainer>

      <SectionHeader>
        <SectionTitle>Upcoming Events</SectionTitle>
        <ControlsContainer>
          <SearchBar 
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            $theme={theme}
          />
          <Button onClick={() => navigate('/admin/events/new')}>
            <FaCalendarAlt /> New Event
          </Button>
          <Button onClick={handleExportData}>
            <FaDownload /> Export
          </Button>
        </ControlsContainer>
      </SectionHeader>

      <EventsGrid>
        {filteredEvents.map(event => (
          <EventCard 
            key={event.id} 
            $theme={theme}
            onClick={() => handleCardClick(event.id)}
          >
            <h4>
              {event.title}
              <StatusBadge $status={event.status}>
                {event.status}
              </StatusBadge>
            </h4>
            <p>📅 {new Date(event.date).toLocaleDateString()}</p>
            <p>📍 {event.location}</p>
            <p>👥 {event.registrations} Registrations</p>
          </EventCard>
        ))}
      </EventsGrid>
    </DashboardContainer>
  );
};

export default AdminHome;
