import React, { useState } from 'react';
import styles from './NextClasses.module.css';

const NextClasses = () => {
    const [completedCourses, setCompletedCourses] = useState('');
    const [nextClasses, setNextClasses] = useState([]);

    const handleInputChange = (e) => {
        setCompletedCourses(e.target.value);
    };

    // Comprehensive prerequisite relationships including all majors and minors
    const prerequisiteMap = {
        // Computer Science Major
        "MATH 1011": ["MATH 1201"],
        "MATH 1201": ["CISC 2210", "CISC 3115", "CISC 2820", "MATH 1206"],
        "CISC 1115": ["CISC 2210", "CISC 3115", "CISC 1410", "CISC 3410"], // Combined CS Major and Cognitive Science Minor
        "CISC 1170": ["CISC 2210", "CISC 3115"],
        "CISC 2210": ["CISC 3310", "CISC 3225"], // Combined CS Major and Data Science Minor
        "CISC 3115": ["CISC 3130"],
        "MATH 1206": ["CISC 3310", "CISC 3130", "CISC 4900", "CISC 5001", "MATH 2501", "MATH 3501"],
        "CISC 3130": ["CISC 3220", "CISC 3230", "CISC 3140", "CISC 3142", "CISC 3810", "CISC 4900", "CISC 5001", 
                     "CISC 3310", "CISC 3440", "CISC 3620", "CISC 3630", "CISC 3650", "CISC 3667", "CISC 4610"], // Combined multiple
        "CISC 3310": ["CISC 3320", "CISC 3142"],
        "CISC 3220": ["CISC 3320"],
        "CISC 3230": ["CISC 3320"],
        "MATH 2501": ["MATH 3501", "MATH 4531"],
        "MATH 3501": ["MATH 4531"],
        "ENGL 1012": ["CISC 2820", "PHIL 3318W"],
        
        // Information Systems Major
        "BUSN 2200": ["BUSN 3410", "FINC 3310"],
        "ECON 2200": ["BUSN 3410", "FINC 3310"],
        "BUSN 2100": ["BUSN 3200"],
        "ECON 2100": ["BUSN 3200"],
        "BUSN 3400": ["BUSN 3410"],
        "ECON 3400": ["BUSN 3410"],
        "BUSN 3410": ["CISC 1580", "BUSN 4202"],
        "CISC 1050": ["CISC 1590", "BUSN 3420"],
        "BUSN 3200": ["CISC 1580", "BUSN 4202", "FINC 3310"],
        "CISC 1590": ["CISC 2532", "BUSN 3432"],
        "BUSN 3420": ["CISC 2532", "BUSN 3432"],
        "FINC 3310": ["CISC 2532", "BUSN 3432"],
        
        // Multimedia Computing Major/Minor
        "CISC 1600": ["CISC 3620", "CISC 3630"],
        "CISC 3620": ["CISC 3630"],
        "CISC 3630": ["CISC 3140", "CISC 3142", "CISC 3410", "CISC 3415", "CISC 3610", "CISC 3650", "CISC 3667", "CISC 3810", "CISC 4610"],
        
        // Cognitive Science Minor
        "PHIL 3422": ["PHIL 3123", "PHIL 3410", "PHIL 3401", "PHIL 3420", "PHIL 3601"],
        "PSYC 1000": ["PSYC 3530"]
    };

    const getNextClasses = () => {
        const completed = completedCourses.split(',').map(course => course.trim());
        const next = [];

        // For each completed course, find its immediate next courses
        completed.forEach(course => {
            if (prerequisiteMap[course]) {
                prerequisiteMap[course].forEach(nextCourse => {
                    if (!completed.includes(nextCourse) && !next.includes(nextCourse)) {
                        next.push(nextCourse);
                    }
                });
            }
        });

        setNextClasses(next.sort()); // Sort alphabetically for better readability
    };

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Next Classes Finder</h1>
                    <p className={styles.subtitle}>Enter your completed courses to see what you can take next</p>
                </div>

                <div className={styles.inputCard}>
                    <div className={styles.inputGroup}>
                        <div style={{ flexGrow: 1 }}>
                            <label htmlFor="courses" className={styles.inputLabel}>
                                Completed Courses
                            </label>
                            <input
                                id="courses"
                                type="text"
                                placeholder="e.g., CISC 1115, MATH 1201"
                                className={styles.textInput}
                                value={completedCourses}
                                onChange={handleInputChange}
                            />
                            <p className={styles.helperText}>Separate multiple courses with commas</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                            <button
                                onClick={getNextClasses}
                                className={styles.submitButton}
                            >
                                Find Next Classes
                            </button>
                        </div>
                    </div>
                </div>

                {nextClasses.length > 0 && (
                    <div className={styles.resultsCard}>
                        <div className={styles.resultsHeader}>
                            <h2 className={styles.resultsTitle}>Recommended Next Classes</h2>
                        </div>
                        <div className={styles.resultsBody}>
                            <ul className={styles.courseList}>
                                {nextClasses.map((className, index) => (
                                    <li key={index} className={styles.courseItem}>
                                        <span className={styles.checkIcon}>
                                            <svg fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </span>
                                        <span className={styles.courseName}>{className}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NextClasses;