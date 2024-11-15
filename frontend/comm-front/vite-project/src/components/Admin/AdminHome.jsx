import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaUsers, FaCalendarAlt, FaChartLine, FaSearch, FaFilter, FaBell, FaComments, FaUserClock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

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
    totalResidents: 0,
    totalEvents: 0,
    activeResidents: 0,
    pendingApprovals: 0
  });
  
  const [notifications, setNotifications] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [theme] = useState('light');
  const token = sessionStorage.getItem('jwtToken');

  useEffect(() => {
    if (!token) {
      navigate('/');
      return;
    }

    const fetchData = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };

        // Fetch residents data
        const residentsResponse = await axios.get('http://localhost:9997/api/residents', { headers });
        const totalResidents = residentsResponse.data.length;
        const activeResidents = residentsResponse.data.filter(resident => resident.status === 'ACTIVE').length;
        const pendingApprovals = residentsResponse.data.filter(resident => resident.status === 'PENDING').length;

        // Fetch events data
        const eventsResponse = await axios.get('http://localhost:9997/api/events', { headers });
        const totalEvents = eventsResponse.data.length;

        setStats({
          totalResidents,
          totalEvents,
          activeResidents,
          pendingApprovals
        });

        // Generate notifications from residents and events data
        const notificationsList = [
          ...residentsResponse.data
            .filter(resident => resident.status === 'PENDING')
            .map(resident => ({
              id: `resident-${resident.id}`,
              message: `New registration request from ${resident.firstName} ${resident.lastName}`,
              timestamp: new Date(resident.createdAt).toLocaleString()
            })),
          ...eventsResponse.data
            .filter(event => new Date(event.eventDate) > new Date())
            .map(event => ({
              id: `event-${event.id}`,
              message: `Upcoming event: ${event.eventName}`,
              timestamp: new Date(event.eventDate).toLocaleString()
            }))
        ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        setNotifications(notificationsList.slice(0, 5)); // Show only latest 5 notifications

        // Generate activity log from residents and events data
        const activityList = [
          ...residentsResponse.data.map(resident => ({
            id: `activity-resident-${resident.id}`,
            description: `Resident ${resident.firstName} ${resident.lastName} ${resident.status === 'ACTIVE' ? 'activated' : 'registered'}`,
            timestamp: new Date(resident.createdAt).toLocaleString()
          })),
          ...eventsResponse.data.map(event => ({
            id: `activity-event-${event.id}`,
            description: `New event created: ${event.eventName}`,
            timestamp: new Date(event.createdAt).toLocaleString()
          }))
        ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        setRecentActivity(activityList.slice(0, 5)); // Show only latest 5 activities

      } catch (error) {
        console.error('Error fetching admin dashboard data:', error);
        if (error.response && error.response.status === 401) {
          navigate('/');
        }
      }
    };

    fetchData();
  }, [navigate, token]);

  return (
    <DashboardContainer $theme={theme}>
      <StatsGrid>
        <StatCard $theme={theme} onClick={() => navigate('/admin/users')}>
          <StatIcon>
            <FaUsers />
          </StatIcon>
          <StatInfo>
            <h3>{stats.totalResidents}</h3>
            <p>Total Residents</p>
          </StatInfo>
        </StatCard>

        <StatCard $theme={theme} onClick={() => navigate('/admin/events')}>
          <StatIcon>
            <FaCalendarAlt />
          </StatIcon>
          <StatInfo>
            <h3>{stats.totalEvents}</h3>
            <p>Total Events</p>
          </StatInfo>
        </StatCard>

        <StatCard $theme={theme} onClick={() => navigate('/admin/analytics')}>
          <StatIcon>
            <FaChartLine />
          </StatIcon>
          <StatInfo>
            <h3>{stats.activeResidents}</h3>
            <p>Active Residents</p>
          </StatInfo>
        </StatCard>

        <StatCard $theme={theme} onClick={() => navigate('/admin/registrations')}>
          <StatIcon>
            <FaUserClock />
          </StatIcon>
          <StatInfo>
            <h3>{stats.pendingApprovals}</h3>
            <p>Pending Approvals</p>
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
              <small>{notification.timestamp}</small>
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
            <p>{activity.description}</p>
            <small>{activity.timestamp}</small>
          </ActivityItem>
        ))}
      </RecentActivityContainer>
    </DashboardContainer>
  );
};

export default AdminHome;
