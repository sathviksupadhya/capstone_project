import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaChartLine, FaUsers, FaCalendarAlt, FaChartBar, FaFilter, FaUserClock, FaComments, FaCommentDots } from 'react-icons/fa';

const PageContainer = styled.div`
  padding: 90px 50px 30px;
  background: ${props => props.$theme === 'dark' ? '#1a1a1a' : '#f5f5f5'};
  min-height: 100vh;
  color: ${props => props.$theme === 'dark' ? '#ffffff' : '#000000'};
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 40px;
`;

const StatCard = styled.div`
  background: ${props => props.$theme === 'dark' ? '#333' : '#ffffff'};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  h4 {
    color: ${props => props.$theme === 'dark' ? '#ccc' : '#666'};
    margin: 0 0 10px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  p {
    font-size: 24px;
    font-weight: bold;
    color: #4CAF50;
    margin: 0;
  }
`;

const ChartSection = styled.div`
  background: ${props => props.$theme === 'dark' ? '#333' : '#ffffff'};
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const ControlsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
`;

const Select = styled.select`
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ddd;
  background: ${props => props.$theme === 'dark' ? '#444' : '#fff'};
  color: ${props => props.$theme === 'dark' ? '#fff' : '#333'};
`;

const TabContainer = styled.div`
  margin-bottom: 30px;
`;

const TabList = styled.div`
  display: flex;
  gap: 20px;
  border-bottom: 2px solid ${props => props.$theme === 'dark' ? '#444' : '#eee'};
  margin-bottom: 20px;
`;

const Tab = styled.button`
  padding: 10px 20px;
  border: none;
  background: none;
  cursor: pointer;
  color: ${props => props.$active ? '#4CAF50' : props.$theme === 'dark' ? '#ccc' : '#666'};
  border-bottom: 2px solid ${props => props.$active ? '#4CAF50' : 'transparent'};
  margin-bottom: -2px;
  transition: all 0.2s;

  &:hover {
    color: #4CAF50;
  }
`;

const DataGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

function AdminAnalytics() {
  const [theme] = useState('light');
  const [timeRange, setTimeRange] = useState('week');
  const [chartType, setChartType] = useState('line');
  const [activeTab, setActiveTab] = useState('overview');

  const stats = {
    totalUsers: 1250,
    activeEvents: 45,
    revenue: 25000,
    pendingUsers: 850,
    totalComments: 3200,
    averageAttendance: 35,
    totalFeedbacks: 450
  };

  return (
    <PageContainer $theme={theme}>
      <StatsContainer>
        <StatCard $theme={theme}>
          <h4><FaUsers /> Total Users</h4>
          <p>{stats.totalUsers}</p>
        </StatCard>
        <StatCard $theme={theme}>
          <h4><FaCalendarAlt /> Active Events</h4>
          <p>{stats.activeEvents}</p>
        </StatCard>
        <StatCard $theme={theme}>
          <h4><FaUserClock /> Pending Users</h4>
          <p>{stats.pendingUsers}</p>
        </StatCard>
      </StatsContainer>

      <ControlsContainer>
        <FilterContainer>
          <Select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            $theme={theme}
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="quarter">Last Quarter</option>
            <option value="year">Last Year</option>
          </Select>
          <Select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            $theme={theme}
          >
            <option value="line">Line Chart</option>
            <option value="bar">Bar Chart</option>
            <option value="pie">Pie Chart</option>
          </Select>
        </FilterContainer>
      </ControlsContainer>

      <TabContainer>
        <TabList $theme={theme}>
          <Tab $active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} $theme={theme}>Overview</Tab>
          <Tab $active={activeTab === 'users'} onClick={() => setActiveTab('users')} $theme={theme}>User Analytics</Tab>
          <Tab $active={activeTab === 'events'} onClick={() => setActiveTab('events')} $theme={theme}>Event Analytics</Tab>
        </TabList>
      </TabContainer>

      <ChartSection $theme={theme}>
        <h3>User Activity Trends</h3>
      
      </ChartSection>

      <ChartSection $theme={theme}>
        <h3>Event Performance</h3>
        
      </ChartSection>

      <DataGrid>
        <StatCard $theme={theme}>
          <h4><FaComments /> Total Comments</h4>
          <p>{stats.totalComments}</p>
        </StatCard>
        <StatCard $theme={theme}>
          <h4><FaUsers /> Avg. Attendance</h4>
          <p>{stats.averageAttendance}</p>
        </StatCard>
        <StatCard $theme={theme}>
          <h4><FaCommentDots /> Total Feedbacks</h4>
          <p>{stats.totalFeedbacks}</p>
        </StatCard>
      </DataGrid>
    </PageContainer>
  );
}

export default AdminAnalytics;
