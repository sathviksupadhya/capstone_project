<<<<<<< HEAD
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaChartLine, FaUsers, FaCalendarAlt, FaChartBar, FaFilter, FaUserClock, FaComments, FaCommentDots } from 'react-icons/fa';
import axios from 'axios';
import AdminNavBar from './AdminNavBar';
import { Line, Bar, Pie } from 'react-chartjs-2';
=======
import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import {
  FaChartLine,
  FaUsers,
  FaCalendarAlt,
  FaChartBar,
  FaFilter,
  FaUserClock,
  FaComments,
  FaCommentDots,
} from "react-icons/fa";
import axios from "axios";
import AdminNavBar from "./AdminNavbar";
import { Line, Bar, Pie, Doughnut } from "react-chartjs-2";
>>>>>>> e66a5f468486238febd2d4ed924845bb84db0725
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const PageContainer = styled.div`
  padding: 90px 50px 30px;
  background: ${(props) => (props.$theme === "dark" ? "#1a1a1a" : "#f5f5f5")};
  min-height: 100vh;
  color: ${(props) => (props.$theme === "dark" ? "#ffffff" : "#000000")};
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 40px;
  animation: ${fadeIn} 0.6s ease-out;
`;

const StatCard = styled.div`
  background: ${(props) => (props.$theme === "dark" ? "#333" : "#ffffff")};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-left: 5px solid #1a237e;

  h4 {
    color: #1a237e;
    margin: 0 0 10px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 1.2rem;
  }

  p {
    font-size: 28px;
    font-weight: bold;
    color: #1a237e;
    margin: 0;
  }
`;

const ChartSection = styled.div`
  background: ${(props) => (props.$theme === "dark" ? "#333" : "#ffffff")};
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-left: 5px solid #1a237e;

  h3 {
    color: #1a237e;
    margin-bottom: 20px;
    font-size: 1.5rem;
  }

  canvas {
    max-height: 400px;
  }
`;

const ChartContainer = styled.div`
  height: 300px;
  margin: 20px 0;
`;

const TabContainer = styled.div`
  margin-bottom: 30px;
  background: #ffffff;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
`;

const TabList = styled.div`
  display: flex;
  gap: 20px;
  border-bottom: 2px solid #eef2f7;
`;

const Tab = styled.button`
  padding: 12px 24px;
  border: none;
  background: none;
  cursor: pointer;
  color: ${(props) => (props.$active ? "#1a237e" : "#1a237e")};
  border-bottom: 2px solid
    ${(props) => (props.$active ? "#1a237e" : "transparent")};
  margin-bottom: -2px;
  transition: all 0.3s ease;
  font-weight: 500;
  font-size: 1.1rem;

  &:hover {
    color: #1a237e;
  }
`;

const ChartRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 30px;
`;

const DataInsight = styled.div`
  margin-top: 15px;
  padding: 15px;
  background: ${(props) => (props.$theme === "dark" ? "#444" : "#f8f9fa")};
  border-radius: 8px;
  font-size: 1.1rem;
  line-height: 1.5;
  color: #1a237e;
