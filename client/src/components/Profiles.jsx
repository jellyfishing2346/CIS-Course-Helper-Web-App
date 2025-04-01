// src/components/Profiles.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profiles = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user profile data when the component mounts
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/profiles') // This endpoint should return the user's profile info
      .then((response) => {
        setProfile(response.data); // Set the profile data from the response
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((err) => {
        setError('Error fetching profile data');
        setLoading(false); // Set loading to false if there's an error
      });
  }, []);

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      {profile ? (
        <div className="profile-details">
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <h3>Enrolled Courses:</h3>
          <ul>
            {profile.courses.map((course, index) => (
              <li key={index}>{course.name}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No profile data available</p>
      )}
    </div>
  );
};

export default Profiles;
