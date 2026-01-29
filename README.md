# Task Manager Application

A full-stack task management application built with React (Frontend) and Node.js/Express (Backend).

## Features

- **User Authentication**: Register, login, and logout functionality
- **Task Management**: Create, read, update, delete, and toggle tasks
- **Priority System**: High, medium, and low priority tasks with color coding
- **Real-time Updates**: Tasks sync with the backend database
- **Responsive Design**: Clean, modern UI that works on all devices
- **Protected Routes**: Secure access to authenticated user features

## Tech Stack

### Frontend

- React 19
- React Router DOM
- Axios for HTTP requests
- Tailwind CSS for styling
- Context API for state management

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing
- CORS enabled

## Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or Docker)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd Backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:

   ```env
   MONGODB_URI=mongodb://localhost:27017/taskmanager
   ACCESS_TOKEN=your_jwt_secret_key_here
   ```

4. Start MongoDB (if using local installation linux):

   ```bash
   # Ubuntu/Linux
   sudo systemctl start mongod

   # macOS with Homebrew
   brew services start mongodb/brew/mongodb-community

   # Windows
   net start MongoDB
   ```

5. Start the backend server:

   ```bash
   npm start
   # or for development with auto-reload
   npm run dev
   ```

   The backend will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd Frontend/taskManager
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the frontend development server:

   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:5173`

## 🐳 Docker Alternative (MongoDB)

If you prefer using Docker for MongoDB:

```bash
# Run MongoDB in Docker
docker run -d --name mongodb -p 27017:27017 mongo:latest

# With authentication (optional)
docker run -d --name mongodb -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=password \
  mongo:latest
```

Then update your `.env` file accordingly:

```env
MONGODB_URI=mongodb://admin:password@localhost:27017/taskmanager?authSource=admin
```

## API Endpoints

### Authentication

- `POST /api/register` - Register new user
- `POST /api/login` - User login
- `POST /api/logout` - User logout

### Tasks (Protected Routes)

- `GET /api/tasks` - Get all user tasks
- `POST /api/tasks` - Create new task
- `GET /api/tasks/:id` - Get specific task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `PATCH /api/tasks/:id/toggle` - Toggle task completion

## Authentication Flow

1. User registers or logs in
2. Backend generates JWT token
3. Token stored in HTTP-only cookies
4. Frontend automatically includes token in requests
5. Backend validates token on protected routes
6. User can access task management features

## Usage

1. **Registration**: Create a new account with name, email, and password
2. **Login**: Sign in with your credentials
3. **Create Tasks**: Add new tasks with priority levels
4. **Manage Tasks**: Mark as complete, edit, or delete tasks
5. **Profile**: Update your profile information
6. **Settings**: Change your password
7. **Logout**: Securely end your session

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- HTTP-only cookies
- Protected API routes
- Input validation
- CORS configuration

## Production Deployment

### Frontend Build

```bash
cd Frontend/taskManager
npm run build
```

### Environment Variables

Ensure all production environment variables are set:

- `MONGODB_URI` - Production MongoDB connection string
- `ACCESS_TOKEN` - Strong JWT secret key
- `NODE_ENV=production`

### Deployment Options

- **Frontend**: Netlify, Vercel, GitHub Pages
- **Backend**: Heroku, Railway, DigitalOcean, AWS
- **Database**: MongoDB Atlas, AWS DocumentDB

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

For issues and questions, please create an issue in the repository.

---

**Happy Task Managing! 📋✅**
