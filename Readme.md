# Job Portal Backend API

<<<<<<< HEAD
A comprehensive RESTful API backend for a job portal application built with **Node.js**, **Express.js**, and **MongoDB**. This API provides complete functionality for job seekers and recruiters to manage job postings, applications, and user profiles.

## 🚀 Features
=======
A comprehensive job portal backend API built with Node.js, Express, and MongoDB.
>>>>>>> 89b80c8bb037800c398e4666254741f58df05bdd

- **🔐 User Authentication & Authorization**
  - JWT-based authentication with role-based access control
  - User registration with profile photo upload
  - Secure login/logout functionality
  - Profile management with resume upload

<<<<<<< HEAD
- **💼 Job Management**
  - Create, read, and manage job postings
  - Advanced job search with keyword filtering
  - Job categorization by type, experience level, and location
  - Company association with job postings

- **🏢 Company Management**
  - Company registration and profile management
  - Company logo upload functionality
  - Company information updates

- **📝 Application System**
  - Job application submission
  - Application status tracking (pending, accepted, rejected)
  - View applied jobs for job seekers
  - View applicants for recruiters

- **📁 File Upload System**
  - Profile photo uploads using Cloudinary
  - Resume upload functionality
  - Company logo uploads

## 🛠️ Technologies Used

- **Backend Framework:** Node.js, Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JSON Web Tokens (JWT)
- **File Upload:** Multer + Cloudinary
- **Environment Management:** dotenv
- **CORS:** Cross-origin resource sharing enabled
- **Cookie Management:** cookie-parser

## 📋 Prerequisites
=======
- **User Authentication**: Register, login, and logout functionality
- **User Management**: Profile updates with file uploads
- **Company Management**: Create and manage company profiles
- **Job Management**: Post, view, and manage job listings
- **Application System**: Apply for jobs and track application status
- **File Upload**: Support for profile photos, resumes, and company logos via Cloudinary
- **Role-based Access**: Separate interfaces for students and recruiters

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with cookies
- **File Upload**: Multer + Cloudinary
- **Validation**: Built-in validation with error handling
- **Security**: bcryptjs for password hashing

## Prerequisites

- Node.js (v18 or higher)
- MongoDB database
- Cloudinary account for file storage
>>>>>>> 89b80c8bb037800c398e4666254741f58df05bdd

- Node.js (v14 or higher)
- MongoDB database
- Cloudinary account for file uploads
- Git

<<<<<<< HEAD
## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/its-kundan/jobportal_backend.git
cd jobportal_backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory with the following variables:

```bash
# Copy the example environment file
cp env.example .env
```

Then edit the `.env` file with your actual values:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/jobportal
SECRET_KEY=your_jwt_secret_key_here
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

### 4. Start the Server
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The server will start at `http://localhost:3000`

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api/v1
```

### Authentication Endpoints

#### 1. User Registration
```http
POST /user/register
Content-Type: multipart/form-data
```

**Request Body:**
- `fullname` (string, required): User's full name
- `email` (string, required): User's email address
- `phoneNumber` (number, required): User's phone number
- `password` (string, required): User's password
- `role` (string, required): User role ('student' or 'recruiter')
- `profilePhoto` (file, required): Profile photo image

**Response:**
```json
{
  "message": "Account created successfully.",
  "success": true
}
```

#### 2. User Login
```http
POST /user/login
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "role": "student"
}
```

**Response:**
```json
{
  "message": "Welcome back John Doe",
  "user": {
    "_id": "user_id",
    "fullname": "John Doe",
    "email": "user@example.com",
    "phoneNumber": 1234567890,
    "role": "student",
    "profile": {
      "profilePhoto": "cloudinary_url",
      "bio": "User bio",
      "skills": ["JavaScript", "React"],
      "resume": "resume_url"
    }
  },
  "success": true
}
```

#### 3. User Logout
```http
GET /user/logout
```

**Response:**
```json
{
  "message": "Logged out successfully.",
  "success": true
}
```

#### 4. Update Profile
```http
POST /user/profile/update
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Request Body:**
- `fullname` (string, optional): Updated full name
- `email` (string, optional): Updated email
- `phoneNumber` (number, optional): Updated phone number
- `bio` (string, optional): User bio
- `skills` (string, optional): Comma-separated skills
- `resume` (file, optional): Resume file

