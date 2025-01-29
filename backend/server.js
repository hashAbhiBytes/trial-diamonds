const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const blockchainRoutes = require('./routes/blockchain');
const authMiddleware = require('./middleware/auth');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/diamond-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/blockchain', authMiddleware, blockchainRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));