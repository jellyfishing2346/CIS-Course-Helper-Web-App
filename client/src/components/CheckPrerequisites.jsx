import React, { useState, useMemo } from 'react';
import './CheckPrerequisites.module.css';

///////////////////////
// 1) PASTE YOUR DATA (TRANSFORMED TO STRUCTURED PREREQ RULES)
// --------------------
// The 'prerequisites' field has been renamed to 'prereq_rules' and
// now contains structured JSON objects representing the prerequisites for each course.
///////////////////////

// Global definitive source for all course prerequisites
const allCoursePrerequisites = {
  "CISC 1115": [{ "type": "EXCLUDE", "conditions": [{ "type": "COURSE", "code": "CISC 1110", "min_grade": "ANY" }] }],
  "CISC 1170": [{ "type": "NOTE", "text": "Typically taken if student has CISC 1110 credit, otherwise CISC 1115." }],
  "CISC 2210": [{ "type": "AND", "conditions": [
    { "type": "OR", "options": [{ "type": "COURSE", "code": "MATH 1011", "min_grade": "C-" }, { "type": "COURSE", "code": "MATH 1201", "min_grade": "C-" }] },
    { "type": "OR", "options": [{ "type": "COURSE", "code": "CISC 1115", "min_grade": "C" }, { "type": "COURSE", "code": "CISC 1170", "min_grade": "C" }] }
  ]}],
  "CISC 3115": [{ "type": "EXEMPTION", "conditions": [{ "type": "COURSE", "code": "CISC 3110", "min_grade": "ANY" }] }, { "type": "COURSE", "code": "CISC 1115", "min_grade": "C" }],
  "CISC 3130": [{ "type": "AND", "conditions": [
    { "type": "OR", "options": [{ "type": "COURSE", "code": "CISC 1115", "min_grade": "C" }, { "type": "COURSE", "code": "CISC 1170", "min_grade": "C" }] },
    { "type": "OR", "options": [{ "type": "COURSE", "code": "CISC 3115", "min_grade": "C" }, { "type": "COURSE", "code": "CISC 3110", "min_grade": "C" }] }
  ]}],
  "CISC 3140": [{ "type": "COURSE", "code": "CISC 3130", "min_grade": "C" }],
  "CISC 3142": [{ "type": "AND", "conditions": [
    { "type": "COURSE", "code": "CISC 3130", "min_grade": "C" },
    { "type": "COURSE", "code": "CISC 3310", "min_grade": "C" },
    { "type": "EXCLUDE", "conditions": [{ "type": "COURSE", "code": "CISC 3110", "min_grade": "ANY" }] }
  ]}],
  "CISC 3310": [{ "type": "COURSE", "code": "CISC 2210", "min_grade": "C" }],
  "CISC 3320": [{ "type": "COURSE", "code": "CISC 3310", "min_grade": "C" }],
  "CISC 3220": [{ "type": "AND", "conditions": [{ "type": "COURSE", "code": "CISC 2210", "min_grade": "C" }, { "type": "COURSE", "code": "CISC 3130", "min_grade": "C" }] }],
  "CISC 3230": [{ "type": "AND", "conditions": [{ "type": "COURSE", "code": "CISC 2210", "min_grade": "C" }, { "type": "COURSE", "code": "CISC 3130", "min_grade": "C" }] }],
  "CISC 4900": [{ "type": "AND", "conditions": [
    { "type": "COURSE", "code": "CISC 3130", "min_grade": "C" },
    { "type": "NOTE", "text": "Requires an advanced elective CISC 3000-4899 with C or higher." }
  ]}],
  "CISC 5001": [{ "type": "AND", "conditions": [
    { "type": "COURSE", "code": "CISC 3130", "min_grade": "C" },
    { "type": "NOTE", "text": "Requires GPA of 3.0 in CIS courses and permission of chairperson." }
  ]}],
  "CISC 2820W": [{ "type": "AND", "conditions": [
    { "type": "OR", "options": [{ "type": "COURSE", "code": "CISC 1115", "min_grade": "C" }, { "type": "COURSE", "code": "CISC 1110", "min_grade": "C" }] },
    { "type": "COURSE", "code": "ENGL 1012", "min_grade": "C" }
  ]}],
  "PHIL 3318W": [{ "type": "AND", "conditions": [
    { "type": "OR", "options": [{ "type": "COURSE", "code": "CISC 1115", "min_grade": "C" }, { "type": "COURSE", "code": "CISC 1110", "min_grade": "C" }] },
    { "type": "COURSE", "code": "ENGL 1012", "min_grade": "C" }
  ]}],
  "MATH 1201": [{ "type": "COURSE", "code": "MATH 1101", "min_grade": "C-" }],
  "MATH 1206": [{ "type": "COURSE", "code": "MATH 1201", "min_grade": "C-" }],
  "MATH 2501": [{ "type": "COURSE", "code": "MATH 1206", "min_grade": "C-" }],
  "MATH 3501": [{ "type": "COURSE", "code": "MATH 1206", "min_grade": "C-" }],

  // Multimedia Computing specific prereqs
  "CISC 1600": [{ "type": "NONE" }],
  "CISC 3620": [{ "type": "COURSE", "code": "CISC 3130", "min_grade": "C" }],
  "CISC 3630": [{ "type": "COURSE", "code": "CISC 3130", "min_grade": "C" }],
  "CISC 3650": [{ "type": "OR", "options": [{ "type": "COURSE", "code": "CISC 3115", "min_grade": "C" }, { "type": "COURSE", "code": "CISC 3110", "min_grade": "C" }] }],
  "CISC 3667": [{ "type": "COURSE", "code": "CISC 3130", "min_grade": "C" }],
  "CISC 3610": [{ "type": "OR", "options": [{ "type": "COURSE", "code": "CISC 3115", "min_grade": "C" }, { "type": "COURSE", "code": "CISC 3110", "min_grade": "C" }] }],
  "CISC 3810": [{ "type": "COURSE", "code": "CISC 3130", "min_grade": "C" }],
  "CISC 4610": [{ "type": "COURSE", "code": "CISC 3130", "min_grade": "C" }],

  // Information Systems specific prereqs
  "CISC 1050": [{ "type": "NOTE", "text": "Required if unfamiliar with PC application software. (This is a program rule, not a course prerequisite)." }],
  "CISC 3171": [{ "type": "COURSE", "code": "CISC 3130", "min_grade": "C" }],
  "CISC 3340": [{ "type": "AND", "conditions": [
    { "type": "COURSE", "code": "CISC 3130", "min_grade": "C" },
    { "type": "COURSE", "code": "MATH 2501", "min_grade": "C-" }
  ]}],
  "CISC 3160": [{ "type": "AND", "conditions": [
    { "type": "OR", "options": [{ "type": "COURSE", "code": "CISC 1170", "min_grade": "ANY" }, { "type": "COURSE", "code": "CISC 1110", "min_grade": "ANY" }] },
    { "type": "OR", "options": [{ "type": "COURSE", "code": "CISC 3110", "min_grade": "ANY" }, { "type": "COURSE", "code": "CISC 3130", "min_grade": "ANY" }] }
  ]}],
  "CISC 1590": [{ "type": "COURSE", "code": "CISC 1050", "min_grade": "C" }],
  "BUSN 3420": [{ "type": "COURSE", "code": "CISC 1050", "min_grade": "C" }],
  "CISC 1530": [{ "type": "OR", "options": [
    { "type": "COURSE", "code": "CISC 1050", "min_grade": "C" },
    { "type": "COURSE", "code": "CISC 1110", "min_grade": "C" },
    { "type": "COURSE", "code": "CISC 1115", "min_grade": "C" }
  ]}],
  "BUSN 3120": [{ "type": "OR", "options": [
    { "type": "COURSE", "code": "CISC 1050", "min_grade": "C" },
    { "type": "COURSE", "code": "CISC 1110", "min_grade": "C" },
    { "type": "COURSE", "code": "CISC 1115", "min_grade": "C" }
  ]}],
  "CISC 2532": [{ "type": "OR", "options": [
    { "type": "COURSE", "code": "CISC 1590", "min_grade": "C" },
    { "type": "COURSE", "code": "BUSN 3420", "min_grade": "C" }
  ]}],
  "BUSN 2432": [{ "type": "OR", "options": [
    { "type": "COURSE", "code": "CISC 1590", "min_grade": "C" },
    { "type": "COURSE", "code": "BUSN 3420", "min_grade": "C" }
  ]}],
  "BUSN 4202W": [{ "type": "AND", "conditions": [
    { "type": "COURSE", "code": "ENGL 1012", "min_grade": "C" },
    { "type": "COURSE", "code": "BUSN 3200", "min_grade": "C" }
  ]}],
  "CISC 1580W": [{ "type": "AND", "conditions": [
    { "type": "COURSE", "code": "ENGL 1012", "min_grade": "C" },
    { "type": "COURSE", "code": "BUSN 3200", "min_grade": "C" }
  ]}],
  "FINC 3310": [{ "type": "AND", "conditions": [
    { "type": "COURSE", "code": "ACCT 2001", "min_grade": "C" },
    { "type": "COURSE", "code": "ECON 2100", "min_grade": "C" },
    { "type": "COURSE", "code": "ECON 2200", "min_grade": "C" },
    { "type": "OR", "options": [{ "type": "COURSE", "code": "BUSN 3400", "min_grade": "C" }, { "type": "COURSE", "code": "ECON 3400", "min_grade": "C" }] }
  ]}],
  "ACCT 2001": [{ "type": "NOTE", "text": "Must not have passed prior equivalent courses. Speak with an advisor." }],
  "BUSN 3400": [{ "type": "COURSE", "code": "MATH 1101", "min_grade": "C-" }],
  "ECON 3400": [{ "type": "COURSE", "code": "MATH 1101", "min_grade": "C-" }],
  "PSYC 3400": [{ "type": "COURSE", "code": "PSYC 1000", "min_grade": "C-" }],
  "BUSN 3410": [{ "type": "OR", "options": [{ "type": "COURSE", "code": "ECON 2200", "min_grade": "C" }, { "type": "COURSE", "code": "BUSN 2200", "min_grade": "C" }] }],
  "ECON 3410": [{ "type": "OR", "options": [{ "type": "COURSE", "code": "ECON 2200", "min_grade": "C" }, { "type": "COURSE", "code": "BUSN 2200", "min_grade": "C" }] }],
  "BUSN 3421": [{ "type": "AND", "conditions": [
    { "type": "OR", "options": [
      { "type": "COURSE", "code": "BUSN 3400", "min_grade": "C" },
      { "type": "COURSE", "code": "ECON 3400", "min_grade": "C" },
      { "type": "COURSE", "code": "MATH 2501", "min_grade": "C" },
      { "type": "COURSE", "code": "PSYC 3400", "min_grade": "C" }
    ]},
    { "type": "OR", "options": [
      { "type": "COURSE", "code": "CISC 1050", "min_grade": "ANY" },
      { "type": "NOTE", "text": "Proficiency with spreadsheets" }
    ]}
  ]}],
  "CISC 2590": [{ "type": "AND", "conditions": [
    { "type": "OR", "options": [
      { "type": "COURSE", "code": "BUSN 3400", "min_grade": "C" },
      { "type": "COURSE", "code": "ECON 3400", "min_grade": "C" },
      { "type": "COURSE", "code": "MATH 2501", "min_grade": "C" },
      { "type": "COURSE", "code": "PSYC 3400", "min_grade": "C" }
    ]},
    { "type": "OR", "options": [
      { "type": "COURSE", "code": "CISC 1050", "min_grade": "ANY" },
      { "type": "NOTE", "text": "Proficiency with spreadsheets" }
    ]}
  ]}],

  // Cognitive Science specific prereqs
  "PHIL 3422": [{ "type": "NONE" }],
  "PSYC 1000": [{ "type": "NONE" }],
  "PSYC 3530": [{ "type": "COURSE", "code": "PSYC 1000", "min_grade": "C" }],
  "CISC 1410": [{ "type": "AND", "conditions": [
    { "type": "NOTE", "text": "Requires a prior CISC course." },
    { "type": "NOTE", "text": "Requires a prior PSYC course." }
  ]}],
  "PHIL 29": [{ "type": "AND", "conditions": [
    { "type": "OR", "options": [{ "type": "COURSE", "code": "CORE 1311", "min_grade": "C" }, { "type": "COURSE", "code": "CORE 1312", "min_grade": "C" }, { "type": "COURSE", "code": "MATH 1311", "min_grade": "C" }, { "type": "NOTE", "text": "A course in Computer and Information Science." }] },
    { "type": "OR", "options": [{ "type": "COURSE", "code": "CORE 1210", "min_grade": "C" }, { "type": "NOTE", "text": "A course in philosophy." }] }
  ]}],
  "PSYC 3580": [{ "type": "AND", "conditions": [
    { "type": "OR", "options": [{ "type": "COURSE", "code": "CORE 1311", "min_grade": "C" }, { "type": "COURSE", "code": "CORE 1312", "min_grade": "C" }, { "type": "COURSE", "code": "MATH 1311", "min_grade": "C" }, { "type": "NOTE", "text": "A course in Computer and Information Science." }] },
    { "type": "OR", "options": [{ "type": "COURSE", "code": "CORE 1210", "min_grade": "C" }, { "type": "NOTE", "text": "A course in philosophy." }] }
  ]}],

  // Data Science specific prereqs
  "CISC 3225": [{ "type": "AND", "conditions": [{ "type": "COURSE", "code": "CISC 1215", "min_grade": "C" }, { "type": "COURSE", "code": "CISC 2210", "min_grade": "C" }] }],
  "CISC 3440": [{ "type": "COURSE", "code": "CISC 3130", "min_grade": "C" }],
  "MATH 4531": [{ "type": "AND", "conditions": [
    { "type": "OR", "options": [{ "type": "COURSE", "code": "MATH 2501", "min_grade": "C" }, { "type": "COURSE", "code": "MATH 3501", "min_grade": "C" }] },
    { "type": "COURSE", "code": "MATH 2101", "min_grade": "C" }
  ]}],
  "MATH 2001": [{ "type": "COURSE", "code": "MATH 1206", "min_grade": "C-" }],

  // General Departmental Notes (if they appeared as prereq_rules and are truly program level)
  // These specific notes are removed from the majors/minors data below because
  // they are not direct prerequisites to be evaluated by the system's logic.
  // If they were intended to be displayed as part of the course information or program notes,
  // they should be stored elsewhere in the data structure or handled by a different display logic.
};

