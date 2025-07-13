import axios from 'axios';

// Real CUNY course data structure
const COURSE_REQUIREMENTS = {
  majors: {
    'Computer Science': {
      code: 'CISC',
      totalCredits: 120,
      majorCredits: 60,
      requirements: {
        core: [
          'CISC 1115', // Introduction to Programming and Problem Solving
          'CISC 3115', // Modern Programming Techniques  
          'CISC 3130', // Data Structures
          'CISC 3140', // Design and Analysis of Algorithms
          'CISC 3160', // Side Effects and Order of Evaluation
          'CISC 3220', // System Level Programming
          'CISC 3230', // Theoretical Computer Science
          'CISC 3305', // Database Systems
          'CISC 3320', // Numerical Methods and Computing
          'CISC 3810', // Computer Organization and Assembly Language
          'CISC 4900', // Senior Project in Computer Science
        ],
        electives: [
          'CISC 3171', // Data Science Programming
          'CISC 3210', // Software Engineering
          'CISC 3250', // Artificial Intelligence
          'CISC 3280', // Computer Graphics
          'CISC 3620', // Computer Networks and Internets
          'CISC 4001', // Web Programming
          'CISC 4080', // Computer Vision
          'CISC 4631', // Data Mining
          'CISC 4650', // Abstract Algebra for Computer Science
        ],
        math: [
          'MATH 1011', // Pre-Calculus Mathematics
          'MATH 1201', // Calculus I
          'MATH 1206', // Calculus II  
          'MATH 2501', // Discrete Mathematics
          'STAT 2103'   // Introduction to Statistics
        ]
      }
    },
    'Computer Information Systems': {
      code: 'CISC',
      totalCredits: 120,
      majorCredits: 54,
      requirements: {
        core: [
          'CISC 1115', // Introduction to Programming
          'CISC 1590', // Laboratory for CISC 1115
          'CISC 2210', // Software Programming
          'CISC 3115', // Modern Programming Techniques
          'CISC 3120', // Design and Implementation of Software Applications Systems
          'CISC 3130', // Data Structures
          'CISC 3220', // System Level Programming
          'CISC 3305', // Database Systems
          'CISC 3810', // Computer Organization
          'CISC 4900', // Senior Project
        ],
        electives: [
          'CISC 3171', // Data Science Programming
          'CISC 3210', // Software Engineering
          'CISC 3620', // Computer Networks
          'CISC 4001', // Web Programming
          'CISC 4631', // Data Mining
        ],
        business: [
          'BUSN 1010', // Introduction to Business
          'ECON 2100', // Microeconomics
          'ACCT 2001', // Principles of Accounting I
        ]
      }
    },
    'Multimedia Computing': {
      code: 'CISC',
      totalCredits: 120,
      majorCredits: 60,
      requirements: {
        core: [
          'CISC 1115', // Introduction to Programming
          'CISC 3115', // Modern Programming Techniques
          'CISC 3130', // Data Structures
          'CISC 3140', // Design and Analysis of Algorithms
          'CISC 3280', // Computer Graphics
          'CISC 3620', // Computer Networks
          'CISC 4080', // Computer Vision
          'CISC 4900', // Senior Project
        ],
        multimedia: [
          'ART 2010',  // Digital Art
          'FILM 2001', // Introduction to Film
          'MUSC 2100', // Music Technology
        ],
        electives: [
          'CISC 3171', // Data Science Programming
          'CISC 3250', // Artificial Intelligence
          'CISC 4001', // Web Programming
        ]
      }
    }
  },
  minors: {
    'Computer Science': {
      totalCredits: 18,
      requirements: [
        'CISC 1115', // Introduction to Programming
        'CISC 3130', // Data Structures
        'CISC 3140', // Design and Analysis of Algorithms
        // Plus 2 electives from approved list
      ]
    },
    'Data Science': {
      totalCredits: 18,
      requirements: [
        'CISC 1115', // Introduction to Programming
        'CISC 3171', // Data Science Programming
        'STAT 2103', // Introduction to Statistics
        'CISC 4631', // Data Mining
        'MATH 1201', // Calculus I
        // Plus 1 elective
      ]
    },
    'Multimedia Computing': {
      totalCredits: 18,
      requirements: [
        'CISC 1115', // Introduction to Programming
        'CISC 3280', // Computer Graphics
        'CISC 4080', // Computer Vision
        'ART 2010',  // Digital Art
        // Plus 2 electives
      ]
    },
    'Cognitive Science': {
      totalCredits: 18,
      requirements: [
        'CISC 1115', // Introduction to Programming
        'CISC 3250', // Artificial Intelligence
        'PSYC 3450', // Cognitive Psychology
        'PHIL 3424', // Philosophy of Mind
        'LING 3340', // Psycholinguistics
        // Plus 1 elective
      ]
    }
  }
};

