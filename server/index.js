const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const router = require('./routes/router');
const dotenv = require('dotenv');
// asked chatbots how to change this for deployment.
// Load env vars based on environment
dotenv.config({ path: process.env.NODE_ENV === 'production' 
  ? '.env' 
  : '.env.development.local' 
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In production, serve static files from client build
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// Configure CORS based on environment
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use('/api', router); // Add /api prefix to all routes

// Catch-all route for client-side routing in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

app.listen(process.env.PORT || 3001, () => {
  console.log(`Server is running on port ${process.env.PORT || 3001}`);
});