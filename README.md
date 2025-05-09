# CIS Course Helper Web App

![Project Banner](https://github.com/user-attachments/assets/2ee2681c-e5e2-4842-ae82-89c179c34117) <!-- Replace with actual image -->

A web application designed to help Brooklyn College CIS students navigate their degree requirements and course planning.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Development Timeline](#development-timeline)
- [Contributing](#contributing)
- [License](#license)

## Video
[Link](https://www.loom.com/share/786248a679224b71bb22556001f421f5?sid=c8229fc9-a2f3-4ff9-89ae-a623a2d9ac9d)

## Features

### Core Functionality
✔️ Display complete graduation requirements for CIS majors  
✔️ Prerequisite validation for courses  
✔️ Personalized course planning based on completed classes  
✔️ Visual progress tracking toward degree completion  

### Future Enhancements
◻️ Integration with CUNYfirst system  
◻️ Professor ratings and reviews  
◻️ Schedule conflict detection  

## Trello
[Trello](https://trello.com/invite/b/67bc31783ada4f88b380032e/ATTI5a76982f9bf7ba8fdf84fb60ebd285703FB14B76/cis-course-helper-web-app)

## Tech Stack

### Frontend
- React.js
- Material-UI (for styling)
- React Router (for navigation)

### Backend
- Node.js
- Express.js

### Database
- MongoDB (with Mongoose ODM)

### Deployment
- Frontend: Vercel/Netlify
- Backend: Heroku
- Database: MongoDB Atlas

## Installation

### Prerequisites
- Node.js (v14+)
- MongoDB (v4.4+)
- npm (v6+)

### Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/cis-course-helper.git
   cd cis-course-helper

# Frontend
cd client
npm install

# Backend
cd ../server
npm install

cp .env.example .env
# Edit the .env file with your configuration

# In one terminal (backend)
cd server
npm run dev

# In another terminal (frontend)
cd client
npm start


Development Timeline
Phase	Weeks	Tasks
Planning	1-2	Requirements gathering, system design, database schema
Backend	3-5	API development, database integration, authentication
Frontend	6-8	UI components, user flows, state management
Integration	9-10	Connect frontend to backend, data validation
Testing	11-12	Unit testing, integration testing, user testing
Finalization	13	Polish UI, prepare demo, documentation

Copyright @ Faizan Khan
			