const majors = {
  "computer_science": [
    {
      "id": 1,
      "name": "Intro to Programming using Java or Java for Programmers",
      "options": ["Introduction to Programming using Java", "Java for Programmers"],
      "requirements": ["CISC 1115", "CISC 1170"],
      "prereq_rules": {} // Removed
    },
    {
      "id": 2,
      "name": "Core Computer Science Courses",
      "options": ["Introduction to Discrete Structures", "Introduction to Modern Programming Techniques", "Data Structures", "Design and Implementation of Large-Scale Applications", "Programming Paradigms in C++", "Principles of Computer Architecture", "Operating Systems"],
      "requirements": ["CISC 2210", "CISC 3115", "CISC 3130", "CISC 3140", "CISC 3142", "CISC 3310", "CISC 3320"],
      "prereq_rules": {} // Removed
    },
    {
      "id": 3,
      "name": "Analysis of Algorithms or Theoretical Computer Science",
      "options": ["Analysis of Algorithms", "Theoretical Computer Science"],
      "requirements": ["CISC 3220", "CISC 3230"],
      "prereq_rules": {} // Removed
    },
    {
      "id": 4,
      "name": "Independent Group and Study I or Research and Study I",
      "options": ["Independent Group and Study I", "Research and Study I"],
      "requirements": ["CISC 4900", "CISC 5001"],
      "prereq_rules": {} // Removed
    },
    {
      "id": 5,
      "name": "Computer and Ethics",
      "options": ["Computer and Ethics (CISC course)", "Computer and Ethics (PHILS course)"],
      "requirements": ["CISC 2820W", "PHIL 3318W"],
      "prereq_rules": {} // Removed
    },
    {
      "id": 6,
      "name": "Calculus I and Calculus II",
      "options": ["Calculus I", "Calculus II"],
      "requirements": ["MATH 1201", "MATH 1206"],
      "prereq_rules": {} // Removed
    },
    {
      "id": 7,
      "name": "Elementary Probability and Statistics or Probability and Statistics I",
      "options": ["Elementary Probability and Statistics", "Probability and Statistics I"],
      "requirements": ["MATH 2501", "MATH 3501"],
      "prereq_rules": {} // Removed
    },
    {
      "id": 8,
      "name": "Three additional courses chosen from CISC 3000-4899",
      "options": ["Review the list of CISC courses that are offered on Cunyfirst that fall under CISC 3000-4899"],
      "requirements": ["CISC 3115", "CISC 3130"],
      "prereq_rules": {} // Removed, as these were notes that caused the overwrite.
    }
  ],

  "multimedia_computing": [
    {
      "id": 1,
      "name": "Intro to Programming using Java or Java for Programmers",
      "options": ["Introduction to Programming using Java", "Java for Programmers"],
      "requirements": ["CISC 1115", "CISC 1170"],
      "prereq_rules": {} // Removed
    },
    {
      "id": 2,
      "name": 'Core Multimedia Computing Courses',
      "options": ["Introduction to Multimedia Computing", "Introduction to Discrete Structures", "Computer and Ethics", "Introduction to Modern Programming Techniques", "Data Structures", "Analysis of Algorithms", "Operating Systems", "Computer Graphics", "Multimedia Computing"],
      "requirements": ["CISC 1600", "CISC 2210", "CISC 2820W", "CISC 3115", "CISC 3130", "CISC 3220", "CISC 3320", "CISC 3620", "CISC 3630"],
      "prereq_rules": {} // Removed
    },
    {
      "id": 3,
      "name": "Independent Group and Study I or Research and Study I",
      "options": ["Independent Group and Study I", "Research and Study I"],
      "requirements": ["CISC 4900", "CISC 5001"],
      "prereq_rules": {} // Removed
    },
    {
      "id": 4,
      "name": 'Calculus I',
      "options": ['Calculus I'],
      "requirements": ['MATH 1201'],
      "prereq_rules": {} // Removed
    },
    {
      "id": 5,
      "name": 'Calculus II',
      "options": ['Calculus II'],
      "requirements": ['MATH 1206'],
      "prereq_rules": {} // Removed
    },
    {
      "id": 6,
      "name": 'Elementary Probability and Statistics I',
      "options": ['Elementary Probability and Statistics I'],
      "requirements": ['MATH 2501'],
      "prereq_rules": {} // Removed
    },
    {
      "id": 7,
      "name": 'One of CISC 3650 or CISC 3667',
      "options": ['Computer Human Interaction', 'Game Design and Development'],
      "requirements": ['CISC 3650', 'CISC 3667'],
      "prereq_rules": {} // Removed
    },
    {
      "id": 8,
      "name": 'Three additional courses chosen from CISC 3140, 3142, 3410, 3415, 3610, 3650, 3667, 3810, and 4610',
      "options": ['Design and Implementation of Large-Scale Applications', 'Programming Paradigms in C++', 'Artifical Intelligence', 'Principles of Robotics', 'Introduction to Multimedia Programming', 'Computer Human Interaction', 'Game Design and Development', 'Database Systems', 'Multimedia Database'],
      "requirements": ['CISC 3140', 'CISC 3142', 'CISC 3410', 'CISC 3610', 'CISC 3650', 'CISC 3667', 'CISC 3810', 'CISC 4610'],
      "prereq_rules": {} // Removed
    },
    {
      "id": 9,
      "name": 'Two courses chosen from among',
      "options": ['Art (ARTD) 2811, 2812, 2820, 2821,3812', 'Music (MUSC), 3261, 3322', 'FILM 1201, 2701', 'Television and Radio (TVRA) 2420, 3861, 2871, 3951'],
      "requirements": ['Two (ARTD) Electives', 'two MUSC Electives', 'two FILM Electives', 'or two (TVRA) electives'],
      "prereq_rules": {} // Removed
    }
  ],

  "information_systems": [
    {
      "id": 1,
      "name": "Intro to Programming using Java or Java for Programmers",
      "options": ["Introduction to Programming using Java", "Java for Programmers"],
      "requirements": ["CISC 1115", "CISC 1170"],
      "prereq_rules": {} // Removed
    },
    {
      "id": 2,
      "name": "Core Information System Classes",
      "options": ["Introduction to Modern Programming Techniques", "Data Structures", "Database Systems"],
      "requirements": ["CISC 3115", "CISC 3130", "CISC 3810"],
      "prereq_rules": {} // Removed
    },
    {
      "id": 3,
      "name": "Independent Group and Study I or Research and Study I",
      "options": ["Independent Group and Study I", "Research and Study I"],
      "requirements": ["CISC 4900", "CISC 5001"],
      "prereq_rules": {} // Removed
    },
    {
      "id": 4,
      "name": 'Students unfamiliar with PC application software (word processing spreadsheet software database management software and presentation software) should also complete CISC 1050. Knowledge of such software is prerequisite for CISC 3810.',
      "options": ['Introduction to Computer Applications'],
      "requirements": ["CISC 1050"],
      "prereq_rules": {} // Removed
    },
    {
      "id": 5,
      "name": 'Three courses chosen from CISC 3140, 3150, 3171, 3340, and 3410.',
      "options": ['Design and Implementation of Large-Scale Applications', 'Introduction to Software Engineering', 'Computer and Networks and Protocols', 'Artifical Intelligence'],
      "requirements": ['CISC 3140', 'CISC 3171', 'CISC 3340', 'CISC 3410'],
      "prereq_rules": {} // Removed
    },
    {
      "id": 6,
      "name": "With permission of the chairperson of the Department of Computer and Information Science, the student may substitute one of the following courses for any course in the three-course choice above: CISC 3160, 3220, 3310, 3320, 3610, 3630",
      "options": ["Programming Languages", "Analysis of Algorithms", "Principles of Computer Architecture", "Operating Systems", "Introduction to Multimedia Programming", "Multimedia Computing"],
      "requirements": ["CISC 3160", "CISC 3220", "CISC 3310", "CISC 3320", "CISC 3610", "CISC 3630"],
      "prereq_rules": {} // Removed
    },
    {
      "id": 7,
      "name": "Computer and Ethics",
      "options": ["Computer and Ethics (CISC course)", "Computer and Ethics (PHILS course)"],
      "requirements": ["CISC 2820W", "PHIL 3318W"],
      "prereq_rules": {} // Removed
    },
    {
      "id": 8,
      "name": "Management Information Systems (CISC)/Management Information Systems (BUSN)",
      "options": ["Management Information Systems (CISC)", "Management Information Systems (BUSN)"],
      "requirements": ['CISC 1590', 'BUSN 3420'],
      "prereq_rules": {} // Removed
    },
    {
      "id": 9,
      "name": 'Electronic Commerence (CISC)/Electronic Commerence (BUSN) or Information Systems Project Management (CISC)/Information Systems Project Management (BUSN)',
      "options": ['Electronic Commerence (CISC)', 'Electronic Commerence (BUSN)', 'Information Systems Project Management (CISC)', 'Information Systems Project Management (BUSN)'],
      "requirements": ['CISC 1530', 'BUSN 3120', 'CISC 2532', 'BUSN 2432'],
      "prereq_rules": {} // Removed
    },
    {
      "id": 10,
      "name": 'Seminar in Computer-Assisted Management Games (BUSN) or Seminar in Computer-Assisted Management Games (CISC)',
      "options": ['Seminar in Computer-Assisted Management Games (BUSN)', 'Seminar in Computer-Assisted Management Games (CISC)'],
      "requirements": ['BUSN 4202W', 'CISC 1580W'],
      "prereq_rules": {} // Removed
    },
    {
      "id": 11,
      "name": 'Elementary Macroeconomics (ECON)/Elementary Macroeconomics (BUSN) and Elementary Microeconomics (ECON)/Elementary Microeconomics (BUSN) and Principles of Management (BUSN)',
      "options": ['Elementary Macroeconomics (ECON)', 'Elementary Macroeconomics (BUSN)', 'Elementary Microeconomics (ECON)', 'Elementary Macroeconomics (BUSN)', 'Principles of Management (BUSN)'],
      "requirements": ['ECON 2100', 'BUSN 2100', 'ECON 2200', 'BUSN 2200', 'BUSN 3200'],
      "prereq_rules": {} // Removed
    },
    {
      "id": 12,
      "name": 'Principles of Financial Management',
      "options": ['Principles of Financial Management'],
      "requirements": ['FINC 3310'],
      "prereq_rules": {} // Removed
    },
    {
      "id": 13,
      "name": 'Principles of Accounting I (Financial)',
      "options": ['Principles of Accounting I (Financial)'],
      "requirements": ['ACCT 2001'],
      "prereq_rules": {} // Removed
    },
    {
      "id": 14,
      "name": 'Introduction to Economic and Business Statistics (ECON)/Introduction to Economic and Business Statistics (BUSN) or Elementary and Probability Statistics I/Probability and Statistics I or Statistical Methods in Pyschological Research',
      "options": ['Introduction to Economic and Business Statistics (ECON)', 'Introduction to Economic and Business Statistics (BUSN)', 'Elementary and Probability Statistics I', 'Probability and Statistics I', 'Statistical Methods in Pyschological Research'],
      "requirements": ['BUSN 3400', 'ECON 3400', 'MATH 2501', 'MATH 3501', 'PSYC 3400'],
      "prereq_rules": {} // Removed
    },
    {
      "id": 15,
      "name": 'Fundamental Methods of Mathematical Economics I (BUSN)/Fundamental Methods of Mathematical Economics I (ECON) or Calculus I or Foundations of Business Analytics (BUSN)/ Foundation of Business Analytics (CISC)',
      "options": ['Fundamental Methods of Mathematical Economics I (BUSN)', 'Fundamental Methods of Mathematical Economics I (ECON)', 'Calculus I', 'Foundations of Business Analytics (BUSN)', 'Foundations of Business Analytics (CISC)'],
      "requirements": ['BUSN 3410', 'ECON 3410', 'MATH 1201', 'BUSN 3421', 'CISC 2590'],
      "prereq_rules": {} // Removed
    }
  ],
};

