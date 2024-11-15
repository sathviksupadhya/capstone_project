import { useState, useEffect } from 'react';
import styled from 'styled-components';
import AdminNavBar from './AdminNavBar';
import { FaSearch, FaFilter, FaEdit, FaTrash, FaUserPlus, FaSortAmountDown, FaChartBar } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const PageContainer = styled.div`
  padding: 90px 50px 50px;
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
  background: white;
  border-radius: 8px;
  padding: 8px 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  width: 300px;

  input {
    border: none;
    outline: none;
    margin-left: 10px;
    width: 100%;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background: ${props => props.$variant === 'primary' ? '#4CAF50' : '#2196F3'};
  color: white;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${props => props.$variant === 'primary' ? '#45a049' : '#1976D2'};
  }
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 40px;
`;

const StatCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;

  h4 {
    color: #666;
    margin: 0 0 10px;
  }

  p {
    font-size: 24px;
    font-weight: bold;
    color: #4CAF50;
    margin: 0;
  }
`;

const TabContainer = styled.div`
  margin-bottom: 30px;
`;

const TabList = styled.div`
  display: flex;
  gap: 20px;
  border-bottom: 2px solid #eee;
  margin-bottom: 20px;
`;

const Tab = styled.button`
  padding: 10px 20px;
  border: none;
  background: none;
  cursor: pointer;
  color: ${props => props.$active ? '#4CAF50' : '#666'};
  border-bottom: 2px solid ${props => props.$active ? '#4CAF50' : 'transparent'};
  margin-bottom: -2px;
  transition: all 0.2s;

  &:hover {
    color: #4CAF50;
  }
`;

const UserGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
`;

const UserCard = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transition: transform 0.2s ease;
  position: relative;

  &:hover {
    transform: translateY(-5px);
  }
`;

const UserActions = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  display: flex;
  gap: 10px;
`;

const CardActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  transition: color 0.2s;

  &:hover {
    color: ${props => props.$delete ? '#ff4444' : '#4CAF50'};
  }
`;

const UserAvatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #f0f0f0;
  margin: 0 auto 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  color: #666;
`;

const UserInfo = styled.div`
  text-align: center;
`;

const UserName = styled.h3`
  margin: 0 0 10px;
  color: #333;
`;

const UserDetail = styled.p`
  margin: 5px 0;
  color: #666;
  font-size: 14px;
`;