// Real course data from Brooklyn College
const COURSE_CATALOG = {
  'CISC 1115': {
    title: 'Introduction to Programming and Problem Solving',
    credits: 3,
    description: 'Programming techniques; primitive data types; arrays; control structures; modular programming using functions; algorithm development and refinement; testing and debugging; programming style.',
    prerequisites: [],
    corequisites: ['CISC 1590'],
    semester: ['Fall', 'Spring'],
    availability: 'High'
  },
  'CISC 1590': {
    title: 'Laboratory for CISC 1115',
    credits: 1,
    description: 'Laboratory exercises to accompany CISC 1115.',
    prerequisites: [],
    corequisites: ['CISC 1115'],
    semester: ['Fall', 'Spring'],
    availability: 'High'
  },
  'CISC 2210': {
    title: 'Software Programming',
    credits: 3,
    description: 'Programming in a high level language; sub-programs; parameters; file processing; arrays; debugging; program development.',
    prerequisites: ['CISC 1115'],
    corequisites: [],
    semester: ['Fall', 'Spring'],
    availability: 'High'
  },
  'CISC 3115': {
    title: 'Modern Programming Techniques',
    credits: 3,
    description: 'Programming techniques using a modern programming language; object-oriented programming; classes; data abstraction; inheritance.',
    prerequisites: ['CISC 1115', 'CISC 2210'],
    corequisites: [],
    semester: ['Fall', 'Spring'],
    availability: 'Medium'
  },
  'CISC 3120': {
    title: 'Design and Implementation of Software Applications Systems',
    credits: 3,
    description: 'Software engineering; design patterns; application frameworks; component technologies; client-server computing; web-based computing.',
    prerequisites: ['CISC 3115'],
    corequisites: [],
    semester: ['Fall', 'Spring'],
    availability: 'Medium'
  },
  'CISC 3130': {
    title: 'Data Structures',
    credits: 3,
    description: 'Trees, graphs, hash tables, searching and sorting algorithms; space/time trade-offs; object-oriented data abstraction.',
    prerequisites: ['CISC 3115', 'MATH 2501'],
    corequisites: [],
    semester: ['Fall', 'Spring'],
    availability: 'High'
  },
  'CISC 3140': {
    title: 'Design and Analysis of Algorithms',
    credits: 3,
    description: 'Algorithm design techniques; analysis of algorithms; NP-completeness; approximation algorithms.',
    prerequisites: ['CISC 3130'],
    corequisites: [],
    semester: ['Fall', 'Spring'],
    availability: 'Medium'
  },
  'CISC 3160': {
    title: 'Side Effects and Order of Evaluation',
    credits: 3,
    description: 'Programming language concepts; syntax and semantics; data types; control structures; subroutines; scope and lifetime.',
    prerequisites: ['CISC 3130'],
    corequisites: [],
    semester: ['Fall'],
    availability: 'Low'
  },
  'CISC 3171': {
    title: 'Data Science Programming',
    credits: 3,
    description: 'Programming for data science; data manipulation; statistical analysis; data visualization; machine learning basics.',
    prerequisites: ['CISC 3130', 'STAT 2103'],
    corequisites: [],
    semester: ['Fall', 'Spring'],
    availability: 'Medium'
  },
  'CISC 3210': {
    title: 'Software Engineering',
    credits: 3,
    description: 'Software development life cycle; requirements analysis; design methodologies; testing; project management.',
    prerequisites: ['CISC 3130'],
    corequisites: [],
    semester: ['Spring'],
    availability: 'Medium'
  },
  'CISC 3220': {
    title: 'System Level Programming',
    credits: 3,
    description: 'Unix/Linux programming; system calls; processes; inter-process communication; threads; network programming.',
    prerequisites: ['CISC 3130'],
    corequisites: [],
    semester: ['Fall'],
    availability: 'Medium'
  },
  'CISC 3230': {
    title: 'Theoretical Computer Science',
    credits: 3,
    description: 'Finite automata; regular expressions; context-free grammars; Turing machines; computability; complexity theory.',
    prerequisites: ['CISC 3140', 'MATH 2501'],
    corequisites: [],
    semester: ['Spring'],
    availability: 'Low'
  },
  'CISC 3250': {
    title: 'Artificial Intelligence',
    credits: 3,
    description: 'AI problem-solving techniques; search algorithms; knowledge representation; expert systems; machine learning.',
    prerequisites: ['CISC 3140'],
    corequisites: [],
    semester: ['Fall'],
    availability: 'Medium'
  },
  'CISC 3280': {
    title: 'Computer Graphics',
    credits: 3,
    description: '2D and 3D graphics; geometric transformations; rasterization; shading; graphics programming.',
    prerequisites: ['CISC 3130', 'MATH 1206'],
    corequisites: [],
    semester: ['Spring'],
    availability: 'Low'
  },
  'CISC 3305': {
    title: 'Database Systems',
    credits: 3,
    description: 'Database design; SQL; normalization; transaction processing; database administration.',
    prerequisites: ['CISC 3130'],
    corequisites: [],
    semester: ['Fall', 'Spring'],
    availability: 'High'
  },
  'CISC 3320': {
    title: 'Numerical Methods and Computing',
    credits: 3,
    description: 'Numerical algorithms; error analysis; interpolation; numerical integration; linear systems.',
    prerequisites: ['CISC 3130', 'MATH 1206'],
    corequisites: [],
    semester: ['Spring'],
    availability: 'Low'
  },
  'CISC 3620': {
    title: 'Computer Networks and Internets',
    credits: 3,
    description: 'Network protocols; TCP/IP; network programming; network security; distributed systems.',
    prerequisites: ['CISC 3220'],
    corequisites: [],
    semester: ['Spring'],
    availability: 'Medium'
  },
  'CISC 3810': {
    title: 'Computer Organization and Assembly Language',
    credits: 3,
    description: 'Computer architecture; assembly language programming; CPU design; memory systems; I/O systems.',
    prerequisites: ['CISC 3130'],
    corequisites: [],
    semester: ['Fall'],
    availability: 'Medium'
  },
  'CISC 4001': {
    title: 'Web Programming',
    credits: 3,
    description: 'Client-side and server-side web programming; HTML/CSS; JavaScript; web frameworks; databases.',
    prerequisites: ['CISC 3120'],
    corequisites: [],
    semester: ['Fall', 'Spring'],
    availability: 'High'
  },
  'CISC 4080': {
    title: 'Computer Vision',
    credits: 3,
    description: 'Image processing; feature detection; object recognition; machine learning for vision.',
    prerequisites: ['CISC 3280', 'CISC 3250'],
    corequisites: [],
    semester: ['Fall'],
    availability: 'Low'
  },
  'CISC 4631': {
    title: 'Data Mining',
    credits: 3,
    description: 'Data mining techniques; classification; clustering; association rules; text mining.',
    prerequisites: ['CISC 3171', 'STAT 2103'],
    corequisites: [],
    semester: ['Spring'],
    availability: 'Medium'
  },
  'CISC 4650': {
    title: 'Abstract Algebra for Computer Science',
    credits: 3,
    description: 'Mathematical foundations for computer science; groups; rings; fields; applications to cryptography.',
    prerequisites: ['MATH 2501'],
    corequisites: [],
    semester: ['Fall'],
    availability: 'Low'
  },
  'CISC 4900': {
    title: 'Senior Project in Computer Science',
    credits: 3,
    description: 'Independent research project under faculty supervision; project proposal; implementation; presentation.',
    prerequisites: ['Senior Standing', 'CISC 3140'],
    corequisites: [],
    semester: ['Fall', 'Spring'],
    availability: 'Medium'
  }
};

