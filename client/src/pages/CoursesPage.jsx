import React, { useState, useEffect } from 'react';
import { FaBook, FaCheckCircle, FaInfoCircle } from 'react-icons/fa';
import styles from './CoursesPage.module.css';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [selectedArea, setSelectedArea] = useState('majors');
  const [major, setMajor] = useState('computer_science');
  const [minor, setMinor] = useState('data_science');
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const coursesPerPage = 3;
  const currentSelection = selectedArea === 'majors' ? major : minor;

  useEffect(() => {
    let isMounted = true;
    const fetchCourses = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`/api/?${selectedArea.slice(0, -1)}=${currentSelection}`);
        console.log('Fetching:', response.url);
        
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        
        const data = await response.json();
        console.log('Received data:', data);
        
        // Modified data format check
        if (isMounted) {
          if (Array.isArray(data)) {
            setCourses(data);
          } else if (data.courses && Array.isArray(data.courses)) {
            setCourses(data.courses);
          } else {
            throw new Error("Unexpected data format from API");
          }
        }
      } catch (err) {
        if (isMounted) {
          console.error("Fetch error:", err);
          setError(err.message || "Error loading courses. Please try again.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };
  
    fetchCourses();
    return () => { isMounted = false; };
  }, [selectedArea, major, minor]);

  const handleMajorChange = (e) => setMajor(e.target.value);
  const handleMinorChange = (e) => setMinor(e.target.value);

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
                            ? courseGroup.requirements[index] || courseGroup.requirements.join(', ')
                            : courseGroup.requirements
                        }
                      </p>
                      <p className={styles.courseInfo}>
                        <FaInfoCircle /> <strong>Prerequisites:</strong> {
                          Array.isArray(courseGroup.prerequisites)
                            ? courseGroup.prerequisites[index] || courseGroup.prerequisites.join(', ')
                            : courseGroup.prerequisites
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