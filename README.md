# Job Portal Website(CRUD_OPERATIONS)

## Table of Contents
- [Introduction](#introduction)
- [API Documentation](#api-documentation)
- [Tech Stack](#tech-stack)
- [Future Scope](#future-scope)
- [Dependencies](#dependencies)

## Introduction
The job portal website is designed to streamline the job search process for both recruiters and job seekers. Recruiters can post new job listings, manage existing listings, and review applications from potential candidates. Job seekers can find relevant job opportunities, apply for them directly through the platform, and track their application status.

## API Documentation
### User Registration and Login
- **POST /register**: Register a new user
  - Request Body: `{ "name": "string", "email": "string", "password": "string" }`
  - Response: `201 Created`
- **POST /login**: Log in a user
  - Request Body: `{ "email": "string", "password": "string" }`
  - Response: `200 OK`

### Job Posting and Management
- **POST /jobs**: Create a new job listing
  - Request Body: `{ "title": "string", "description": "string", "company": "string", "location": "string", "salary": "number", "applyBy": "date", "skills": "array" }`
  - Response: `201 Created`
- **GET /jobs**: Retrieve all job listings
  - Response: `200 OK`
- **PUT /jobs/:id**: Update a job listing
  - Request Body: `{ "title": "string", "description": "string", "company": "string", "location": "string", "salary": "number", "applyBy": "date", "skills": "array" }`
  - Response: `200 OK`
- **DELETE /jobs/:id**: Delete a job listing
  - Response: `200 OK`

### Job Searching and Application
- **GET /jobs/search**: Search for job listings by category, location, or keywords
  - Query Parameters: `category=string&location=string&keywords=string`
  - Response: `200 OK`
- **POST /jobs/:id/apply**: Apply for a job
  - Request Body: `{ "name": "string", "contactDetails": "string", "resume": "file" }`
  - Response: `200 OK`

### Applicant Management
- **GET /jobs/:id/applicants**: Retrieve applicants for a specific job listing
  - Response: `200 OK`
- **GET /applicants/:id**: Retrieve detailed information about an applicant
  - Response: `200 OK`

## Tech Stack
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Templating Engine**: EJS
- **Version Control**: Git

## Future Scope
- **Enhanced Search Filters**: Adding more advanced search filters for job seekers.
- **AI-Powered Recommendations**: Implementing AI to recommend jobs to seekers based on their profiles and past applications.
- **Mobile App**: Developing a mobile application for on-the-go access.
- **Integration with Social Media**: Allowing users to share job postings and applications through social media platforms.
- **Analytics Dashboard**: Providing recruiters with detailed analytics on job postings and applicant trends.

## Dependencies
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web framework for Node.js
- **MongoDB**: NoSQL database
- **EJS**: Templating engine
- **Mongoose**: ODM for MongoDB and Node.js
- **Body-parser**: Middleware for parsing incoming request bodies
- **bcrypt**: Library for hashing passwords
- **jsonwebtoken**: Library for working with JSON Web Tokens (JWT)
- **multer**: Middleware for handling multipart/form-data (for file uploads)
- **dotenv**: Module to load environment variables from a `.env` file