const minors = {
  "computer_science": [
    {
      "id": 1,
      "name": "Option #1: Introduction to Programming using Java, Introduction to Discrete Structures, Introduction to Modern Programming Techniques, Data Structures, and Principles of Computer Architecture",
      "options": ["Introduction to Programming using Java", "Introduction to Discrete Structures", "Introduction to Modern Programming Techniques", "Data Structures", "Principles of Computer Architecture"],
      "requirements": ["CISC 1115", "CISC 1110", "CISC 2210", "CISC 3110", "CISC 3115", "CISC 3130", "CISC 3310"],
      "prereq_rules": {} // Removed
    },
    {
      "id": 2,
      "name": "Option #2: Introduction to Programming using Java, Introduction to Computer Applications, Operations Management or Discrete Structures, Introuction to Modern Programming Techniques, and Data Structures or Multimedia Computing",
      "options": ["Introduction to Programming using Java", "Introduction to Computer Applications", "Operations Management", "Discrete Structures", "Introduction to Modern Programming Techniques", "Data Structures", "Multimedia Computing"],
      "requirements": ["CISC 1115", "CISC 1110", "CISC 1050", "CISC 2531", "CISC 2210", "CISC 3110", "CISC 3115", "CISC 3130", "CISC 3630"],
      "prereq_rules": {} // Removed
    },
    {
      "id": 3,
      "name": "Option #3: Introduction to Programming using Java, Introduction to Modern Programming Techniques, Data Structures, and two additional courses numbered 2000 or above (however, make sure that you fulfill any prerequisites)",
      "options": ["Introduction to Programming using Java", "Introduction to Modern Programming Techniques", "Data Structures", "Two additional courses numbered 2000 or above"],
      "requirements": ["CISC 1115", "CISC 1110", "CISC 3110", "CISC 3115", "CISC 3130", "Two additional courses numbered 2000 or above"],
      "prereq_rules": {} // Removed
    }
  ],
  "multimedia_computing": [
    {
      "id": 1,
      "name": "Introduction to Programming using Java or Java for Programmers",
      "options": ["Introduction to Programming using Java", "Java for Programmers"],
      "requirements": ["CISC 1115", "CISC 1170"],
      "prereq_rules": {} // Removed
    },
    {
      "id": 2,
      "name": "Introduction to Multimedia Computing",
      "options": ["Introduction to Multimedia Computing"],
      "requirements": ["CISC 1600"],
      "prereq_rules": { } // Removed
    },
    {
      "id": 3,
      "name": "Introduction to Modern Programming Techniques",
      "options": ["Introduction to Modern Programming Techniques"],
      "requirements": ["CISC 3115"],
      "prereq_rules": {} // Removed
    },
    {
      "id": 4,
      "name": "Data Structures",
      "options": ["Data Structures"],
      "requirements": ["CISC 3130"],
      "prereq_rules": {} // Removed
    },
    {
      "id": 5,
      "name": "Computer Graphic or Multimedia Computing",
      "options": ["Computer Graphics", "Multimedia Computing"],
      "requirements": ["CISC 3620", "CISC 3630"],
      "prereq_rules": {} // Removed
    },
    {
      "id": 6,
      "name": "Three courses chosen from among the following: CISC 3610, 3620, 3630, 3650, 3667, 4610",
      "options": ["Introduction to Multimedia Programming", "Computer Graphics", "Multimedia Computing", "Computer Human Interaction", "Game Design and Development", "Multimedia Database"],
      "requirements": ["CISC 3610", "CISC 3620", "CISC 3630", "CISC 3650", "CISC 3667", "CISC 4610"],
      "prereq_rules": {} // Removed
    }
  ],
  "cognitive_science": [
    {
      "id": 1,
      "name": "Philosophical Issues in Cognitive Science",
      "options": ["Philosophical Issues in Cognitive Science"],
      "requirements": ["PHIL 3422"],
      "prereq_rules": {} // Removed
    },
    {
      "id": 2,
      "name": "Introduction to Programming using Java",
      "options": ["Introduction to Programming using Java"],
      "requirements": ["CISC 1115"],
      "prereq_rules": {} // Removed
    },
    {
      "id": 3,
      "name": "Introduction Pyschology and Advanced Cognitive Pyschology",
      "options": ["Introduction Pyschology", "Advanced Cognitive Pyschology"],
      "requirements": ["PSYC 1000", "PSYC 3530"],
      "prereq_rules": {} // Removed
    },
    {
      "id": 4,
      "name": "Option A: PHIL 3123, 3410, 3401, 3420, or 3601.",
      "options": ["Twentieth-Century Philosophy", "Epistemology: Theory of Knowledge", "Metaphysics", "Philosophy of Mind", "Philosophy of Science"],
      "requirements": ["PHIL 3123", "PHIL 3410", "PHIL 3401", "PHIL 3420", "PHIL 3601"],
      "prereq_rules": {} // Removed
    },
    {
      "id": 5,
      "name": "Option B: CISC 1410 or 3410; or PHIL 29, or PSYC 3580",
      "options": ["Philosophy and Artifical Intelligence (CISC)", "Artifical Intelligence", "Philosophy and Artifical Intelligence (PYSC)"],
      "requirements": ["CISC 1410", "CISC 3410", "PHIL 29", "PSYC 3580"],
      "prereq_rules": {} // Removed
    }
  ],
  "data_science": [
    {
      "id": 1,
      "name": "Data Tools and Algorithms and Machine Learning",
      "options": ["Data Tools and Algorithms", "Machine Learning"],
      "requirements": ["CISC 3225", "CISC 3440"],
      "prereq_rules": {} // Removed
    },
    {
      "id": 2,
      "name": "Applied Intermediate Statistics",
      "options": ["Applied Intermediate Statistics"],
      "requirements": ["MATH 4531"],
      "prereq_rules": {} // Removed
    },
    {
      "id": 3,
      "name": "Either MATH 2001 and MATH 3501, or CISC 2210 and MATH 2501",
      "options": ["Transition to Advanced Mathematics", "Probability and Statistics I", "Introduction to Discrete Structures", "Elementary Probability and Statistics"],
      "requirements": ["MATH 2001", "MATH 3501", "CISC 2210", "MATH 2501"],
      "prereq_rules": {} // Removed
    },
    {
      "id": 4,
      "name": "One additional course, chosen from among the following: ",
      "options": ["Elementary Microeconomics or Advanced Economic and Business Statistics, Philosophy and Artifical Intelligence or Artifical Intelligence, Global Financial Management, Elementary Microeconomics or Investment Science (ECON) or Fundamental Methods of Mathematical Economics II, Investment Science (MATH) or Linear Algebra II or Probability and Statistics II, Introductory Formal Logic or Symbolic Logic or Philosophy and Artificial Intelligence (PHIL), Survey Research or Mapping Politics: GIS Methods in Political Science, Learning (PYSC) or Sensation and Perception or Advanced Cognitive Psychology or Philosophy and Artificial Intelligence (PYSC) or Advanced Psychological Statistics, Mapping Social Data or Population and Society"],
      "requirements": ["BUSN 2200", "BUSN 4400W", "CISC 1410", "CISC 3130", "FINC 3377", "ECON 2200", "ECON 3370", "ECON 4422", "MATH 3601", "MATH 4101", "MATH 4501", "PHIL 3203", "PHIL 3204", "PHIL 3423", "POLS 3014W", "POLS 3421", "POLS 3423", "PSYC 3510", "PSYC 3520", "PSYC 3530", "PSYC 3580", "PSYC 4400", "SOCY 3506", "SOCY 3604"],
      "prereq_rules": {} // Removed
    }
  ]
};