export class CourseService {
  static getCourseRequirements(majorType) {
    return COURSE_REQUIREMENTS.majors[majorType] || null;
  }

  static getMinorRequirements(minorType) {
    return COURSE_REQUIREMENTS.minors[minorType] || null;
  }

  static getCourseInfo(courseCode) {
    return COURSE_CATALOG[courseCode] || null;
  }

  static getAllCourses() {
    return COURSE_CATALOG;
  }

  static getCoursesForMajor(majorType) {
    const major = COURSE_REQUIREMENTS.majors[majorType];
    if (!major) return [];

    const allCourses = [...major.requirements.core];
    if (major.requirements.electives) allCourses.push(...major.requirements.electives);
    if (major.requirements.math) allCourses.push(...major.requirements.math);
    if (major.requirements.business) allCourses.push(...major.requirements.business);
    if (major.requirements.multimedia) allCourses.push(...major.requirements.multimedia);

    return allCourses.map(courseCode => ({
      ...COURSE_CATALOG[courseCode],
      code: courseCode,
      required: major.requirements.core.includes(courseCode)
    })).filter(course => course.title);
  }

  static checkPrerequisites(courseCode, completedCourses) {
    const course = COURSE_CATALOG[courseCode];
    if (!course) return { eligible: false, missing: [] };

    const missing = course.prerequisites.filter(prereq => 
      !completedCourses.includes(prereq) && prereq !== 'Senior Standing'
    );

    return {
      eligible: missing.length === 0,
      missing,
      course: course
    };
  }

