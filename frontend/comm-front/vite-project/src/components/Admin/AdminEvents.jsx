import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaSearch, FaFilter, FaCalendarAlt, FaEdit, FaTrash, FaDownload, FaPlus, FaChartBar, FaSort, FaMapMarkerAlt, FaUsers, FaTag, FaClock, FaUserFriends } from 'react-icons/fa';
import { motion } from 'framer-motion';

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

const StyledForm = styled.form`
  background: ${props => props.$theme === 'dark' ? '#333' : 'white'};
  padding: 2rem;
  border-radius: 10px;
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: ${props => props.$theme === 'dark' ? '#ffffff' : '#000000'};
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 1rem;
  background: ${props => props.$theme === 'dark' ? '#2d2d2d' : 'white'};
  color: ${props => props.$theme === 'dark' ? '#ffffff' : '#000000'};
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 1rem;
  min-height: 120px;
  background: ${props => props.$theme === 'dark' ? '#2d2d2d' : 'white'};
  color: ${props => props.$theme === 'dark' ? '#ffffff' : '#000000'};
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
  grid-template-columns: repeat(4, 1fr);
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

const FilterSection = styled.div`
  background: ${props => props.$theme === 'dark' ? '#333' : 'white'};
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 30px;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;

const FilterSelect = styled.select`
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ddd;
  background: ${props => props.$theme === 'dark' ? '#444' : 'white'};
  color: ${props => props.$theme === 'dark' ? '#fff' : '#333'};
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

const EventActions = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 5px;
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

const EventStats = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid ${props => props.$theme === 'dark' ? '#444' : '#eee'};
`;

const SectionTitle = styled.h2`
  color: ${props => props.$theme === 'dark' ? '#fff' : '#333'};
  margin: 30px 0 20px;
`;