### Job Management Endpoints

#### 1. Post a Job (Recruiter Only)
```http
POST /job/post
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Software Engineer",
  "description": "Job description here",
  "requirements": "JavaScript,React,Node.js",
  "salary": 80000,
  "location": "New York",
  "jobType": "Full-time",
  "experience": 2,
  "position": 5,
  "companyId": "company_id"
}
```

#### 2. Get All Jobs (with search)
```http
GET /job/get?keyword=software
Authorization: Bearer <token>
```

**Query Parameters:**
- `keyword` (optional): Search keyword for job title or description

**Response:**
```json
{
  "jobs": [
    {
      "_id": "job_id",
      "title": "Software Engineer",
      "description": "Job description",
      "requirements": ["JavaScript", "React", "Node.js"],
      "salary": 80000,
      "location": "New York",
      "jobType": "Full-time",
      "experienceLevel": 2,
      "position": 5,
      "company": {
        "_id": "company_id",
        "name": "Tech Corp",
        "logo": "logo_url"
      },
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "success": true
}
```

#### 3. Get Job by ID
```http
GET /job/get/:id
Authorization: Bearer <token>
```

#### 4. Get Admin Jobs (Jobs posted by logged-in recruiter)
```http
GET /job/getadminjobs
Authorization: Bearer <token>
```

### Company Management Endpoints

#### 1. Register Company
```http
POST /company/register
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "companyName": "Tech Solutions Inc."
}
```

#### 2. Get User's Companies
```http
GET /company/get
Authorization: Bearer <token>
```

#### 3. Get Company by ID
```http
GET /company/get/:id
Authorization: Bearer <token>
```

#### 4. Update Company
```http
PUT /company/update/:id
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Request Body:**
- `name` (string, optional): Company name
- `description` (string, optional): Company description
- `website` (string, optional): Company website
- `location` (string, optional): Company location
- `logo` (file, optional): Company logo

### Application Management Endpoints

#### 1. Apply for a Job
```http
GET /application/apply/:jobId
Authorization: Bearer <token>
```

#### 2. Get Applied Jobs (for job seekers)
```http
GET /application/get
Authorization: Bearer <token>
```

#### 3. Get Applicants for a Job (for recruiters)
```http
GET /application/:jobId/applicants
Authorization: Bearer <token>
```

#### 4. Update Application Status
```http
POST /application/status/:applicationId/update
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "status": "accepted" // "pending", "accepted", or "rejected"
}
```

## 🔐 Authentication

The API uses JWT tokens for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

Tokens are automatically set as HTTP-only cookies upon login and cleared upon logout.

## 👥 User Roles

- **Student**: Can apply for jobs, view applied jobs, update profile
- **Recruiter**: Can post jobs, manage companies, view applicants, update application status

## 📁 File Upload

The API supports file uploads for:
- Profile photos (during registration and profile updates)
- Resumes (during profile updates)
- Company logos (during company updates)

Files are uploaded to Cloudinary and the secure URLs are stored in the database.

## 🗄️ Database Schema

### User Model
```javascript
{
  fullname: String,
  email: String (unique),
  phoneNumber: Number,
  password: String (hashed),
  role: String (enum: ['student', 'recruiter']),
  profile: {
    bio: String,
    skills: [String],
    resume: String (URL),
    resumeOriginalName: String,
    profilePhoto: String (URL)
  }
}
```

### Job Model
```javascript
{
  title: String,
  description: String,
  requirements: [String],
  salary: Number,
  experienceLevel: Number,
  location: String,
  jobType: String,
  position: Number,
  company: ObjectId (ref: 'Company'),
  created_by: ObjectId (ref: 'User'),
  applications: [ObjectId] (ref: 'Application')
}
```

### Company Model
```javascript
{
  name: String (unique),
  description: String,
  website: String,
  location: String,
  logo: String (URL),
  userId: ObjectId (ref: 'User')
}
```

### Application Model
```javascript
{
  job: ObjectId (ref: 'Job'),
  applicant: ObjectId (ref: 'User'),
  status: String (enum: ['pending', 'accepted', 'rejected'])
}
```

## 🚀 Deployment

### Environment Variables for Production
```env
PORT=3000
MONGO_URI=your_production_mongodb_uri
SECRET_KEY=your_secure_jwt_secret
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

