# MRNP Backend

Node.js + Express backend with MongoDB (Mongoose) and JWT authentication.

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up MongoDB Database

Make sure MongoDB is installed and running on your system.

**Option A: Local MongoDB**
- Start your MongoDB service locally.
- By default, it will be accessible at `mongodb://127.0.0.1:27017`.
- You can verify connection with:
```bash
bash setup-db.sh
```

**Option B: MongoDB Atlas (Cloud)**
- Create a cluster on MongoDB Atlas.
- Get the connection string and place it in the `.env` file under `MONGO_URI`.

### 3. Configure Environment Variables

Edit the `.env` file in the project root:
```
PORT=5000
NODE_ENV=development

MONGO_URI=mongodb://127.0.0.1:27017/mrnp_db

JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

FRONTEND_URL=http://localhost:3000
```

### 4. Start the Server

**Development (with auto-reload)**
```bash
npm run dev
```

**Production**
```bash
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### User
- `GET /api/user/profile` - Get user profile (requires JWT)
- `PUT /api/user/profile` - Update user profile (requires JWT)

### Career Applications
- `POST /api/careers/apply` - Submit a career application (multipart/form-data upload)
- `GET /api/careers/applications` - Get list of applications (requires JWT)

### Health Check
- `GET /api/health` - Check backend status

## Required Headers for Protected Routes

Add this header to requests to protected endpoints:
```
Authorization: Bearer <your_jwt_token>
```

## Database Schema (Mongoose Models)

The app automatically manages two collections in MongoDB:

### Users (`users`)
- `id` / `_id` (ObjectId)
- `email` (Unique, Lowercase)
- `password` (Hashed with bcryptjs)
- `name`
- `createdAt` (Timestamp)
- `updatedAt` (Timestamp)

### Career Applications (`careerapplications`)
- `id` / `_id` (ObjectId)
- `name` (String)
- `email` (String)
- `phone` (String)
- `education` (String)
- `currentCompany` (String, default null)
- `experience` (String)
- `resumePath` (String)
- `jobDepartment` (String)
- `jobPosition` (String)
- `jobCity` (String)
- `createdAt` (Timestamp)
- `updatedAt` (Timestamp)