  static getRecommendations(completedCourses, majorType, careerInterest) {
    const major = COURSE_REQUIREMENTS.majors[majorType];
    if (!major) return [];

    const recommendations = [];
    
    // Core courses not yet taken
    const missingCore = major.requirements.core.filter(course => 
      !completedCourses.includes(course)
    );

    missingCore.forEach(courseCode => {
      const prereqCheck = this.checkPrerequisites(courseCode, completedCourses);
      if (prereqCheck.eligible) {
        recommendations.push({
          courseCode,
          course: prereqCheck.course,
          priority: 'High',
          reason: 'Required core course for your major',
          type: 'Core Requirement'
        });
      }
    });

    // Career-based elective recommendations
    const careerMap = {
      'Software Development': ['CISC 3210', 'CISC 4001', 'CISC 3120'],
      'Data Science': ['CISC 3171', 'CISC 4631', 'STAT 2103'],
      'Artificial Intelligence': ['CISC 3250', 'CISC 4080', 'CISC 3171'],
      'Web Development': ['CISC 4001', 'CISC 3120', 'CISC 3620'],
      'System Programming': ['CISC 3220', 'CISC 3810', 'CISC 3620']
    };

    const careerCourses = careerMap[careerInterest] || [];
    careerCourses.forEach(courseCode => {
      if (!completedCourses.includes(courseCode)) {
        const prereqCheck = this.checkPrerequisites(courseCode, completedCourses);
        if (prereqCheck.eligible) {
          recommendations.push({
            courseCode,
            course: prereqCheck.course,
            priority: 'Medium',
            reason: `Excellent for ${careerInterest} career path`,
            type: 'Career Elective'
          });
        }
      }
    });

    return recommendations.slice(0, 5); // Return top 5 recommendations
  }

  static calculateProgress(completedCourses, majorType) {
    const major = COURSE_REQUIREMENTS.majors[majorType];
    if (!major) return { percentage: 0, completed: 0, total: 0 };

    const totalRequired = major.requirements.core.length;
    const completed = major.requirements.core.filter(course => 
      completedCourses.includes(course)
    ).length;

    return {
      percentage: Math.round((completed / totalRequired) * 100),
      completed,
      total: totalRequired,
      coreCompleted: completed,
      coreTotal: totalRequired
    };
  }
}

export { COURSE_REQUIREMENTS, COURSE_CATALOG };
