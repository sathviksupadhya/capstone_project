import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaSearch, FaFilter, FaCalendarAlt, FaEdit, FaTrash, FaPlus, FaChartBar, FaSort, FaUsers, FaTag, FaClock, FaUserFriends, FaInfo } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FormContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const FormCard = styled.div`
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 30px;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: #000000;
  }
`;

const Select = styled.select`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: #000000;
  }
`;

const TextArea = styled.textarea`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  min-height: 120px;
  
  &:focus {
    outline: none;
    border-color: #000000;
  }
`;

const Button = styled.button`
  padding: 12px;
  background: #000000;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease;
  
  &:hover {
    background: #333333;
  }
`;

const PageContainer = styled.div`
  padding: 90px 50px 30px;
  background: ${props => props.$theme === 'dark' ? '#1a1a1a' : '#f5f5f5'};
  min-height: 100vh;
  color: ${props => props.$theme === 'dark' ? '#ffffff' : '#000000'};
`;

const ControlsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background: ${props => props.$theme === 'dark' ? '#333' : 'white'};
  border-radius: 8px;
  padding: 8px 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 300px;

  input {
    border: none;
    outline: none;
    margin-left: 10px;
    width: 100%;
    background: transparent;
    color: ${props => props.$theme === 'dark' ? '#fff' : '#333'};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background: ${props => props.$secondary ? '#6c757d' : '#4CAF50'};
  color: white;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${props => props.$secondary ? '#5a6268' : '#45a049'};
  }
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 30px;
`;

const StatCard = styled.div`
  background: ${props => props.$theme === 'dark' ? '#333' : 'white'};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;

  h4 {
    margin: 0;
    color: ${props => props.$theme === 'dark' ? '#fff' : '#333'};
  }

  p {
    font-size: 24px;
    margin: 10px 0;
    color: #4CAF50;
  }
`;

const EventsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
`;

const EventCard = styled.div`
  background: ${props => props.$theme === 'dark' ? '#333' : 'white'};
  border-radius: 10px;
  padding: 20px;
  position: relative;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const EventStatus = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 12px;
  background: ${props => {
    switch(props.$status) {
      case 'ongoing': return '#4CAF50';
      case 'upcoming': return '#2196F3';
      case 'past': return '#9e9e9e';
      default: return '#4CAF50';
    }
  }};
  color: white;
`;

const EventTitle = styled.h3`
  margin: 30px 0 15px;
  color: ${props => props.$theme === 'dark' ? '#fff' : '#333'};
`;

const EventDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  color: ${props => props.$theme === 'dark' ? '#ccc' : '#666'};
`;

const TagsContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 10px;
`;

const Tag = styled.span`
  padding: 5px 10px;
  background: ${props => props.$theme === 'dark' ? '#444' : '#e0e0e0'};
  border-radius: 15px;
  font-size: 12px;
  color: ${props => props.$theme === 'dark' ? '#fff' : '#333'};
  cursor: pointer;

  &:hover {
    background: #4CAF50;
    color: white;
  }
`;

const SectionTitle = styled.h2`
  color: ${props => props.$theme === 'dark' ? '#fff' : '#333'};
  margin: 30px 0 20px;
`;