const UserStatus = styled.span`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  background: ${props => props.$active ? '#e8f5e9' : '#ffebee'};
  color: ${props => props.$active ? '#4caf50' : '#f44336'};
  margin-top: 10px;
  display: inline-block;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    email: '',
    phone: ''
  });
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    newUsersThisMonth: 0,

  });

  useEffect(() => {

    const mockUsers = [
      {
        id: 1,
        name: 'Sathvik S Upadhya',
        email: 'sathvik.upadhya@example.com',
        phone: '+919448436216',
        status: 'active',
        role: 'Admin',
        
      },
      {
        id: 2,
        name: 'Rahul K',
        email: 'rahul.k@example.com', 
        phone: '+919448436217',
        status: 'inactive',
        role: 'User',
        
      },
      {
        id: 3,
        name: 'Arpan J',
        email: 'arpan.j@example.com',
        phone: '+919448436218', 
        status: 'active',
        role: 'User',
        
      },
      {
        id: 4,
        name: 'Mani K',
        email: 'mani.k@example.com',
        phone: '+919448436219',
        status: 'active',
        role: 'Moderator',
        
      },
      {
        id: 5,
        name: 'Pavan B',
        email: 'pavan.b@example.com',
        phone: '+919448436220',
        status: 'inactive',
        role: 'User',

      },
      
    ];
    
    setUsers(mockUsers);
    
    // Calculate stats
    setStats({
      totalUsers: mockUsers.length,
      activeUsers: mockUsers.filter(u => u.status === 'active').length,
      newUsersThisMonth: mockUsers.filter(u => new Date(u.joinDate).getMonth() === new Date().getMonth()).length,
      premiumUsers: mockUsers.filter(u => u.premium).length
    });
  }, []);

  useEffect(() => {
    let filtered = [...users];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply tab filter
    if (activeTab !== 'all') {
      filtered = filtered.filter(user => {
        if (activeTab === 'active') return user.status === 'active';
        if (activeTab === 'inactive') return user.status === 'inactive';
        if (activeTab === 'premium') return user.premium;
        return true;
      });
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'date') return new Date(b.joinDate) - new Date(a.joinDate);
      return 0;
    });
    
    setFilteredUsers(filtered);
  }, [searchTerm, users, activeTab, sortBy]);

  const handleEdit = (userId) => {
    // Implement edit functionality
    console.log('Edit user:', userId);
  };

  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const handleAddUser = () => {
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:9997/auth/register", {
        userName: newUser.username,
        password: newUser.password,
        email: newUser.email,
        phone: newUser.phone,
        role: "Resident",
      });
      
      toast.success("User registered successfully!");
      setShowModal(false);
      // Refresh users list
      // You would typically fetch the updated list from the server here
      
    } catch (err) {
      toast.error("Registration failed. Please try again.");
      console.error("Error during registration:", err);
    }
  };

  return (
    <>
      <AdminNavBar />
      <PageContainer>
        <StatsContainer>
          <StatCard>
            <h4>Total Users</h4>
            <p>{stats.totalUsers}</p>
          </StatCard>
          <StatCard>
            <h4>Active Users</h4>
            <p>{stats.activeUsers}</p>
          </StatCard>
          <StatCard>
            <h4>New UsersThis Month</h4>
            <p>{stats.newUsersThisMonth}</p>
          </StatCard>
         
        </StatsContainer>

        <ControlsContainer>
          <SearchBar>
            <FaSearch />
            <input 
              type="text" 
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchBar>
          <ButtonGroup>
            <ActionButton onClick={() => setSortBy(sortBy === 'name' ? 'date' : 'name')}>
              <FaSortAmountDown />
              Sort by {sortBy === 'name' ? 'Date' : 'Name'}
            </ActionButton>
            <ActionButton $variant="primary" onClick={handleAddUser}>
              <FaUserPlus />
              Add User
            </ActionButton>
          </ButtonGroup>
        </ControlsContainer>

        <TabContainer>
          <TabList>
            <Tab $active={activeTab === 'all'} onClick={() => setActiveTab('all')}>All Users</Tab>
            <Tab $active={activeTab === 'active'} onClick={() => setActiveTab('active')}>Active</Tab>
            <Tab $active={activeTab === 'inactive'} onClick={() => setActiveTab('inactive')}>Inactive</Tab>
            <Tab $active={activeTab === 'premium'} onClick={() => setActiveTab('premium')}>Premium</Tab>
          </TabList>
        </TabContainer>

        <UserGrid>
          {filteredUsers.map(user => (
            <UserCard key={user.id}>
              <UserActions>
                <CardActionButton onClick={() => handleEdit(user.id)}>
                  <FaEdit />
                </CardActionButton>
                <CardActionButton $delete onClick={() => handleDelete(user.id)}>
                  <FaTrash />
                </CardActionButton>
              </UserActions>
              <UserAvatar>
                {user.name.charAt(0)}
              </UserAvatar>
              <UserInfo>
                <UserName>{user.name}</UserName>
                <UserDetail>{user.email}</UserDetail>
                <UserDetail>{user.phone}</UserDetail>
                <UserDetail>Role: {user.role}</UserDetail>
                <UserDetail>Joined: {new Date(user.joinDate).toLocaleDateString()}</UserDetail>
                <UserStatus $active={user.status === 'active'}>
                  {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                </UserStatus>
                {user.premium && (
                  <UserStatus $active={true}>Premium</UserStatus>
                )}
              </UserInfo>
            </UserCard>
          ))}
        </UserGrid>

        {showModal && (
          <Modal>
            <FormCard>
              <h2>Add New User</h2>
              <Form onSubmit={handleSubmit}>
                <Input
                  type="text"
                  placeholder="Username"
                  value={newUser.username}
                  onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                  required
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                  required
                />
                <Input
                  type="email"
                  placeholder="Email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  required
                />
                <Input
                  type="tel"
                  placeholder="Phone"
                  value={newUser.phone}
                  onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                  required
                />
                <ButtonGroup>
                  <ActionButton type="submit" $variant="primary">
                    Register User
                  </ActionButton>
                  <ActionButton type="button" onClick={() => setShowModal(false)}>
                    Cancel
                  </ActionButton>
                </ButtonGroup>
              </Form>
            </FormCard>
          </Modal>
        )}
      </PageContainer>
      <ToastContainer />
    </>
  );
};

export default UserPage;
