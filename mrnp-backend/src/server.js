const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const careerRoutes = require('./routes/career');
const jobRoutes = require('./routes/job');
const emailRoutes = require('./routes/email');
const notificationRoutes = require('./routes/notification');
const interviewRoutes = require('./routes/interview');
const serviceRoutes = require('./routes/service');
const aboutRoutes = require('./routes/about');
const connectDB = require('./config/database');

const app = express();
const PORT = process.env.PORT || 5000;

let frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
if (frontendUrl.endsWith('/')) {
  frontendUrl = frontendUrl.slice(0, -1);
}

app.use(cors({
  origin: frontendUrl,
  credentials: true
}));

app.use(express.json());
// Serve uploads folder as static
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.get('/api/health', (req, res) => {
  res.json({ message: 'Backend is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/emails', emailRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/interviews', interviewRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/about', aboutRoutes);


app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await connectDB();
});

