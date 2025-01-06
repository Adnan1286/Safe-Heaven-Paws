import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const Settings = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/v1/user/getUserData", {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      
      if (res.data.success) {
        setUserData(res.data.data);
        setFormData(prevState => ({
          ...prevState,
          name: res.data.data.name,
          email: res.data.data.email
        }));
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      localStorage.clear();
      navigate("/login");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      setMessage({ text: 'New passwords do not match', type: 'error' });
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('http://localhost:8080/api/v1/user/update-profile', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setMessage({ text: 'Profile updated successfully', type: 'success' });
        // Refresh user data after successful update
        getUserData();
      }
    } catch (error) {
      setMessage({ 
        text: error.response?.data?.message || 'Error updating profile', 
        type: 'error' 
      });
    }
  };



  return (
    <div style={styles.pageContainer}>
      <Navbar 
       userName={userData?.name} 
       onLogout={handleLogout}
       userRole={userData?.role}
      />
      <div style={styles.mainContent}>
        <div style={styles.container}>
          <h2>Settings</h2>
          
          {message.text && (
            <div style={{
              ...styles.message,
              ...(message.type === 'success' ? styles.success : styles.error)
            }}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label>Username</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label>Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label>New Password</label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label>Confirm New Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            <button type="submit" style={styles.button}>
              Update Profile
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const styles = {
    pageContainer: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    },
    mainContent: {
      flex: 1,
      backgroundColor: '#ffc0cb',
      paddingTop: '1px'
    },
    container: {
      maxWidth: '600px',
      margin: '2rem auto',
      padding: '2rem',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    },
    input: {
      padding: '0.5rem',
      borderRadius: '4px',
      border: '1px solid #ccc'
    },
    button: {
      padding: '0.5rem 1rem',
      backgroundColor: '#eb6a80',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer'
    },
    message: {
      padding: '1rem',
      borderRadius: '4px',
      marginBottom: '1rem'
    },
    success: {
      backgroundColor: '#d4edda',
      color: '#155724'
    },
    error: {
      backgroundColor: '#f8d7da',
      color: '#721c24'
    }
  };

export default Settings; 