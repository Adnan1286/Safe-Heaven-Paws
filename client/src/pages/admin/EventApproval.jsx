import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';


const EventApproval = () => {
  const [events, setEvents] = useState([]);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchEvents();
    fetchUserData();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/events/admin', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setEvents(response.data.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const fetchUserData = async () => {
    try {
      const res = await axios.post(
        'http://localhost:8080/api/v1/user/getUserData',
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (res.data.success) {
        setUserData(res.data.data);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.post(`http://localhost:8080/api/v1/events/approve/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      fetchEvents();
    } catch (error) {
      console.error('Error approving event:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.post(`http://localhost:8080/api/v1/events/reject/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      fetchEvents();
    } catch (error) {
      console.error('Error rejecting event:', error);
    }
  };

  return (
    <div style={styles.container}>
      <Navbar userName={userData?.name} userRole={userData?.role} />
      <main style={styles.main}>
        <h1 style={styles.title}>Event Approval Dashboard</h1>
        <div style={styles.eventsContainer}>
          {events.map((event) => (
            <div key={event._id} style={styles.event}>
              <h2 style={styles.eventTitle}>{event.title}</h2>
              <p>Date: {event.date}</p>
              <p>Location: {event.location}</p>
              <p>Description: {event.description}</p>
              <p>Status: <span style={getStatusStyle(event.status)}>{event.status}</span></p>
              <p>Posted by: {event.userId?.name || 'Unknown'}</p>
              {event.status === 'pending' && (
                <div style={styles.buttonContainer}>
                  <button
                    onClick={() => handleApprove(event._id)}
                    style={styles.approveButton}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(event._id)}
                    style={styles.rejectButton}
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

const getStatusStyle = (status) => {
  switch (status) {
    case 'approved':
      return { color: 'green' };
    case 'rejected':
      return { color: 'red' };
    default:
      return { color: 'orange' };
  }
};

const styles = {
  // ... (keep existing styles from Event.jsx)
  approveButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '8px',
  },
  rejectButton: {
    backgroundColor: '#f44336',
    color: 'white',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  buttonContainer: {
    display: 'flex',
    gap: '10px',
    marginTop: '10px',
  }
};

export default EventApproval; 