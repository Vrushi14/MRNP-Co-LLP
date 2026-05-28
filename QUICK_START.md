# MRNP Full Stack - Quick Start Guide

## 🚀 Get Running in 5 Minutes

### Prerequisites
- PostgreSQL installed and running
- Node.js v18+

### Step 1: Create Database
```bash
createdb mrnp_db
```

### Step 2: Backend
```bash
cd mrnp-backend
npm install  # (skip if already done)
npm run dev
```
✅ Backend runs on `http://localhost:5000`

### Step 3: Frontend (New Terminal)
```bash
cd mrnp-frontend
npm install  # (skip if already done)
npm run dev
```
✅ Frontend runs on `http://localhost:3000`

### Step 4: Test It
1. Open `http://localhost:3000/auth/register`
2. Create a new account
3. You'll be redirected to `/dashboard`
4. Edit your profile

## ✨ What's Included

✅ **Backend**
- Express.js REST API
- PostgreSQL database
- JWT authentication
- User registration & login
- User profile management
- CORS enabled

✅ **Frontend**
- Next.js 15 with React 19
- Login/Register pages
- Dashboard with profile
- API integration
- Beautiful UI with Tailwind CSS

✅ **Database**
- Automated schema creation
- User table with hashed passwords
- Timestamps on creation/update

## 📝 Environment Files

Already configured but can be customized:

**Backend** (`mrnp-backend/.env`):
- `PORT=5000`
- `DB_HOST=localhost`, `DB_NAME=mrnp_db`
- `JWT_SECRET` (change for production)

**Frontend** (`mrnp-frontend/.env.local`):
- `NEXT_PUBLIC_API_URL=http://localhost:5000/api`

## 🔗 Key URLs

| Route | Purpose |
|-------|---------|
| `/` | Homepage |
| `/auth/login` | Login page |
| `/auth/register` | Registration page |
| `/dashboard` | User dashboard (protected) |

## 🛠️ API Endpoints

```
POST   /api/auth/register       - Create account
POST   /api/auth/login          - Login user
GET    /api/user/profile        - Get profile (auth required)
PUT    /api/user/profile        - Update profile (auth required)
GET    /api/health              - Health check
```

## 🎯 Next: Advanced Features

When ready, add:
- Email verification
- Password reset
- Social login (Google, GitHub)
- Two-factor authentication
- User roles & permissions
- Database migrations
- API documentation (Swagger/OpenAPI)

---

**Backend README**: See `mrnp-backend/BACKEND_SETUP.md`
**Full Guide**: See `FULL_STACK_SETUP.md`

