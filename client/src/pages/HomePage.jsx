import React, { useState, useCallback, useEffect } from "react";
import styles from './HomePage.module.css';
import searchBarStyles from '../components/SearchBar.module.css';
import SearchBar from "../components/SearchBar";
import QuickLinks from "../components/QuickLinks";
import Announcements from "../components/Announcements";
import SearchResults from "../components/SearchResults";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [academicData, setAcademicData] = useState({
    majors: {},
    minors: {},
    loading: true,
    error: null
  });

  // Fetch all majors and minors data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseUrl = process.env.NODE_ENV === 'development' 
          ? 'http://localhost:3000' 
          : '';
        
        const [majorsRes, minorsRes] = await Promise.all([
          fetch(`${baseUrl}/api/majors`),
          fetch(`${baseUrl}/api/minors`)
        ]);
        
        if (!majorsRes.ok) throw new Error('Failed to load majors');
        if (!minorsRes.ok) throw new Error('Failed to load minors');

        const majorsData = await majorsRes.json();
        const minorsData = await minorsRes.json();

        setAcademicData({
          majors: majorsData,
          minors: minorsData,
          loading: false,
          error: null
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        setAcademicData(prev => ({
          ...prev,
          loading: false,
          error: error.message
        }));
      }
    };
    
    fetchData();
  }, []);

  // Improved search function that treats majors and minors equally
  const filterCourses = useCallback((query) => {
    if (!query.trim()) return [];
    
    const results = [];
    const searchLower = query.toLowerCase();
  
    // Search through all majors
    Object.entries(academicData.majors).forEach(([majorKey, courses]) => {
      courses.forEach(course => {
        const nameMatch = course.name?.toLowerCase().includes(searchLower);
        const optionsMatch = course.options?.some(opt => 
          opt.toLowerCase().includes(searchLower)
        );
        const requirementsMatch = course.requirements?.some(req => 
          req.toLowerCase().includes(searchLower)
        );
        
        if (nameMatch || optionsMatch || requirementsMatch) {
          results.push({
            ...course,
            context: `${majorKey.replace(/_/g, ' ')} (Major)`,
            type: "major"
          });
        }
      });
    });
  
    // Search through all minors with same thoroughness
    Object.entries(academicData.minors).forEach(([minorKey, courses]) => {
      courses.forEach(course => {
        const nameMatch = course.name?.toLowerCase().includes(searchLower);
        const optionsMatch = course.options?.some(opt => 
          opt.toLowerCase().includes(searchLower)
        );
        const requirementsMatch = course.requirements?.some(req => 
          req.toLowerCase().includes(searchLower)
        );
        
        if (nameMatch || optionsMatch || requirementsMatch) {
          results.push({
            ...course,
            context: `${minorKey.replace(/_/g, ' ')} (Minor)`,
            type: "minor"
          });
        }
      });
    });
  
    return results;
  }, [academicData.majors, academicData.minors]);

  const handleSearchSubmit = useCallback((e) => {
    e.preventDefault();
    const results = filterCourses(searchQuery);
    setSearchResults(results);
  }, [searchQuery, filterCourses]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Welcome to CIS Course Helper</h1>
        <p className={styles.subtitle}>Search across all majors and minors</p>
      </header>

      <div className={styles.searchContainer}>
      <SearchBar
      searchQuery={searchQuery}
      onSearchChange={(e) => setSearchQuery(e.target.value)}
      onSearchSubmit={handleSearchSubmit}
       placeholder="Search courses, requirements, or options..."
        className={searchBarStyles.searchForm}
/>
      </div>

      <div className={styles.content}>
        {academicData.loading ? (
          <div className={styles.loadingContainer}>
            <div className="animate-spin inline-block w-6 h-6 border-2 border-current border-t-transparent text-blue-600 rounded-full mb-4"></div>
            <p className="text-gray-600">Loading course data...</p>
          </div>
        ) : academicData.error ? (
          <div className={styles.errorContainer}>
            Error loading data: {academicData.error}
          </div>
        ) : (
          <>
            <QuickLinks />
            <Announcements />
            <div className={styles.resultsContainer}>
              <SearchResults 
                results={searchResults}
                query={searchQuery}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;