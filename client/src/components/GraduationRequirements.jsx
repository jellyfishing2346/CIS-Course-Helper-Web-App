// src/components/GraduationRequirements.jsx
import React, { useState, useEffect } from 'react';
import ComputerScience from './Computer_Science.jpg';
import InformationSystems from './Information-Systems.jpg';
import MultimediaComputing from './Multimedia-Computing.jpg';
import ComputerScienceMinor from './Computer-Science-Minor.png';
import MultimediaComputingMinor from './Multimedia-Computing-Minor.png';
import CognitiveScience from './Cognitive-Science-Minor.png';
import DataScience from './Data-Science-Minor.png';
import styles from './GraduationRequirements.module.css';

const GraduationRequirements = () => {
  const [majors, setMajors] = useState({
    computer_science: [],
    multimedia_computing: [],
    information_systems: [],
  });
  const [minors, setMinors] = useState({
    computer_science: [],
    multimedia_computing: [],
    cognitive_science: [],
    data_science: [],
  });

  useEffect(() => {
    // Simulating an API call or data fetching
    const fetchCourses = () => {
      const majorsData = {
        "computer_science": [
          { "id": 1, "name": "Intro to Programming using Java or Java for Programmers", "options": ["Introduction to Programming using Java", "Java for Programmers"], "requirements": ["CISC 1115", "CISC 1170"], "prerequisites": [ "For CISC 1115, a student must not receive credit for CISC 1110 (Introduction to Programming using C++). Otherwise if they receive credit for CISC 1110 they must take CISC 1170"] },
          { "id": 2, "name": "Core Computer Science Courses", "options": ["Introduction to Discrete Structures", "Introduction to Modern Programming Techniques", "Data Structures", "Design and Implementation of Large-Scale Applications", "Programming Paradigms in C++", "Principles of Computer Architecture", "Operating Systems"], "requirements": ["CISC 2210", "CISC 3115", "CISC 3130", "CISC 3140", "CISC 3142", "CISC 3310", "CISC 3320"], "prerequisites": ["In order to take CISC 2210 a student must take MATH 1011 or in placement of MATH 1201 with a C- or higher and take CISC 1115 or CISC 1170 with a C or higher. In order to take CISC 3115 a student must complete CISC 1115 with a C or higher but if they take CISC 3110 (Advanced Programming Techniques) they are exempt from taking the course. In order to take CISC 3130 a student must either complete CISC 1115 or CISC 1170 with a C or higher and CISC 3115 or CISC 3110 with a C or higher. In order to take CISC 3140, a student must complete CISC 3130 with a C or higher. In order to take CISC 3142, a student must take CISC 3130 and CISC 3310 with a C or higher and not taken CISC 3110, if they taken CISC 3110 an alternative course they can take is CISC 3160 (Programming Languages). In order to take CISC 3310, a student must take CISC 2210 with a C or higher. In order to take CISC 3320, a student must take CISC 3310 with a C or higher."] },
          { "id": 3, "name": "Analysis of Algorithms or Theoretical Computer Science", "options": ["Analysis of Algorithms", "Theoretical Computer Science"], "requirements": ["CISC 3220", "CISC 3230"], "prerequisites": ["If a student wishes to take CISC 3220 or CISC 3230 they need to pass both CISC 2210 and CISC 3130 with a C or higher"] },
          { "id": 4, "name": "Independent Group and Study I or Research and Study I", "options": ["Independent Group and Study I", "Research and Study I"], "requirements": ["CISC 4900", "CISC 5001"], "prerequisites": ["If a student wishes to take CISC 4900 they must take pass CISC 3130 and advanced elective between CISC 3000-4899 a C or higher. However, if a student wishes to take CISC 5001 they must pass CISC 3130 with a C or higher and a GPA of a 3.0 in CIS courses, and permission of the chairperson"] },
          { "id": 5, "name": "Computer and Ethics", "options": ["Computer and Ethics (CISC course)", "Computer and Ethics (PHILS course)"], "requirements": ["CISC 2820W", "PHIL 3318W"], "prerequisites": ["If a student wishes to take CISC 2820W or PHIL 3318W they must complete CISC 1115 or CISC 1110 with a C or higher and ENGL 1012 with a C or higher"] },
          { "id": 6, "name": "Calculus I and Calculus II", "options": ["Calculus I", "Calculus II"], "requirements": ["MATH 1201", "MATH 1206"], "prerequisites": ["If a student wishes to take MATH 1201 they must complete MATH 1101 with a C- or higher. Also, if a student wishes to take MATH 1206 they must complete MATH 1201 with a C- or higher."] },
          { "id": 7, "name": "Elementary Probability and Statistics or Probability and Statistics I", "options": ["Elementary Probability and Statistics", "Probability and Statistics I"], "requirements": ["MATH 2501", "MATH 3501"], "prerequisites": ["If a student wishes to take MATH 2501 or MATH 3501 they must pass MATh 1206 with a C- or higher"]},
          { "id": 8, "name": "Three additional courses chosen from CISC 3000-4899", "options": ["Review the list of CISC courses that are offered on Cunyfirst that fall under CISC 3000-4899"], "requirements": ["CISC 3115", "CISC 3130"], "prerequisites": ["If a student wishes to take an advanced CISC course elective such as CISC 3000-4899 they must complete CISC 3115 or CISC 3110 and CISC 3130 with a C or higher"]},
        ],
        
         // Multimedia Computing Major
         multimedia_computing: [
          { "id": 1, "name": "Intro to Programming using Java or Java for Programmers", "options": ["Introduction to Programming using Java", "Java for Programmers"], "requirements": ["CISC 1115", "CISC 1170"], "prerequisites": [ "For CISC 1115, a student must not receive credit for CISC 1110 (Introduction to Programming using C++). Otherwise if they receive credit for CISC 1110 they must take CISC 1170"] },
          { "id": 2, "name": 'Core Multimedia Computing Courses', "options": ["Introduction to Multimedia Computing", "Introduction to Discrete Structures", "Computer and Ethics", "Introduction to Modern Programming Techniques", "Data Structures", "Analysis of Algorithms" ,"Operating Systems", "Computer Graphics", "Multimedia Computing"], "requirements": ["CISC 1600", "CISC 2210", "CISC 2820W", "CISC 3115", "CISC 3130", "CISC 3220", "CISC 3320", "CISC 3620", "CISC 3630"], "prerequisites": ['None'] },
          { "id": 3, "name": "Independent Group and Study I or Research and Study I", "options": ["Independent Group and Study I", "Research and Study I"], "requirements": ["CISC 4900", "CISC 5001"], "prerequisites": ["If a student wishes to take CISC 4900 they must take pass CISC 3130 and advanced elective between CISC 3000-4899 a C or higher. However, if a student wishes to takes CISC 5001 they must pass CISC 3130 with a C or higher and a GPA of a 3.0 in CIS courses, and permission of the chairperson"] },
          { "id": 4, "name": 'Calculus I', "options":['Calculus I'], "requirements":['MATH 1201'], "prerequisites":['If a student wishes to take MATH 1201 they must pass MATH 1101 with a C- or higher']},
          { "id": 5, "name": 'Calculus II', "options":['Calculus II'], "requirements":['MATH 1206'], "prerequisites":['If a student wishes to take MATH 1206 they must pass MATH 1201 with a C- or higher']},
          { "id": 6, "name": 'Elementary Probability and Statistics I', "options":['Elementary Probability and Statistics I'], "requirements":['MATH 2501'], "prerequisites":['If a student wishes to take MATH 2501 they must pass MATH 1206 with a C- or higher']},
          { "id": 7, "name": 'One of CISC 3650 or CISC 3667', "options":['Computer Human Interaction', 'Game Design and Development'], "requirements":['CISC 3650','CISC 3667'], "prerequisites":['If a student wishs to take CISC 3650 they must pass CISC 3115 or CISC 3110 with a C or higher. Otherwise, if they wish to take CISC 3667 they must CISC 3130 with a C or higher.']},
          { "id": 8, "name": 'Three additional courses chosen from CISC 3140, 3142, 3410, 3415, 3610, 3650, 3667, 3810, and 4610', "options":['Design and Implementation of Large-Scale Applications','Programming Paradigms in C++','Artifical Intelligence','Principles of Robotics','Introduction to Multimedia Programming','Computer Human Interaction','Game Design and Development','Database Systems','Multimedia Database'], requirements:['CISC 3140', 'CISC 3142', 'CISC 3410', 'CISC 3610', 'CISC 3650', 'CISC 3667', 'CISC 3810', 'CISC 4610'], prerequisites:['If a student wishes to take CISC 3140, CISC 3667, CISC 3810, or CISC 4610 they must pass CISC 3130 with a C or higher. Otherwise if they wish to take CISC 3142 they must pass CISC 3130 and CISC 3310 with a C or higher and not take CISC 3110. If they took CISC 3110 they must take CISC 3160 to substitute CISC 3142 instead. However, if they wish to take CISC 3610 or CISC 3650 they must take CISC 3115 or CISC 3110.']},
          { "id": 9, "name": 'Two courses chosen from among', "options":['Art (ARTD) 2811, 2812, 2820, 2821,3812', 'Music (MUSC), 3261, 3322', 'FILM 1201, 2701','Television and Radio (TVRA) 2420, 3861, 2871, 3951'], "requirements":['Two (ARTD) Electives, two MUSC Electives, two FILM Electives, or two (TVRA) electives'], "prerequisites":['Depending on which elective class you are pursuing please consult the proper major department in understanding the prerequsites for the suggested electives. Visit this link here: https://www.brooklyn.edu/academics/programs/']}
         ],
      
         // Information Systems Major
         information_systems: [
          { "id": 1, "name": "Intro to Programming using Java or Java for Programmers", "options": ["Introduction to Programming using Java", "Java for Programmers"], "requirements": ["CISC 1115", "CISC 1170"], "prerequisites": [ "For CISC 1115, a student must not receive credit for CISC 1110 (Introduction to Programming using C++). Otherwise if they receive credit for CISC 1110 they must take CISC 1170"] },
          { "id": 2, "name": "Core Information System Classes", "options": ["Introduction to Modern Programming Techniques", "Data Structures", "Database Systems"], "requirements": ["CISC 3115", "CISC 3130", "CISC 3810"], "prerequisites": ['For CISC 3115, a student must have not receive credit for CISC 3110 (Advanced Programming Techniques). As for CISC 3130 a student must pass CISC 1115 or CISC 1110 for a C or higher. Lastly, for CISC 3810 a student must pass CISC 3130 for a C or higher.'] },
          { "id": 3, "name": "Independent Group and Study I or Research and Study I", "options": ["Independent Group and Study I", "Research and Study I"], "requirements": ["CISC 4900", "CISC 5001"], "prerequisites": ["If a student wishes to take CISC 4900 they must take pass CISC 3130 and advanced elective between CISC 3000-4899 a C or higher. However, if a student wishes to take CISC 5001 they must pass CISC 3130 with a C or higher and a GPA of a 3.0 in CIS courses, and permission of the chairperson"] },
          { "id": 4, "name": 'Students unfamiliar with PC application software (word processing spreadsheet software database management software and presentation software) should also complete CISC 1050. Knowledge of such software is prerequisite for CISC 3810.', "options":['Introduction to Computer Applications'], "requirements":["CISC 1050"], "prerequisites":["A student is required to take CISC 1050 if they are unfamiliar with PC application software"]},
          { "id": 5, "name": 'Three courses chosen from CISC 3140, 3150, 3171, 3340, and 3410.', "options":['Design and Implementation of Large-Scale Applications', 'Introduction to Software Engineering', 'Computer and Networks and Protocols', 'Artifical Intelligence'], "requirements":['CISC 3140', 'CISC 3171', 'CISC 3340', 'CISC 3410'], "prerequisites":['If a student wishes to take CISC 3140, CISC 3171, or CISC 3410 they must pass CISC 3130 with a C or higher. If they wish to take CISC 3340 they must pass CISC 3130 with a C or higher and MATH 2501 with a C- or higher']},
          { "id": 6, "name": "With permission of the chairperson of the Department of Computer and Information Science, the student may substitute one of the following courses for any course in the three-course choice above: CISC 3160, 3220, 3310, 3320, 3610, 3630", "options": ["Programming Languages", "Analysis of Algorithms", "Principles of Computer Architecture", "Operating Systems", "Introduction to Multimedia Programming", "Multimedia Computing"], "requirements": ["CISC 3160", "CISC 3220", "CISC 3310", "CISC 3320", "CISC 3610", "CISC 3630"], "prerequisites": ["If a student wishes to substitute CISC 3160 if they have taken CISC 1170, CISC 1110, CISC 3110, and CISC 3130. If they wish to take CISC 3220 they must pass both CISC 2210 and CISC 3130 with a C or higher. If they wish to take CISC 3310 or CISC 3320 they must pass CISC 2210 with a C or higher. Lastly, if they wish to take CISC 3610 they must pass CISC 3115 or CISC 3110 with a C or higher, however if they wish to take CISC 3630 they must pass CISC 3130 with a C or higher"] },
          { "id": 7, "name": "Computer and Ethics", "options": ["Computer and Ethics (CISC course)", "Computer and Ethics (PHILS course)"], "requirements": ["CISC 2820W", "PHIL 3318W"], "prerequisites": ["If a student wishes to take CISC 2820W or PHIL 3318W they must complete CISC 1115 or CISC 1110 with a C or higher and ENGL 1012 with a C or higher"] },
          { "id": 8, "name": "Management Information Systems (CISC)/Management Information Systems (BUSN)", 'options': ["Management Information Systems (CISC)", "Management Information Systems (BUSN)"], "requirements":['CISC 1590', 'BUSN 3420'], "prerequisites":["If a student wishes to take CISC 1590 or BUSN 3420 they must pass CISC 1050 with a C or higher"]},
          { "id": 9, "name": 'Electronic Commerence (CISC)/Electronic Commerence (BUSN) or Information Systems Project Management (CISC)/Information Systems Project Management (BUSN)', "options":['Electronic Commerence (CISC)', 'Electronic Commerence (BUSN)', 'Information Systems Project Management (CISC)', 'Information Systems Project Management (BUSN)'], "requirements":['CISC 1530','BUSN 3120','CISC 2532','BUSN 2432'], "prerequisites":["If a student wishes to take CISC 1530 or BUSN 3120 they must pass CISC 1050, CISC 1110, CICS 1115 with a C or better. However, if they wish to take CISC 2532 or BUSN 2432 they must pass CISC 1590 or BUSN 3420 with a C or better"]},
          { "id": 10, "name": 'Seminar in Computer-Assisted Management Games (BUSN) or Seminar in Computer-Assisted Management Games (CISC)', "options":['Seminar in Computer-Assisted Management Games (BUSN)', 'Seminar in Computer-Assisted Management Games (CISC)'], "requirements":['BUSN 4202W','CISC 1580W'], "prerequisites":["If a student wishes to take BUSN 4202W or CISC 1580W they must pass ENGL 1012 and BUSN 3200 with a C or better."]},
          { "id": 11, "name": 'Elementary Macroeconomics (ECON)/Elementary Macroeconomics (BUSN) and Elementary Microeconomics (ECON)/Elementary Microeconomics (BUSN) and Principles of Management (BUSN)', "options":['Elementary Macroeconomics (ECON)', 'Elementary Macroeconomics (BUSN)', 'Elementary Microeconomics (ECON)', 'Elementary Macroeconomics (BUSN)', 'Principles of Management (BUSN)'], "requirements":['ECON 2100', 'BUSN 2100', 'ECON 2200', 'BUSN 2200', 'BUSN 3200'], "prerequisites":['If a student wishes to take an advanced CISC course elective such as CISC 3000-4899 they must complete CISC 3115 or CISC 3110 and CISC 3130 with a C or higher']},
          { "id": 12, "name": 'Principles of Financial Management', "options":['Principles of Financial Management'], "requirements":['FIN 3310'], "prerequisites":['If a student wishes to take FINC 3310 they must pass Accounting 2001, Economics 2100, Economics 2200, and Business 3400 or Economics 3400 with a C or better']},
          { "id": 13, "name": 'Principles of Accounting I (Financial)', "options":['Principles of Accounting I (Financial)'], "requirements":['ACCT 2001'], "prerequisites":['If a student wishes to take ACCT 2001 they must not pass prior equivalent courses. They should speak with an advisor to confirm if eligible for this course']},
          { "id": 14, "name": 'Introduction to Economic and Business Statistics (ECON)/Introduction to Economic and Business Statistics (BUSN) or Elementary and Probability Statistics I/Probability and Statistics I or Statistical Methods in Pyschological Research', "options":['Introduction to Economic and Business Statistics (ECON)', 'Introduction to Economic and Business Statistics (BUSN)', 'Elementary and Probability Statistics I', 'Probability and Statistics I', 'Statistical Methods in Pyschological Research'], "requirements":['BUSN 3400', 'ECON 3400', 'MATH 2501', 'MATH 3501', 'PYSCH 3400'], "prerequisites":['If a student wishes to take BUSN 3400/ECON 3400 or MATH 2501/MATH 3501 they must pass MATH 1101 with a C- or better. However, if they wish to take PYSCH 3400 they must pass PYSCH 1000 with a C- or better']},
          { "id": 15, "name": 'Fundamental Methods of Mathematical Economics I (BUSN)/Fundamental Methods of Mathematical Economics I (ECON) or Calculus I or Foundations of Business Analytics (BUSN)/ Foundation of Business Analytics (CISC)', "options":['Fundamental Methods of Mathematical Economics I (BUSN)', 'Fundamental Methods of Mathematical Economics I (ECON)', 'Calculus I', 'Foundations of Business Analytics (BUSN)', 'Foundations of Business Analytics (CISC)'], "requirements":['BUSN 3410', 'ECON 3410', 'MATH 1201', 'BUSN 3421', 'CISC 2590'], "prerequisites":['If a student wishes to take BUSN 3410/ECON 3410 they must pass ECON 2200 or BUSN 2200 with a C or better. However, if they wish to take MATH 1201 they must pass MATH 1101 with a C- or better. Also, if they wish to take BUSN 3421 or CISC 2590 they must pass Business 3400, Economics 3400, Mathematics 1501, Psychology 3400, or an equivalent statistics course with a grade of C or better and Computer and Information Science 1050 or proficiency with spreadsheets. ']},
            // Add more courses as needed
         ]
      };
      
      const minorsData = {
        "computer_science": [
          { "id": 1, "name": "Option #1: Introduction to Programming using Java, Introduction to Discrete Structures, Introduction to Modern Programming Techniques, Data Structures, and Principles of Computer Architecture", "options": ["Introduction to Programming using Java", "Introduction to Discrete Structures", "Introduction to Modern Programming Techniques", "Data Structures", "Principles of Computer Architecture"], "requirements": ["CISC 1115 or CISC 1110", "CISC 2210", "CISC 3110 or CISC 3115", "CISC 3130", "CISC 3310"], "prerequisites": ["In order to take CISC 1115 you must not take CISC 1110 if you did take CISC 1170. The same rule applies for CISC 3115 as you must not take CISC 3110 if you did then your exempt from that class. For CISC 2210 you pass CISC 1115 or CISC 1110 and CISC 1170 with a C or higher and MATH 1101 with a C- or higher. As for CISC 3130 you must both pass CISC 1115 or CISC 1110 and CISC 3115 or CISC 3110 with a C or higher. Lastly, for 3310 you must pass CISC 2210 with a C or higher"] },
          { "id": 2, "name": "Option #2: Introduction to Programming using Java, Introduction to Computer Applications, Operations Management or Discrete Structures, Introuction to Modern Programming Techniques, and Data Structures or Multimedia Computing", "options": ["Introduction to Programming using Java", "Introduction to Computer Applications", "Operations Management", "Discrete Structures", "Introduction to Modern Programming Techniques", "Data Structures", "Multimedia Computing"], "requirements": ["CISC 1115 or CISC 1110", "CISC 1050", "CISC 2531", "CISC 2210", "CISC 3110 or CISC 3115", "CISC 3130", "CISC 3630"], "prerequisites": ["In order to take CISC 1115 you must not take CISC 1110 if you did take CISC 1170. For CISC 1050 you must not take CISC 1110 if you did take CISC 1170. For BUSN 3110 you must pass BUSN 2100 with a C or higher. For CISC 2210 you pass CISC 1115 or CISC 1110 and CISC 1170 with a C or higher and MATH 1101 with a C- or higher. For CISC 2531 you must pass CISC 1050, CISC 1110, CISC 1115, or CISC 1170 with a C or higher. As for CISC 3130 you must both pass CISC 1115 or CISC 1110 and CISC 3115 or CISC 3110 with a C or higher. Lastly, for CISC 3630 you must pass CISC 3130 with a C or higher"] },
          { "id": 3, "name": "Option #3: Introduction to Programming using Java, Introduction to Modern Programming Techniques, Data Structures, and two additional courses numbered 2000 or above (however, make sure that you fulfill any prerequisites)", "options": ["Introduction to Programming using Java", "Introduction to Modern Programming Techniques", "Data Structures", "Two additional courses numbered 2000 or above"], "requirements": ["CISC 1115 or CISC 1110", "CISC 3110 or CISC 3115", "CISC 3130", "Two additional courses numbered 2000 or above"], "prerequisites": ["In order to take CISC 1115 you must not take CISC 1110 if you did take CISC 1170. The same rule applies for CISC 3115 as you must not take CISC 3110 if you did then your exempt from that class. For CISC 3130 you must both pass CISC 1115 or CISC 1110 and CISC 3115 or CISC 3110 with a C or higher. Lastly, for the two additional courses numbered 2000 or above you must pass the prerequisites for those courses"] },
        ], 
        "multimedia_computing": [
          
            { "id": 1, "name": "Introduction to Programming using Java or Java for Programmers", "options": ["Introduction to Programming using Java", "Java for Programmers"], "requirements": ["CISC 1115", "CISC 1170"], "prerequisites": [ "For CISC 1115, a student must not receive credit for CISC 1110 (Introduction to Programming using C++). Otherwise if they receive credit for CISC 1110 they must take CISC 1170"]}, 
            { "id": 2, "name": "Introduction to Multimedia Computing", "options": ["Introduction to Multimedia Computing"], "requirements": ["CISC 1600"], "prerequisites": ["None"]},
            { "id": 3, "name": "Introduction to Modern Programming Techniques", "options": ["Introduction to Modern Programming Techniques"], "requirements": ["CISC 3115"], "prerequisites": ["CISC 1115 or CISC 1170"]},
            { "id": 4, "name": "Data Structures", "options": ["Data Structures"], "requirements": ["CISC 3130"], "prerequisites": ["CISC 1115 or CISC 1170 and CISC 3115 or CISC 3110"]},
            { "id": 5, "name": "Computer Graphic or Multimedia Computing", "options": ["Computer Graphics", "Multimedia Computing"], "requirements": ["CISC 3620", "CISC 3630"], "prerequisites": ["CISC 3130"]},
            { "id": 6, "name": "Three courses chosen from among the following: CISC 3610, 3620, 3630, 3650, 3667, 4610", "options": ["Introduction to Multimedia Programming", "Computer Graphics", "Multimedia Computing", "Computer Human Interaction", "Game Design and Development", "Multimedia Database"], "requirements": ["CISC 3610", "CISC 3620", "CISC 3630", "CISC 3650", "CISC 3667", "CISC 4610"], "prerequisites": ["Most of these courses except CISC 3650 require CISC 3130 with a grade C or higher, for CISC 3650 you need to pass CISC 3115 or CISC 3110 with a C or higher"]},
        
        ], 
        "cognitive_science": [
          
            { "id": 1, "name": "Philosophical Issues in Cognitive Science", "options": ["Philosophical Issues in Cognitive Science"], "requirements": ["PHIL 3422"], "prerequisites": ["None"]},
            { "id": 2, "name": "Introduction to Programming using Java", "options": ["Introduction to Programming using Java"], "requirements": ["CISC 1115"], "prerequisites": ["If a student wishes to take CISC 1115 they must not receive credit for CISC 1110 (Introduction to Programming using C++)"]},
            { "id": 3, "name": "Introduction Pyschology and Advanced Cognitive Pyschology", "options": ["Introduction Pyschology", "Advanced Cognitive Pyschology"], "requirements": ["PYSCH 1000", "PYSCH 3530"], "prerequisites": ["If a student wishes to take PYSCH 3530 they must pass PYSCH 1000 with a C or higher"]},
            { "id": 4, "name": "Option A: PHIL 3123, 3410, 3401, 3420, or 3601.", "options": ["Twentieth-Century Philosophy", "Epistemology: Theory of Knowledge", "Metaphysics", "Philosophy of Mind", "Philosophy of Science"], "requirements": ["PHIL 3123", "PHIL 3410", "PHIL 3401", "PHIL 3420", "PHIL 3601"], "prerequisites": ["Some of these classes may have a prerequisite of passing a prior philosophy with a C or higher"]},
            { "id": 5, "name": "Option B: CISC 1410 or 3410; or PHIL 29, or PSYC 3580", "options": ["Philosophy and Artifical Intelligence (CISC)", "Artifical Intelligence", "Philosophy and Artifical Intelligence (PYSC)" ], "requirements": ["CISC 1410", "CISC 3410", "PHIL 29", "PYSC 3580"], "prerequisites": ["If a student wishes to take CISC 1410 they need to complete a prior CISC course and PYSC course. As for CISC 3410 they must pass CISC 3130 with a C or higher. If they wish to take PHIL 29 or PYSC 3580 they must pass Core Curriculum 1311 or 1312 or Mathematics 1311 or a course in Computer and Information Science, and Core Curriculum 1210 or a course in philosophy with a C or higher; or permission of the chairperson of the offering department"]},
          
        ], 
        "data_science": [
          
          { "id": 1, "name": "Data Tools and Algorithms and Machine Learning", "options": ["Data Tools and Algorithms", "Machine Learning"], "requirements": ["CISC 3225", "CISC 3440"], "prerequisites": ["If a student wishes to take CISC 32250 they must pass CISC 1215 and CISC 2210 with a C or higher. As for CISC 3440 they must pass CISC 3130 with a C or higher"]},
          { "id": 2, "name": "Applied Intermediate Statistics", "options": ["Applied Intermediate Statistics"], "requirements": ["MATH 4531"], "prerequisites": ["If a student wishes to take MATH 4531 they must pass MATH 2501 or MATH 3501 and MATH 2101 with a C or higher"]},
          { "id": 3, "name": "Either MATH 2001 and MATH 3501, or CISC 2210 and MATH 2501", "options": ["Transition to Advanced Mathematics", "Probability and Statistics I", "Introduction to Discrete Structures", "Elementary Probability and Statistics"], "requirements": ["MATH 2001", "MATH 3501", "CISC 2210", "MATH 2501"], "prerequisites": ["If a student wishes to take MATH 2001 they must pass MATH 1206 with a C- or higher. As for MATH 3501 they must pass MATH 1206 with a C- or higher. If they wish to take CISC 2210 they must pass CISC 1115 or CISC 1170 and MATH 1101 with a C or higher. Lastly, if they wish to take MATH 2501 they must pass MATH 1206 with a C- or higher"]},
          { "id": 4, "name": "One additional course, chosen from among the following: ", "options": ["Elementary Microeconomics or Advanced Economic and Business Statistics, Philosophy and Artifical Intelligence or Artifical Intelligence, Global Financial Management, Elementary Microeconomics or Investment Science (ECON) or Fundamental Methods of Mathematical Economics II, Investment Science (MATH) or Linear Algebra II or Probability and Statistics II, Introductory Formal Logic or Symbolic Logic or Philosophy and Artificial Intelligence (PHIL), Survey Research or Mapping Politics: GIS Methods in Political Science, Learning (PYSC) or Sensation and Perception or Advanced Cognitive Psychology or Philosophy and Artificial Intelligence (PYSC) or Advanced Psychological Statistics, Mapping Social Data or Population and Society"], "requirements": ["BUSN 2200 or 4400W", "CISC 1410 or 3130", "FINC 3377", "ECON 2200 or 3370 or 4422", "MATH 3601 or 4101 or 4501", "PHIL 3203 or 3204 or 3423", "POLS 3014W or 3421 or 3423", "PSYC 3510 or 3520 or 3530 or 3580 or 4400", "SOCY 3506 or 3604"], "prerequisites": ["If a student wishes to take a course from the list they must pass the prerequisites for that course"]},
          
        ]
      };
      // Combine all majors and minors into a single array
      setMajors(majorsData);
      setMinors(minorsData);
  };

  fetchCourses();
}, []);

return (
  <div className="graduation-requirements">
    <h2>Graduation Requirements</h2>
    
    <h3><strong><center>Computer Science Major</center></strong></h3>
    <img src={ComputerScience} height="300" width="300" alt="Computer Science Major" />
    <ul>
      {majors.computer_science.map((course) => (
        <li key={course.id}>
          <strong>{course.name}</strong> - {course.requirements.join(', ')}
        </li>
      ))}
    </ul>

    <h3><strong><center>Information Systems Major</center></strong></h3>
    <img src={InformationSystems} height="300" width="300" alt="Information Systems Major" />
    <ul>
      {majors.information_systems.map((course) => (
        <li key={course.id}>
          <strong>{course.name}</strong> - {course.requirements.join(', ')}
        </li>
      ))}
    </ul>

    <h3><strong><center>Multimedia Computing Major</center></strong></h3>
    <img src={MultimediaComputing} height="300" width="300" alt="Multimedia Computing Major" />
    <ul>
      {majors.multimedia_computing.map((course) => (
        <li key={course.id}>
          <strong>{course.name}</strong> - {course.requirements.join(', ')}
        </li>
      ))}
    </ul>

    <h3><strong><center>Computer Science Minor</center></strong></h3>
    <img src={ComputerScienceMinor} height="300" width="400" alt="Computer Science Minor" />
    <ul>
      {minors.computer_science.map((course) => (
        <li key={course.id}>
          <strong>{course.name}</strong> - {course.requirements.join(', ')}
        </li>
      ))}
    </ul>

    <h3><strong><center>Multimedia Computing Minor</center></strong></h3>
    <img src={MultimediaComputingMinor} height="300" width="400" alt="Multimedia Computing Minor" />
    <ul>
      {minors.multimedia_computing.map((course) => (
        <li key={course.id}>
          <strong>{course.name}</strong> - {course.requirements.join(', ')}
        </li>
      ))}
    </ul>

    <h3><strong><center>Cognitive Science Minor</center></strong></h3>
    <img src={CognitiveScience} height="300" width="400" alt="Cognitive Science Minor" />
    <ul>
      {minors.cognitive_science.map((course) => (
        <li key={course.id}>
          <strong>{course.name}</strong> - {course.requirements.join(', ')}
        </li>
      ))}
    </ul>

    <h3><strong><center>Data Science Minor</center></strong></h3>
    <img src={DataScience} height="300" width="400" alt="Data Science Minor" />
    <ul>
      {minors.data_science.map((course) => (
        <li key={course.id}>
          <strong>{course.name}</strong> - {course.requirements.join(', ')}
        </li>
      ))}
    </ul>
  </div>
);
}
export default GraduationRequirements;

