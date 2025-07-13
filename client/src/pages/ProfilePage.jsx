import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const ProfilePage = () => {
  const { user, loading, updateProfile } = useAuth();

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>;
  }

  if (!user) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h2>Please log in to view your profile</h2>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
      <h1>Your Profile</h1>
      <div style={{ backgroundColor: '#f8f9fa', padding: '1.5rem', borderRadius: '8px' }}>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Major:</strong> {user.major}</p>
        <p><strong>Current Semester:</strong> {user.currentSemester}</p>
        <p><strong>GPA:</strong> {user.gpa}</p>
        <p><strong>Completed Courses:</strong> {user.completedCourses.length}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
