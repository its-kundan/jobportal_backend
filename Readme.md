# Job Portal Backend

A comprehensive job portal backend API built with Node.js, Express, and MongoDB.

## Features

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

## Installation

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