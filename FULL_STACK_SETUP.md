# Full Stack Setup Guide - MRNP

Complete setup instructions for running the full stack (Frontend + Backend + Database).

## Prerequisites

- Node.js (v18+)
- PostgreSQL (v12+)
- Git

---

## 📦 Installation

### 1. Backend Setup

```bash
cd mrnp-backend
npm install
```

### 2. Frontend Setup

```bash
cd mrnp-frontend
npm install
```

---

## 🗄️ Database Setup

### Option 1: Using PostgreSQL Command Line

```bash
# Create the database
createdb mrnp_db

# Or if you need to specify a user:
createdb -U postgres mrnp_db
```

### Option 2: Using a GUI Tool (DBeaver/pgAdmin)

1. Open DBeaver or pgAdmin
2. Connect to your PostgreSQL server
3. Create a new database named `mrnp_db`

### Verify Connection

```bash
# Test PostgreSQL connection
psql -U postgres -d mrnp_db -c "SELECT 1"
```

---

## ⚙️ Environment Configuration

### Backend - `.env` file

Located at `mrnp-backend/.env`

```env
PORT=5000
NODE_ENV=development

# PostgreSQL (adjust if different)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=mrnp_db
DB_USER=postgres
DB_PASSWORD=postgres

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# CORS
FRONTEND_URL=http://localhost:3000
```

### Frontend - `.env.local` file

Located at `mrnp-frontend/.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## 🚀 Running the Application

### Terminal 1: Start Backend

```bash
cd mrnp-backend
npm run dev
```

Expected output:
```
Server running on port 5000
Database schema initialized successfully
```

### Terminal 2: Start Frontend

```bash
cd mrnp-frontend
npm run dev
```

Expected output:
```
- ready started server on 0.0.0.0:3000, url: http://localhost:3000
```

---

## 🧪 Testing the Integration

### 1. Open Frontend

Visit `http://localhost:3000` in your browser

### 2. Register a New Account

- Click the login link or navigate to `/auth/register`
- Fill in:
  - Full Name: e.g., "John Doe"
  - Email: e.g., "john@example.com"
  - Password: e.g., "password123"
  - Confirm Password
- Click "Create Account"

### 3. Access Dashboard

- After registration, you'll be redirected to `/dashboard`
- Your profile information will be displayed
- You can edit your name or email

### 4. Test API with cURL

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'

# Get Profile (replace TOKEN with your JWT token)
curl -X GET http://localhost:5000/api/user/profile \
  -H "Authorization: Bearer TOKEN"

# Health Check
curl http://localhost:5000/api/health
```

---

## 📋 API Reference

### Authentication Endpoints

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "User Name"
}

Response:
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { "id": 1, "email": "user@example.com", "name": "User Name" }
}
```

#### Login User
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { "id": 1, "email": "user@example.com", "name": "User Name" }
}
```

### User Endpoints

#### Get Profile
```
GET /api/user/profile
Authorization: Bearer <token>

Response:
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "User Name",
    "created_at": "2024-01-01T12:00:00.000Z"
  }
}
```

#### Update Profile
```
PUT /api/user/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Name",
  "email": "newemail@example.com"
}

Response:
{
  "message": "Profile updated successfully",
  "user": { "id": 1, "email": "newemail@example.com", "name": "Updated Name", ... }
}
```

---

## 🔐 Security Notes

1. **JWT Secret**: Change `JWT_SECRET` in production to a long, random string
2. **CORS**: Update `FRONTEND_URL` to match your production frontend URL
3. **Database**: Use strong passwords for PostgreSQL in production
4. **Passwords**: Always hash passwords (bcryptjs handles this)
5. **HTTPS**: Use HTTPS in production

---

## 📁 Project Structure

```
mrnp-backend/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── userController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── user.js
│   ├── utils/
│   │   └── initDb.js
│   └── server.js
├── .env
└── package.json

mrnp-frontend/
├── src/
│   ├── app/
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── register/
│   │   │       └── page.tsx
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   └── ...
│   ├── utils/
│   │   └── api.js
│   └── ...
├── .env.local
└── package.json
```

---

## 🐛 Troubleshooting

### Database Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```
**Solution**: Ensure PostgreSQL is running
```bash
# Start PostgreSQL (Windows)
psql -U postgres

# Or on Mac
brew services start postgresql
```

### JWT Token Invalid
```
Error: Invalid or expired token
```
**Solution**: 
- Make sure token is not expired (expires in 7 days)
- Check that `JWT_SECRET` matches between frontend and backend
- Include token in Authorization header: `Bearer <token>`

### CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution**: Ensure `FRONTEND_URL` in backend `.env` matches your frontend URL

### Port Already in Use
```bash
# Change port in .env or use different port
PORT=5001
```

---

## 📝 Next Steps

- Add more API endpoints as needed
- Implement role-based access control
- Add email verification
- Set up password reset functionality
- Add database migrations
- Implement API rate limiting
- Set up logging and monitoring

---

## 🆘 Support

For issues or questions, check:
1. Backend console for errors
2. Frontend browser console
3. Network tab in browser DevTools
4. PostgreSQL logs

