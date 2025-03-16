# Job Portal Backend

This is the backend for the **Job Portal Website**, built using **Node.js**, **Express.js**, and **MongoDB**. It provides RESTful APIs for user authentication, job posting, application tracking, and more.

---

## Features

- **User Authentication:** Register, login, and logout with JWT-based authentication.
- **Job Management:** Create, read, update, and delete job listings.
- **Application Tracking:** Submit and track job applications.
- **Role-Based Access Control:** Different permissions for job seekers, employers, and admins.
- **File Uploads:** Resume uploads using Multer and cloud storage.

---

## Technologies Used

- **Backend Framework:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose for schema modeling)
- **Authentication:** JSON Web Tokens (JWT)
- **File Uploads:** Multer, Cloudinary
- **Environment Variables:** dotenv
- **API Testing:** Postman

---

## Installation

Follow these steps to set up the backend locally:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/job-portal-backend.git
   cd job-portal-backend
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```plaintext
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret_key
     CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
     CLOUDINARY_API_KEY=your_cloudinary_api_key
     CLOUDINARY_API_SECRET=your_cloudinary_api_secret
     ```

4. **Run the Server:**
   ```bash
   npm start
   ```
   The server will start at `http://localhost:5000`.

---

## API Endpoints

### **Authentication**
- `POST /api/auth/register` - Register a new user.
- `POST /api/auth/login` - Login and get a JWT token.
- `POST /api/auth/logout` - Logout (invalidate token).

### **Jobs**
- `GET /api/jobs` - Get all job listings.
- `POST /api/jobs` - Create a new job listing (employer only).
- `GET /api/jobs/:id` - Get a specific job by ID.
- `PUT /api/jobs/:id` - Update a job listing (employer only).
- `DELETE /api/jobs/:id` - Delete a job listing (employer only).

### **Applications**
- `POST /api/applications` - Submit a job application.
- `GET /api/applications` - Get all applications (employer/admin only).
- `GET /api/applications/:id` - Get a specific application by ID.
- `PUT /api/applications/:id` - Update application status (employer/admin only).

### **Users**
- `GET /api/users` - Get all users (admin only).
- `GET /api/users/:id` - Get a specific user by ID.
- `PUT /api/users/:id` - Update user profile.
- `DELETE /api/users/:id` - Delete a user (admin only).

---

## Testing

- Use **Postman** to test the API endpoints.
- Import the Postman collection from `postman_collection.json` (if available).

---

## Deployment

The backend is deployed on **Render** (or Heroku/AWS).  
Live URL: `https://your-backend-api.com`

---

## Contributing

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Commit your changes: `git commit -m "Add your feature"`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Submit a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

For questions or feedback, reach out to:  
- **Your Name**  
- **Email:** your-email@example.com  
- **GitHub:** [your-username](https://github.com/your-username)
```