const AdminEvents = () => {
  const [theme] = useState('light');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [showEventForm, setShowEventForm] = useState(false);
  const [events, setEvents] = useState({
    ongoing: [],
    upcoming: [],
    past: [],
    featured: []
  });
  const [stats, setStats] = useState({
    totalEvents: 0,
    activeEvents: 0,
    totalAttendees: 0,
    revenue: 0
  });

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: '',
    maxCapacity: '',
    organizer: '',
    tags: ''
  });

  useEffect(() => {
    // Mock data - replace with actual API calls
    setEvents({
      ongoing: [
        {
          id: 1,
          title: "Summer Music Festival",
          date: "2024-07-15",
          time: "2:00 PM - 10:00 PM",
          location: "Central Park",
          attendees: 156,
          maxCapacity: 200,
          status: 'ongoing',
          category: 'Music',
          organizer: "Music Events Inc",
          tags: ['music', 'outdoor', 'summer']
        }
      ],
      upcoming: [
        {
          id: 2,
          title: "Tech Conference 2024",
          date: "2024-08-20",
          time: "9:00 AM - 6:00 PM",
          location: "Convention Center",
          attendees: 89,
          maxCapacity: 150,
          status: 'upcoming',
          category: 'Technology',
          organizer: "TechCon Events",
          tags: ['tech', 'business', 'networking']
        }
      ],
      past: [
        {
          id: 3,
          title: "Food & Wine Expo",
          date: "2024-06-05",
          time: "11:00 AM - 8:00 PM",
          location: "City Hall",
          attendees: 234,
          maxCapacity: 300,
          status: 'past',
          category: 'Food',
          organizer: "Culinary Arts Society",
          tags: ['food', 'wine', 'tasting']
        }
      ],
      featured: [
        {
          id: 4,
          title: "New Year's Eve Gala",
          date: "2024-12-31",
          time: "8:00 PM - 1:00 AM",
          location: "Grand Hotel",
          attendees: 500,
          maxCapacity: 600,
          status: 'upcoming',
          category: 'Entertainment',
          organizer: "City Events Committee",
          tags: ['gala', 'celebration', 'formal']
        }
      ]
    });

    setStats({
      totalEvents: 45,
      activeEvents: 12,
      totalAttendees: 3456,
      revenue: 156789
    });
  }, []);

  const handleExport = () => {
    // Implement CSV export logic
    console.log('Exporting events data...');
  };

  const handleCreateEvent = () => {
    setShowEventForm(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
    setShowEventForm(false);
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      category: '',
      maxCapacity: '',
      organizer: '',
      tags: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const renderEventCard = (event) => (
    <EventCard key={event.id} $theme={theme}>
      <EventStatus $status={event.status}>
        {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
      </EventStatus>
      <EventActions>
        <ActionButton $theme={theme}><FaEdit /></ActionButton>
        <ActionButton $theme={theme} $delete><FaTrash /></ActionButton>
      </EventActions>
      <EventTitle $theme={theme}>{event.title}</EventTitle>
      <EventDetail $theme={theme}>
        <FaCalendarAlt /> {event.date}
      </EventDetail>
      <EventDetail $theme={theme}>
        <FaClock /> {event.time}
      </EventDetail>
      <EventDetail $theme={theme}>
        <FaMapMarkerAlt /> {event.location}
      </EventDetail>
      <EventDetail $theme={theme}>
        <FaTag /> {event.category}
      </EventDetail>
      <EventDetail $theme={theme}>
        <FaUserFriends /> {event.organizer}
      </EventDetail>
      <TagsContainer>
        {event.tags.map(tag => (
          <Tag key={tag} $theme={theme}>#{tag}</Tag>
        ))}
      </TagsContainer>
      <EventStats $theme={theme}>
        <EventDetail $theme={theme}>
          <FaUsers /> {event.attendees}/{event.maxCapacity}
        </EventDetail>
      </EventStats>
    </EventCard>
  );

  return (
    <PageContainer $theme={theme}>
      {showEventForm && (
        <FormContainer>
          <StyledForm onSubmit={handleFormSubmit}>
            <FormGroup>
              <Label htmlFor="title">Event Title</Label>
              <Input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="description">Description</Label>
              <TextArea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="date">Date</Label>
              <Input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="time">Time</Label>
              <Input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="location">Location</Label>
              <Input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="category">Category</Label>
              <Input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="maxCapacity">Maximum Capacity</Label>
              <Input
                type="number"
                id="maxCapacity"
                name="maxCapacity"
                value={formData.maxCapacity}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="organizer">Organizer</Label>
              <Input
                type="text"
                id="organizer"
                name="organizer"
                value={formData.organizer}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="music, outdoor, summer"
              />
            </FormGroup>

            <ButtonGroup>
              <ActionButton type="submit">Create Event</ActionButton>
              <ActionButton type="button" $secondary onClick={() => setShowEventForm(false)}>
                Cancel
              </ActionButton>
            </ButtonGroup>
          </StyledForm>
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
        <StatCard $theme={theme}>
          <h4>Total Attendees</h4>
          <p>{stats.totalAttendees}</p>
        </StatCard>
        <StatCard $theme={theme}>
          <h4>Revenue</h4>
          <p>${stats.revenue.toLocaleString()}</p>
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
          <ActionButton onClick={() => setFilterVisible(!filterVisible)}>
            <FaFilter /> Filter
          </ActionButton>
          <ActionButton onClick={handleCreateEvent}>
            <FaPlus /> Create Event
          </ActionButton>
          <ActionButton $secondary onClick={handleExport}>
            <FaDownload /> Export
          </ActionButton>
          <ActionButton $secondary>
            <FaChartBar /> Analytics
          </ActionButton>
        </ButtonGroup>
      </ControlsContainer>

      {filterVisible && (
        <FilterSection $theme={theme}>
          <FilterSelect 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            $theme={theme}
          >
            <option value="all">All Categories</option>
            <option value="music">Music</option>
            <option value="technology">Technology</option>
            <option value="food">Food & Drink</option>
            <option value="business">Business</option>
          </FilterSelect>
          <FilterSelect 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            $theme={theme}
          >
            <option value="date">Sort by Date</option>
            <option value="attendees">Sort by Attendees</option>
            <option value="category">Sort by Category</option>
          </FilterSelect>
        </FilterSection>
      )}

      <SectionTitle $theme={theme}>Featured Events</SectionTitle>
      <EventsGrid>
        {events.featured.map(renderEventCard)}
      </EventsGrid>

      <SectionTitle $theme={theme}>Ongoing Events</SectionTitle>
      <EventsGrid>
        {events.ongoing.map(renderEventCard)}
      </EventsGrid>

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
