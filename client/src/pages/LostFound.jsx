import Navbar from '../components/Navbar';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LostFound = () => {

const navigate = useNavigate();
const [userData, setUserData] = useState(null);

  const getUserData = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/v1/user/getUserData", {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      
      if (res.data.success) {
        setUserData(res.data.data);
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
  
    useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      getUserData();
    }
  }, []);

    return (
    <>
    <div>
      <Navbar userName={userData?.name} 
        onLogout={handleLogout}
        userRole={userData?.role}/>
        
      <h1 style={{ textAlign: 'center', marginTop: '2rem' }}>Welcome to Lost and Found {userData?.name} </h1>
    </div>
    </>
  );
};

export default LostFound; 