# CIS-Course-Helper-Web-App

CIS Course Helper Web App
Description

The CIS Course Helper Web App is designed to help students at Brooklyn College navigate their course schedule and ensure they are meeting the prerequisites required to graduate. This app provides tools for planning courses, checking prerequisites, and determining which courses to take and when.
Features

    Graduation Requirements: Displays the courses needed to graduate and tracks your progress.
    Prerequisite Checker: Allows students to check if they are eligible to take a specific class based on the courses they have already completed.
    Course Planning: Helps students determine what classes they still need to take and when they are offered, streamlining the process of creating a course schedule.

Tech Stack

    Frontend: React.js
    Backend: Node.js
    Database: MongoDB

Project Structure

    Frontend:
        React Components to display the course data, prerequisites, and graduation requirements.
    Backend:
        API developed using Node.js to handle logic related to course prerequisites, scheduling, and database interaction.
    Database:
        MongoDB to store courses, prerequisites, and student progress.

Installation
Prerequisites

    Node.js and npm (Node Package Manager)
    MongoDB

Steps

    Clone the repository:

git clone https://github.com/yourusername/cis-course-helper-web-app.git

Navigate to the project folder:

cd cis-course-helper-web-app

Install backend dependencies:

cd server
npm install

Install frontend dependencies:

cd client
npm install

Set up MongoDB. If using a local instance, ensure MongoDB is running:

mongod

Run the backend server:

cd server
npm start

Run the frontend development server:

    cd client
    npm start

    The web app will be accessible at http://localhost:3000.

Usage

    Graduation Progress: Once logged in, students can view a list of required courses and their completion status.
    Prerequisite Checker: Students can search for specific courses to check if they have met the prerequisites to enroll.
    Course Scheduling: A calendar view allows students to plan out which courses they need to take and when.

Timeline

    Weeks 1-2: Gathering requirements and initial design
    Weeks 3-5: Backend development (Node.js, MongoDB)
    Weeks 6-8: Frontend development (React components)
    Weeks 9-10: Integration of frontend and backend
    Weeks 11-12: Testing and bug fixing
    Week 13: Final design implementations and preparing the presentation

Copyright 2025 @ Faizan Khan