`;

function AdminAnalytics() {
  const [theme] = useState("light");
  const [timeRange, setTimeRange] = useState("week");
  const [chartType, setChartType] = useState("line");
  const [activeTab, setActiveTab] = useState("overview");
  const token = sessionStorage.getItem("jwtToken");
  const [stats, setStats] = useState({
    totalResidents: 0,
    activeResidents: 0,
    pendingResidents: 0,
    rejectedResidents: 0,
    totalEvents: 0,
    upcomingEvents: 0,
    pastEvents: 0,
    totalFeedbacks: 0,
  });

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const residentsResponse = await axios.get(
          "http://localhost:9997/api/residents/all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );        
        const totalResidents = residentsResponse.data.length;
        const activeResidents = residentsResponse.data.filter(
          (resident) => resident.status === "APPROVED"
        ).length;
        const pendingResidents = residentsResponse.data.filter(
          (resident) => resident.status === "PENDING"
        ).length;
        const rejectedResidents = residentsResponse.data.filter(
          (resident) => resident.status === "REJECTED"
        ).length;

        const eventsResponse = await axios.get(
          "http://localhost:9997/event/getAllEvents",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const currentDate = new Date();
        const totalEvents = eventsResponse.data.length;
        const upcomingEvents = eventsResponse.data.filter(
          (event) => new Date(event.eventDate) > currentDate
        ).length;
        const pastEvents = eventsResponse.data.filter(
          (event) => new Date(event.eventDate) <= currentDate
        ).length;

        setStats({
          totalResidents,
          activeResidents,
          pendingResidents,
          rejectedResidents,
          totalEvents,
          upcomingEvents,
          pastEvents,
          totalFeedbacks: 0,
        });
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      }
    };

    fetchAnalyticsData();
  }, [token]);

  const userActivityData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Active Users",
        data: [
          stats.activeResidents,
          stats.activeResidents + 5,
          stats.activeResidents + 3,
          stats.activeResidents + 8,
          stats.activeResidents + 2,
          stats.activeResidents,
        ],
        borderColor: "#1a237e",
        backgroundColor: "rgba(26, 35, 126, 0.1)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Events",
        data: [2, 4, 3, 6, 4, 5],
        borderColor: "#e53935",
        backgroundColor: "rgba(229, 57, 53, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const eventPerformanceData = {
    labels: ["Completed", "Upcoming"],
    datasets: [
      {
        data: [stats.pastEvents, stats.upcomingEvents],
        backgroundColor: [
          "rgba(255, 0, 0, 0.8)", // Red color for completed events
          "rgba(26, 35, 126, 0.8)", // Blue color for upcoming events
        ],
        borderWidth: 2,
        borderColor: "#ffffff",
      },
    ],
  };

  const userTypeData = {
    labels: ["Approved Users", "Pending Users", "Rejected Users"],
    datasets: [
      {
        data: [
          stats.activeResidents,
          stats.pendingResidents,
          stats.rejectedResidents,
        ],
        backgroundColor: [
          "rgba(26, 35, 126, 0.8)", // Dark blue for approved
          "rgba(255, 193, 7, 0.8)", // Amber for pending
          "rgba(244, 67, 54, 0.8)", // Red for rejected
        ],
        borderWidth: 2,
        borderColor: "#ffffff",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
      animation: {
        duration: 2000,
        easing: "easeInOutQuart",
      },
    },
  };

  return (
    <>
      <AdminNavBar />
      <PageContainer $theme={theme}>
        <StatsContainer>
          <StatCard $theme={theme}>
            <h4>
              <FaUsers /> Total Residents
            </h4>
            <p>{stats.totalResidents}</p>
          </StatCard>
          <StatCard $theme={theme}>
            <h4>
              <FaUserClock /> Active Residents
            </h4>
            <p>{stats.activeResidents}</p>
          </StatCard>
          <StatCard $theme={theme}>
            <h4>
              <FaCalendarAlt /> Total Events
            </h4>
            <p>{stats.totalEvents}</p>
          </StatCard>
          <StatCard $theme={theme}>
            <h4>
              <FaChartLine /> Approval Rate
            </h4>
            <p>
              {stats.totalResidents
                ? Math.round(
                    (stats.activeResidents / stats.totalResidents) * 100
                  )
                : 0}
              %
            </p>
          </StatCard>
        </StatsContainer>

        <TabContainer>
          <TabList>
            <Tab
              $active={activeTab === "overview"}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </Tab>
            <Tab
              $active={activeTab === "users"}
              onClick={() => setActiveTab("users")}
            >
              User Analytics
            </Tab>
            <Tab
              $active={activeTab === "events"}
              onClick={() => setActiveTab("events")}
            >
              Event Analytics
            </Tab>
          </TabList>
        </TabContainer>

        {activeTab === "overview" && (
          <>
            <ChartSection $theme={theme}>
              <h3>User Activity Trends</h3>
              <ChartContainer>
                <Line data={userActivityData} options={options} />
              </ChartContainer>
              <DataInsight $theme={theme}>
                The graph shows a steady increase in active users over the past
                6 months, with peak activity in April. This indicates a growing
                community engagement trend.
              </DataInsight>
            </ChartSection>

            <ChartRow>
              <ChartSection $theme={theme}>
                <h3>Event Distribution</h3>
                <ChartContainer>
                  <Pie data={eventPerformanceData} options={options} />
                </ChartContainer>
                <DataInsight $theme={theme}>
                  Currently showing {stats.pastEvents} completed events and{" "}
                  {stats.upcomingEvents} upcoming events.
                  {stats.pastEvents > stats.upcomingEvents
                    ? " There's room to schedule more future events."
                    : " Good balance of upcoming events maintained."}
                </DataInsight>
              </ChartSection>

              <ChartSection $theme={theme}>
                <h3>User Status Distribution</h3>
                <ChartContainer>
                  <Doughnut data={userTypeData} options={options} />
                </ChartContainer>
                <DataInsight $theme={theme}>
                  Approved users: {stats.activeResidents}, Pending users:{" "}
                  {stats.pendingResidents}, Rejected users:{" "}
                  {stats.rejectedResidents}. Total approval rate is
                  {stats.totalResidents
                    ? Math.round(
                        (stats.activeResidents / stats.totalResidents) * 100
                      )
                    : 0}
                  %.
                </DataInsight>
              </ChartSection>
            </ChartRow>
          </>
        )}

        {activeTab === "users" && (
          <ChartSection $theme={theme}>
            <h3>User Status Distribution</h3>
            <ChartContainer>
              <Doughnut
                data={userTypeData}
                options={{
                  ...options,
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </ChartContainer>
          </ChartSection>
        )}

        {activeTab === "events" && (
          <ChartSection $theme={theme}>
            <h3>Event Status Distribution</h3>
            <ChartContainer>
              <Pie data={eventPerformanceData} options={options} />
            </ChartContainer>
          </ChartSection>
        )}
      </PageContainer>
    </>
  );
}

export default AdminAnalytics;
