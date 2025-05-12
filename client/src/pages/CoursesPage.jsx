import React, { useState, useEffect } from 'react';
import axios from 'axios'; // <--- IMPORTANT: Use axios
import { FaBook, FaCheckCircle, FaInfoCircle } from 'react-icons/fa';
import styles from './CoursesPage.module.css';

// Define your API base URL, consistent with your backend
const API_BASE_URL = 'http://localhost:3000'; // <--- IMPORTANT: Set this to your backend URL

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [selectedArea, setSelectedArea] = useState('majors');
  const [major, setMajor] = useState('computer_science'); // Default major for initial load
  const [minor, setMinor] = useState('data_science');     // Default minor for initial load
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const coursesPerPage = 3;
  // Determine the current selection to pass to the API
  const currentSelection = selectedArea === 'majors' ? major : minor;

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      setError(null);
      
      let url = '';
      if (selectedArea === 'majors' && currentSelection) {
        url = `${API_BASE_URL}/api/?major=${currentSelection}`; // <--- Use API_BASE_URL
      } else if (selectedArea === 'minors' && currentSelection) {
        url = `${API_BASE_URL}/api/?minor=${currentSelection}`; // <--- Use API_BASE_URL
      }

      if (!url) {
        setLoading(false);
        setCourses([]); // Clear courses if no selection
        return;
      }

      console.log('Fetching:', url);
      
      try {
        // <--- IMPORTANT: Use axios.get instead of fetch API
        const response = await axios.get(url); 
        console.log('Received data:', response.data);
        
        // Modified data format check
        // Your backend might return data directly as an array, or nested under a 'courses' key
        if (Array.isArray(response.data)) {
          setCourses(response.data);
        } else if (response.data.courses && Array.isArray(response.data.courses)) {
          setCourses(response.data.courses);
        } else {
          // If the API returns something unexpected, you might need to adjust here
          // or check your backend's response format.
          throw new Error("Unexpected data format from API");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.response?.data?.message || err.message || "Error loading courses. Please try again.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchCourses();
  }, [selectedArea, major, minor]); // Dependency array ensures fetch on change

  const handleMajorChange = (e) => {
    setMajor(e.target.value);
    setMinor(''); // Clear minor selection when major changes
    setCurrentPage(1); // Reset pagination
  };
  
  const handleMinorChange = (e) => {
    setMinor(e.target.value);
    setMajor(''); // Clear major selection when minor changes
    setCurrentPage(1); // Reset pagination
  };

  const filteredCourses = courses.filter((course) => {
    const matchesName = course.name?.toLowerCase().includes(searchQuery.toLowerCase()) || false;
    const matchesOptions = course.options?.some(option => 
      option.toLowerCase().includes(searchQuery.toLowerCase())
    ) || false;
    const matchesRequirements = Array.isArray(course.requirements) && 
      course.requirements.some(req => 
        req.toLowerCase().includes(searchQuery.toLowerCase())
      );
    
    return matchesName || matchesOptions || matchesRequirements;
  });

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Major and Minor Courses</h1>
      <p className={styles.description}>Here are the available courses along with their requirements.</p>

      <div className={styles.selectContainer}>
        <label>
          Area:
          <select 
            value={selectedArea} 
            onChange={(e) => {
              setSelectedArea(e.target.value);
              setCurrentPage(1);
              // Reset major/minor selection when area changes if needed
              // setSelectedMajor(e.target.value === 'majors' ? 'computer_science' : '');
              // setSelectedMinor(e.target.value === 'minors' ? 'data_science' : '');
            }} 
            className={styles.select}
          >
            <option value="majors">Major</option>
            <option value="minors">Minor</option>
          </select>
        </label>
      </div>

      <div className={styles.selectContainer}>
        <label htmlFor={`${selectedArea}-select`}>
          Select {selectedArea === 'majors' ? 'Major' : 'Minor'}:
        </label>
        <select
          id={`${selectedArea}-select`}
          onChange={selectedArea === 'majors' ? handleMajorChange : handleMinorChange}
          value={currentSelection}
          className={styles.select}
        >
          {selectedArea === 'majors' ? (
            <>
              <option value="computer_science">Computer Science</option>
              <option value="multimedia_computing">Multimedia Computing</option>
              <option value="information_systems">Information Systems</option>
            </>
          ) : (
            <>
              <option value="computer_science">Computer Science</option>
              <option value="data_science">Data Science</option>
              <option value="multimedia_computing">Multimedia Computing</option>
              <option value="cognitive_science">Cognitive Science</option>
            </>
          )}
        </select>
      </div>

      <input
        type="text"
        placeholder="Search courses..."
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setCurrentPage(1);
        }}
        className={styles.searchInput}
      />

      {loading ? (
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Loading courses...</p>
        </div>
      ) : error ? (
        <div className={styles.errorContainer}>
          <p className={styles.error}>Error: {error}</p>
          {/* You might want to fetch these dynamic lists from the backend too */}
          {selectedArea === 'minors' && (
            <p>Available minors: Computer Science, Data Science, Multimedia Computing, Cognitive Science</p>
          )}
          {selectedArea === 'majors' && (
            <p>Available majors: Computer Science, Multimedia Computing, Information Systems</p>
          )}
        </div>
      ) : currentCourses.length > 0 ? (
        <>
          <ul className={styles.courseList}>
            {currentCourses.map((courseGroup) => (
              <div key={courseGroup.id} className={styles.courseGroup}>
                <h3 className={styles.courseName}>{courseGroup.name}</h3>
                
                <div className={styles.optionsContainer}>
                  {courseGroup.options.map((option, index) => (
                    <div key={index} className={styles.optionItem}>
                      <p className={styles.courseInfo}>
                        <FaBook /> <strong>Option {index + 1}:</strong> {option}
                      </p>
                      <p className={styles.courseInfo}>
                        <FaCheckCircle /> <strong>Requirements:</strong> {
                          Array.isArray(courseGroup.requirements) 
                            ? courseGroup.requirements.join(', ') // Use join() always if it's an array of requirements for the group
                            : courseGroup.requirements // Fallback if it's a single string
                        }
                      </p>
                      <p className={styles.courseInfo}>
                        <FaInfoCircle /> <strong>Prerequisites:</strong> {
                          // This part likely needs to reference your allCoursePrerequisites map
                          // and would be more complex to display here dynamically.
                          // For now, we'll just show placeholder or the raw data if available.
                          // (Assuming 'prerequisites' field might be populated by backend or just be a note)
                          Array.isArray(courseGroup.prerequisites)
                            ? courseGroup.prerequisites.join(', ')
                            : courseGroup.prerequisites // Display raw if not array
                            || 'See Check Prerequisites page for details' // Default message
                        }
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </ul>

          <div className={styles.pagination}>
            {Array.from({ length: Math.ceil(filteredCourses.length / coursesPerPage) }, (_, i) => (
              <button 
                key={i + 1} 
                onClick={() => paginate(i + 1)} 
                className={`${styles.pageButton} ${currentPage === i + 1 ? styles.active : ''}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      ) : (
        <p className={styles.noResults}>No courses available for this {selectedArea} matching your search.</p>
      )}
    </div>
  );
};

export default CoursesPage;