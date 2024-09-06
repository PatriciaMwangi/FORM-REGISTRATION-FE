import React, { useState } from 'react';
import axios from 'axios';
import './user.css'; // Assuming you create a separate CSS file for styling

const User = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [identity, setIdentity] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [message, setMessage] = useState('');

  const handleProfileChange = (e) => {
    setProfilePhoto(e.target.files[0]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    const fields = {
      name: name,
      phone_number: phoneNumber,
      identity: identity,
    };

    Object.keys(fields).forEach((key) => formData.append(key, fields[key]));

    if (profilePhoto) {
      formData.append('profile_photo', profilePhoto);
    }

    try {
      const response = await axios.post('https://form-registration-be-1.onrender.com/home', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.message);
      setName('')
      setPhoneNumber('')
      setIdentity('')
      setProfilePhoto(null)
    } catch (error) {
      setMessage('Error submitting user');
      console.log('Error', error);
    }
  };

  return (
    <div className="user-form-container min-h-screen bg-gradient-to-b from-purple-400 to-purple-600 text-white p-8">
      <h2 className="text-3xl font-bold text-center mb-8">New User</h2>
      <form onSubmit={handleFormSubmit} className="bg-white text-purple-600 rounded-lg shadow-lg p-6">
        <div className="form-group mb-4">
          <label className="text-lg font-semibold block mb-2">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input-field w-full p-2 rounded-lg border border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
        <div className="form-group mb-4">
          <label className="text-lg font-semibold block mb-2">Phone Number:</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            className="input-field w-full p-2 rounded-lg border border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
        <div className="form-group mb-4">
          <label className="text-lg font-semibold block mb-2">ID:</label>
          <input
            type="text"
            value={identity}
            onChange={(e) => setIdentity(e.target.value)}
            required
            className="input-field w-full p-2 rounded-lg border border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
        <div className="form-group mb-4">
          <label className="text-lg font-semibold block mb-2">Profile Photo:</label>
          <input
            type="file"
            onChange={handleProfileChange}
            required
            className="file-input w-full p-2 text-purple-600"
          />
        </div>
        <button
          type="submit"
          className="submit-button bg-purple-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-purple-700 transition duration-300 w-full"
        >
          Create User
        </button>
      </form>
      {message && <p className="text-center mt-4">{message}</p>}
    </div>
  );
};

export default User;
