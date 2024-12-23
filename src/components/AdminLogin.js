import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [profileData, setProfileData] = useState(null);
  const [isDataLoaded, setIsDataLoaded] = useState(true);
  console.log('isDataLoaded ------------', isDataLoaded);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', formData);
      localStorage.setItem('token', res.data.token);
      toast.success('Logged in successfully'); 
     

      const profileRes = await axios.get('http://localhost:5000/api/users/profile', {
        headers: {
          Authorization: `Bearer ${res.data.token}`, 
        },
      });
      setProfileData(profileRes.data); 
      setIsDataLoaded(false);

    } catch (err) {
      toast.error(err.response.data.error); 
    }
  };

  return (
    <>
    <div>
      {isDataLoaded && (
        <form onSubmit={handleSubmit}>
        <h1>Admin Login</h1>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <button type="submit">Login</button>
      </form>
      )}
      <ToastContainer /> 
    </div>
    {profileData && profileData.user &&  (
  <div>
    <h2 style={{ textAlign: 'center' }}>Profile Information</h2>
    <table border="1" style={{ margin: '10px auto', padding: '10px', borderCollapse: 'collapse',  width: '90%'}}>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{profileData.user.firstName}</td>
          <td>{profileData.user.lastName}</td>
          <td>{profileData.user.email}</td>
        </tr>
      </tbody>
    </table>
  </div>
)}

    </>
  );
};

export default AdminLogin;