### Docker Deployment
The project includes a Dockerfile for containerized deployment:

```bash
# Build the Docker image
docker build -t jobportal-backend .

# Run the container
docker run -p 3000:3000 jobportal-backend
```

## 🧪 Testing

Test the API endpoints using tools like:
- **Postman**
- **Insomnia**
- **Thunder Client (VS Code extension)**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Kundan Kumar**
- Email: kundan51kk@gmail.com
- GitHub: [its-kundan](https://github.com/its-kundan)

## 📞 Support

For support and questions, please open an issue on GitHub or contact the author directly.
=======
1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd jobportal_backend-1
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env
   ```
   
   Fill in your environment variables in the `.env` file:
   ```env
   MONGO_URI=mongodb://localhost:27017/jobportal
   SECRET_KEY=your_jwt_secret_key_here
   CLOUD_NAME=your_cloudinary_cloud_name
   API_KEY=your_cloudinary_api_key
   API_SECRET=your_cloudinary_api_secret
   PORT=3000
   FRONTEND_URL=http://localhost:5173
   ```

4. **Start the server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/v1/user/register` - Register a new user
- `POST /api/v1/user/login` - User login
- `GET /api/v1/user/logout` - User logout
- `POST /api/v1/user/profile/update` - Update user profile

### Company Management
- `POST /api/v1/company/register` - Register a new company
- `GET /api/v1/company/get` - Get user's companies
- `GET /api/v1/company/get/:id` - Get company by ID
- `PUT /api/v1/company/update/:id` - Update company information

### Job Management
- `POST /api/v1/job/post` - Post a new job
- `GET /api/v1/job/get` - Get all jobs (with search)
- `GET /api/v1/job/getadminjobs` - Get jobs posted by admin
- `GET /api/v1/job/get/:id` - Get job by ID

### Application Management
- `POST /api/v1/application/apply/:id` - Apply for a job
- `GET /api/v1/application/get` - Get user's applied jobs
- `GET /api/v1/application/:id/applicants` - Get job applicants (admin)
- `POST /api/v1/application/status/:id/update` - Update application status

## Data Models

### User
- Basic info: fullname, email, phoneNumber, password, role
- Profile: bio, skills, resume, profile photo
- Role: 'student' or 'recruiter'

### Company
- Basic info: name, description, website, location
- Logo: Cloudinary URL
- Associated user (owner)

### Job
- Basic info: title, description, requirements, salary
- Details: experience level, location, job type, position count
- Associated company and creator

### Application
- Job reference
- Applicant reference
- Status: 'pending', 'accepted', 'rejected'

## File Upload

The application supports file uploads for:
- User profile photos
- User resumes
- Company logos

Files are uploaded to Cloudinary and stored as URLs in the database.

## Security Features

- Password hashing with bcryptjs
- JWT authentication with secure cookies
- Input validation and sanitization
- File type and size validation
- CORS configuration
- Error handling and logging

## Error Handling

The API includes comprehensive error handling:
- Validation errors (400)
- Authentication errors (401)
- Not found errors (404)
- Server errors (500)
- Consistent error response format

## Docker Support

Build and run with Docker:
```bash
# Build image
docker build -t jobportal-backend .

# Run container
docker run -p 3000:3000 jobportal-backend
```

## Health Check

The API includes a health check endpoint:
- `GET /health` - Returns server status

## Development

### Scripts
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

### Code Structure
```
├── controllers/     # Route handlers
├── middlewares/     # Custom middleware
├── models/         # Database models
├── routes/         # API routes
├── utils/          # Utility functions
├── index.js        # Server entry point
└── package.json    # Dependencies
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License.
>>>>>>> 89b80c8bb037800c398e4666254741f58df05bdd
