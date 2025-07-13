import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext.jsx';

const API_BASE_URL = 'http://localhost:3001';

const Profiles = () => {
    const { user, token, logout } = useAuth();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState(null);
    const [uploadSuccess, setUploadSuccess] = useState(false);

    const [newCourse, setNewCourse] = useState('');
    const [newSemester, setNewSemester] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const [editedCourse, setEditedCourse] = useState('');
    const [editedSemester, setEditedSemester] = useState('');

    const getCourses = () => {
        return profile?.courses || [];
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                if (!token) {
                    setError('User not authenticated. Please log in.');
                    setLoading(false);
                    return;
                }

                const response = await axios.get(`${API_BASE_URL}/api/profiles`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setProfile(response.data);
                console.log("Initial Courses Array:", response.data.courses); // Add this line
            } catch (err) {
                console.error('Error fetching profile data:', err.response || err);
                if (err.response?.status === 401 || err.response?.status === 403) {
                    setError('Authentication failed. Please log in again.');
                    logout();
                } else {
                    setError('Error fetching profile data. Please try again later.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [token, logout]);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setUploadError(null);
        setUploadSuccess(false);
    };

    const handleFileUpload = async () => {
        if (!selectedFile || !token) {
            setUploadError('Please select a file and ensure you are logged in.');
            return;
        }

        setUploading(true);
        const formData = new FormData();
        formData.append('profilePicture', selectedFile);

        try {
            const response = await axios.post(`${API_BASE_URL}/api/profiles/upload-picture`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            });

            setProfile(prev => ({ ...prev, avatarUrl: response.data.avatarUrl }));
            setUploadSuccess(true);
            setSelectedFile(null);
        } catch (err) {
            setUploadError(err.response?.data?.message || 'Upload failed.');
        } finally {
            setUploading(false);
        }
    };

    const handleAddCourse = async () => {
        if (!newCourse || !newSemester) return;

        try {
            const response = await axios.post(`${API_BASE_URL}/api/profiles/add-course`, {
                name: newCourse,
                semester: newSemester
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setProfile(prev => ({
                ...prev,
                courses: [...(prev.courses || []), response.data]
            }));
            setNewCourse('');
            setNewSemester('');
        } catch (err) {
            console.error('Error adding course:', err);
            setError('Failed to add course.');
        }
    };

    const handleEditCourse = async (index) => {
        const courses = getCourses();
        if (!courses[index]) {
            setError('Course to edit not found.');
            return;
        }
        const courseId = courses[index]._id; // Get the course ID
        console.log("Editing course with ID:", courseId); // ADD THIS LINE

        try {
            const response = await axios.put(`${API_BASE_URL}/api/profiles/edit-course/${courseId}`, { // Include the ID in the URL
                name: editedCourse,
                semester: editedSemester
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const updatedCourses = [...courses];
            updatedCourses[index] = response.data;
            setProfile(prev => ({ ...prev, courses: updatedCourses }));
            setEditingIndex(null);
        } catch (err) {
            console.error('Error editing course:', err);
            setError('Failed to edit course.');
        }
    };

    const handleDeleteCourse = async (index) => {
        const courses = getCourses();
        if (!courses[index]) {
            setError('Course to delete not found.');
            return;
        }
        const courseId = courses[index]._id;  // Get the course ID
        console.log("Deleting course with ID:", courseId); // ADD THIS LINE

        try {
            await axios.delete(`${API_BASE_URL}/api/profiles/delete-course/${courseId}`, { // Include the ID in the URL
                headers: { Authorization: `Bearer ${token}` }
            });

            const updatedCourses = courses.filter((_, i) => i !== index);
            setProfile(prev => ({ ...prev, courses: updatedCourses }));
        } catch (err) {
            console.error('Error deleting course:', err);
            setError('Failed to delete course.');
        }
    };

    if (loading) return <div>Loading profile...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="profile-container">
            <h1>User Profile</h1>
            {profile ? (
                <div className="profile-details">
                    {profile.avatarUrl && (
                        <img src={`${API_BASE_URL}/${profile.avatarUrl}`} alt="Profile" className="profile-picture" />
                    )}
                    <p><strong>Name:</strong> {profile.name}</p>
                    <p><strong>Email:</strong> {profile.email}</p>

                    {/* Upload Section */}
                    <div style={{ marginTop: '20px' }}>
                        <h3>Upload Profile Picture</h3>
                        <input type="file" accept="image/*" onChange={handleFileChange} disabled={uploading} />
                        <button onClick={handleFileUpload} disabled={!selectedFile || uploading}>
                            {uploading ? 'Uploading...' : 'Upload Picture'}
                        </button>
                        {uploadError && <p style={{ color: 'red' }}>{uploadError}</p>}
                        {uploadSuccess && <p style={{ color: 'green' }}>Picture uploaded successfully!</p>}
                    </div>

                    {/* Course Section */}
                    <div style={{ marginTop: '40px' }}>
                        <h3>Enrolled Courses by Semester</h3>

                        {getCourses().length > 0 ? (
                            <ul>
                                {getCourses().map((course, index) => (
                                    <li key={course._id || index}>
                                        {editingIndex === index ? (
                                            <>
                                                <input
                                                    type="text"
                                                    value={editedCourse}
                                                    onChange={(e) => setEditedCourse(e.target.value)}
                                                />
                                                <input
                                                    type="text"
                                                    value={editedSemester}
                                                    onChange={(e) => setEditedSemester(e.target.value)}
                                                />
                                                <button onClick={() => handleEditCourse(index)}>Save</button>
                                                <button onClick={() => setEditingIndex(null)}>Cancel</button>
                                            </>
                                        ) : (
                                            <>
                                                <strong>{course.name}</strong> – <em>{course.semester}</em>
                                                <button onClick={() => {
                                                    setEditingIndex(index);
                                                    setEditedCourse(course.name);
                                                    setEditedSemester(course.semester);
                                                }}>Edit</button>
                                                <button onClick={() => handleDeleteCourse(index)}>Delete</button>
                                            </>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No enrolled courses found.</p>
                        )}

                        <h4>Add New Course</h4>
                        <input
                            type="text"
                            placeholder="Course Name"
                            value={newCourse}
                            onChange={(e) => setNewCourse(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Semester (e.g., Spring 2025)"
                            value={newSemester}
                            onChange={(e) => setNewSemester(e.target.value)}
                        />
                        <button onClick={handleAddCourse}>Add Course</button>
                    </div>
                </div>
            ) : (
                <p>No profile data available</p>
            )}
        </div>
    );
};

export default Profiles;