const gradeOptions = ['A','A-','B+','B','B-','C+','C','C-','D+','D','F','W','P','NP'];

export default function CheckPrerequisites() {
  // === state ===
  const [major, setMajor] = useState('');
  const [courseToCheck, setCourseToCheck] = useState('');
  const [courseHistory, setCourseHistory] = useState([]);
  const [newCourse, setNewCourse] = useState({ code: '', grade: 'A' });
  const [results, setResults] = useState(null);
  const [message, setMessage] = useState('');

  // === 2) build historyMap ===
  const historyMap = useMemo(() => {
    return courseHistory.reduce((m, c) => {
      m[c.code] = c;
      return m;
    }, {});
  }, [courseHistory]);

  // === 3) patched prereqMap - UPDATED TO USE 'prereq_rules'
  const prereqMap = useMemo(() => {
    // Now, prereqMap simply references the global allCoursePrerequisites
    return allCoursePrerequisites;
  }, []);

  // === 4) grade utils ===
  const gradeValues = {
    A:4.0,'A-':3.7,'B+':3.3,B:3.0,'B-':2.7,'C+':2.3,C:2.0,'C-':1.7,'D+':1.3,D:1.0,
    F:0.0,W:0.0,NP:0.0,P:5.0,ANY:0.0 // Added ANY for grade comparison logic
  };
  const isGradeMet = (actual, required) => {
    // If required grade is 'ANY' or 'NONE', any passing grade (not W, F, NP) is sufficient.
    if (required === 'ANY' || required === 'NONE') {
      return !['W','F','NP'].includes(actual);
    }
    // If actual grade is 'P' (Pass), it satisfies any requirement.
    if (actual === 'P') return true;
    // For letter grades, compare values.
    return gradeValues[actual] >= gradeValues[required];
  };

  // === 5) evaluator (unchanged) ===
  const evaluateRuleCondition = (condition, details, course) => {
    if (condition.type === 'COURSE') {
      const sc = historyMap[condition.code];
      if (condition.must_not_have) { // Used for EXCLUDE type implicitly
        if (sc) { details.push(`FAILED: has ${condition.code}`); return false }
        details.push(`Met: does not have ${condition.code}`); return true;
      }
      if (!sc)   { details.push(`FAILED: missing ${condition.code}`); return false }
      if (!isGradeMet(sc.grade, condition.min_grade)) {
        details.push(`FAILED: ${condition.code} grade ${sc.grade} < ${condition.min_grade}`);
        return false;
      }
      details.push(`Met: ${condition.code} with ${sc.grade}`); return true;

    } else if (condition.type === 'EXCLUDE') {
      const exclCondition = { ...condition.conditions[0], must_not_have: true };
      return evaluateRuleCondition(exclCondition, details, course);

    } else if (condition.type === 'AND') {
      let allMet = true;
      details.push('Checking AND conditions:');
      for (let sub of condition.conditions) {
        const subDetails = [];
        if (!evaluateRuleCondition(sub, subDetails, course)) {
          allMet = false;
          details.push(`  FAILED sub-condition: ${JSON.stringify(sub)} -> ${subDetails.join('; ')}`);
          break;
        } else {
          details.push(`  Met sub-condition: ${JSON.stringify(sub)} -> ${subDetails.join('; ')}`);
        }
      }
      if (allMet) {
        details.push('All AND conditions met.');
      } else {
        details.push('One or more AND conditions failed.');
      }
      return allMet;

    } else if (condition.type === 'OR') {
      let ok = false;
      let fails = [];
      details.push('Checking OR options:');
      for (let o of condition.options) {
        const tmp = [];
        if (evaluateRuleCondition(o, tmp, course)) {
          ok = true;
          details.push(`  Met OR option: ${JSON.stringify(o)} -> ${tmp.join('; ')}`);
          break;
        }
        fails.push(`  Failed OR option: ${JSON.stringify(o)} -> ${tmp.join('; ')}`);
      }
      if (!ok) details.push(`FAILED: no OR option met (${fails.join(' | ')})`);
      return ok;

    } else if (condition.type === 'EXEMPTION') {
      // Exemption means if the exemption condition is met, the course is eligible,
      // REGARDLESS of other prerequisites for that course.
      const ex = condition.conditions[0];
      const exemptionDetails = [];
      if (evaluateRuleCondition(ex, exemptionDetails, course)) {
        details.push(`Met: exempt by ${ex.code} (${exemptionDetails.join('; ')})`);
        return true; // This exemption means the course is eligible.
      }
      details.push(`Exemption condition not met: ${exemptionDetails.join('; ')}`);
      return false; // If the exemption is not met, continue checking other rules.

    } else if (condition.type === 'NONE') {
      details.push('Info: no prerequisites specified (NONE)'); return true;

    } else if (condition.type === 'NOTE') {
      details.push(`Note: ${condition.text}`); return true;
    }

    details.push(`Warning: unknown type ${condition.type}`); return false;
  };

  // === 6) handleCheck ===
  const handleCheck = () => {
    // Direct lookup in the global allCoursePrerequisites object
    const prereqsForCourse = allCoursePrerequisites[courseToCheck];
    if (!prereqsForCourse) {
      setMessage(`No specific prerequisites found for ${courseToCheck}.`);
      setResults(null);
      return;
    }

    const details = [];
    let passed = true;

    // If an exemption rule is present, check it first.
    // If the exemption applies, the course is eligible regardless of other rules.
    const exemptionRule = prereqsForCourse.find(rule => rule.type === 'EXEMPTION');
    if (exemptionRule) {
        const exemptionDetails = [];
        if (evaluateRuleCondition(exemptionRule, exemptionDetails, courseToCheck)) {
            details.push(`Course eligible due to exemption: ${exemptionDetails.join('; ')}`);
            passed = true;
            setResults({ course: courseToCheck, passed, details });
            setMessage('');
            return;
        } else {
            details.push(`Exemption condition not met: ${exemptionDetails.join('; ')}`);
            // If exemption not met, proceed to check other rules.
        }
    }

    // Evaluate all other non-exemption rules
    for (let rule of prereqsForCourse) {
        if (rule.type === 'EXEMPTION') continue; // Already handled above
        const ruleDetails = [];
        if (!evaluateRuleCondition(rule, ruleDetails, courseToCheck)) {
            details.push(`Rule failed: ${JSON.stringify(rule)} -> ${ruleDetails.join('; ')}`);
            passed = false;
            break; // Stop on first failed rule
        } else {
            details.push(`Rule met: ${JSON.stringify(rule)} -> ${ruleDetails.join('; ')}`);
        }
    }

    setResults({ course: courseToCheck, passed, details });
    setMessage('');
  };

  // === UI ===
  const coursesListForSelectedProgram = useMemo(() => {
    if (!major) return [];
    const currentCoursesData = majors[major] || minors[major];
    const courseCodes = new Set();
    currentCoursesData.forEach(group => {
      group.requirements.forEach(req => {
        // Only add courses for which we have a defined prerequisite rule,
        // or courses that are explicitly part of the major/minor if they don't have prereqs.
        // We should avoid adding the "Two (ARTD) Electives" etc. to the course selection dropdown
        // as these are placeholders, not actual course codes.
        if (allCoursePrerequisites[req] || !req.includes(' ')) { // Simple heuristic to exclude descriptive requirements
          courseCodes.add(req);
        }
      });
    });
    return Array.from(courseCodes).sort();
  }, [major]);


  const availableMajors = Object.keys(majors).map(m => ({ type: 'major', name: m }));
  const availableMinors = Object.keys(minors).map(m => ({ type: 'minor', name: m }));

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto' }}>
      <h2>Check Prerequisites</h2>

      <div>
        Program:{' '}
        <select value={major} onChange={e=>{
          setMajor(e.target.value);
          setCourseToCheck('');
          setResults(null);
        }}>
          <option value="">-- Select Major/Minor --</option>
          <optgroup label="Majors">
            {availableMajors.map(m => (
              <option key={m.name} value={m.name}>{m.name.replace(/_/g,' ')}</option>
            ))}
          </optgroup>
          <optgroup label="Minors">
            {availableMinors.map(m => (
              <option key={m.name} value={m.name}>{m.name.replace(/_/g,' ')}</option>
            ))}
          </optgroup>
        </select>
      </div>

      {major && (
        <div style={{ marginTop: 8 }}>
          Course:{' '}
          <select
            value={courseToCheck}
            onChange={e => { setCourseToCheck(e.target.value); setResults(null) }}
          >
            <option value="">-- Select Course --</option>
            {coursesListForSelectedProgram.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      )}

      <div style={{ marginTop: 16, padding: 8, border: '1px solid #ccc' }}>
        <strong>Course History</strong><br/>
        <input
          placeholder="Course Code (e.g., CISC 1115)"
          value={newCourse.code}
          onChange={e => setNewCourse(n=>({...n, code:e.target.value.toUpperCase()}))}
        />
        <select
          value={newCourse.grade}
          onChange={e => setNewCourse(n=>({...n, grade:e.target.value}))}
        >
          {gradeOptions.map(g => <option key={g} value={g}>{g}</option>)}
        </select>
        <button onClick={()=>{
          if (!newCourse.code) return;
          setCourseHistory(h=>[...h,newCourse]);
          setNewCourse({code:'',grade:'A'});
          setResults(null);
        }}>
          Add Course
        </button>
        <ul style={{ maxHeight: '150px', overflowY: 'auto', paddingLeft: '20px' }}>
          {courseHistory.map((c,i)=>(
            <li key={i}>
              {c.code} — {c.grade}
              <button
                style={{ marginLeft: '10px', fontSize: '0.8em', padding: '2px 5px' }}
                onClick={() => {
                  setCourseHistory(h => h.filter((_, idx) => idx !== i));
                  setResults(null);
                }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button
        style={{ marginTop: 16, padding: '10px 20px', cursor: 'pointer' }}
        onClick={handleCheck}
        disabled={!courseToCheck || courseHistory.length===0}
      >
        Check Prerequisites
      </button>

      {message && <p style={{ color: 'red', marginTop: '10px' }}>{message}</p>}
      {results && (
        <div style={{ marginTop: 16, padding: '10px', border: '1px solid #eee', backgroundColor: results.passed ? '#e6ffe6' : '#ffe6e6' }}>
          <h3>
            {results.course} — {results.passed? '✅ Eligible' : '❌ Not eligible'}
          </h3>
          <ul style={{ paddingLeft: '20px' }}>
            {results.details.map((d,i)=><li key={i}>{d}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}