const AdminEvents = () => {
  const navigate = useNavigate();
  const [theme] = useState('light');
  const [searchTerm, setSearchTerm] = useState('');
  const [showEventForm, setShowEventForm] = useState(false);
  const token = sessionStorage.getItem('jwtToken');
  const [events, setEvents] = useState({
    ongoing: [],
    upcoming: [],
    past: [],
    featured: []
  });
  const [stats, setStats] = useState({
    totalEvents: 0,
    activeEvents: 0,
    totalAttendees: 0
  });

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    imageUrl: '',
    eventType: 'Event'
  });

  useEffect(() => {
    // Fetch all events from backend
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:9997/event/getAllEvents', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const allEvents = response.data;

        // Categorize events based on date
        const now = new Date();
        const categorizedEvents = {
          ongoing: [],
          upcoming: [],
          past: [],
          featured: []
        };

        allEvents.forEach(event => {
          const eventDate = new Date(event.eventDate);
          if (eventDate < now) {
            categorizedEvents.past.push(event);
          } else if (eventDate.toDateString() === now.toDateString()) {
            categorizedEvents.ongoing.push(event);
          } else {
            categorizedEvents.upcoming.push(event);
          }
        });

        setEvents(categorizedEvents);
        setStats({
          totalEvents: allEvents.length,
          activeEvents: categorizedEvents.ongoing.length + categorizedEvents.upcoming.length,
          totalAttendees: 0
        });
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleCreateEvent = () => {
    setShowEventForm(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const localDateTime = new Date(formData.date).toISOString();

    try {
      const token = sessionStorage.getItem('jwtToken');
      const userId = sessionStorage.getItem('userId');
      const headers = { Authorization: token };

      const response = await axios.post('http://localhost:9997/event/add',
        {
          eventTitle: formData.title,
          eventDescription: formData.description,
          eventDate: localDateTime,
          eventType: formData.eventType,
          eventImg: formData.imageUrl,
          userId: userId
        },
        { headers }
      );

      setShowEventForm(false);
      window.location.reload();
    } catch(error) {
      console.error('Error creating event:', error);
    }
  };

  const handleAnalytics = () => {
    navigate('/admin/analytics');
  };

  const renderEventCard = (event) => (
    <EventCard key={event.eventId} $theme={theme}>
      <EventStatus $status={event.status}>
        {event.status ? event.status.charAt(0).toUpperCase() + event.status.slice(1) : 'Upcoming'}
      </EventStatus>
      <EventTitle $theme={theme}>{event.eventTitle}</EventTitle>
      <EventDetail $theme={theme}>
        <FaCalendarAlt /> {new Date(event.eventDate).toLocaleDateString()}
      </EventDetail>
      <EventDetail $theme={theme}>
        <FaClock /> {new Date(event.eventDate).toLocaleTimeString()}
      </EventDetail>
      <EventDetail $theme={theme}>
        <FaInfo /> {event.eventDescription}
      </EventDetail>
      <TagsContainer>
        {event.tags && event.tags.map(tag => (
          <Tag key={tag} $theme={theme}>#{tag}</Tag>
        ))}
      </TagsContainer>
    </EventCard>
  );

  return (
    <PageContainer $theme={theme}>
      {showEventForm && (
        <FormContainer>
          <FormCard>
            <Title>Create Event</Title>
            <Form onSubmit={handleSubmit}>
              <Input
                type="text"
                placeholder="Event Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />

              <TextArea
                placeholder="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />

              <Input
                type="datetime-local"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />

              <Select
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                required
              >
                <option value="Event">Event</option>
                <option value="Emergency Message">Emergency Message</option>
              </Select>

              <Input
                type="url"
                placeholder="Image URL"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
              />

              <Button type="submit">Create Event</Button>
              <Button type="button" onClick={() => setShowEventForm(false)} style={{background: '#6c757d'}}>
                Cancel
              </Button>
            </Form>
          </FormCard>
        </FormContainer>
      )}

      <StatsContainer>
        <StatCard $theme={theme}>
          <h4>Total Events</h4>
          <p>{stats.totalEvents}</p>
        </StatCard>
        <StatCard $theme={theme}>
          <h4>Active Events</h4>
          <p>{stats.activeEvents}</p>
        </StatCard>
      </StatsContainer>

      <ControlsContainer>
        <SearchBar $theme={theme}>
          <FaSearch />
          <input 
            type="text" 
            placeholder="Search events..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchBar>
        <ButtonGroup>
          <ActionButton onClick={handleCreateEvent}>
            <FaPlus /> Create Event
          </ActionButton>
          <ActionButton $secondary onClick={handleAnalytics}>
            <FaChartBar /> Analytics
          </ActionButton>
        </ButtonGroup>
      </ControlsContainer>

      <SectionTitle $theme={theme}>Upcoming Events</SectionTitle>
      <EventsGrid>
        {events.upcoming.map(renderEventCard)}
      </EventsGrid>

      <SectionTitle $theme={theme}>Past Events</SectionTitle>
      <EventsGrid>
        {events.past.map(renderEventCard)}
      </EventsGrid>
    </PageContainer>
  );
};

export default AdminEvents;
