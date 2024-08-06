const express = require('express');
const timeout = require('connect-timeout');
const itemDBRoutes = require('./routes/items.js');
const itemViewRoutes = require('./routes/view.js');
const { connectToDatabase, closeDatabaseConnection } = require('./databse.js');
const savedItemsRoutes = require('./routes/savedItems');

//const websiteDBRoutes = require('./routes/websites.js');
const jwt = require('jsonwebtoken');// added
const bcrypt = require('bcrypt');// added
const User = require('./models/user');// added


const cors = require('cors');
const axios = require('axios');
const scrape = require('./controllers/scrape.js');
const places = require('./controllers/places.js');
const { join } = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const timeoutMs = 5 * 60 * 1000;
app.use(timeout(timeoutMs));
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

app.use("/db/items", itemDBRoutes);
app.use("/view", itemViewRoutes);
app.use('/api/savedItems', savedItemsRoutes);

app.get('/google-maps-api', async (req, res) => {
  try {
    const apiKey = process.env.GOOGLE_API_KEY;
    const { query, latitude, longitude, radius } = req.query;
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&location=${latitude},${longitude}&radius=${radius}&key=${apiKey}`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('Error searching Google:', error);
    res.status(500).json({ error: 'Failed to fetch data from Google Maps API' });
  }
});

// Start the server and connect to the database
const startServer = async () => {
  try {
    await connectToDatabase();
    const server = app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port ' + process.env.PORT);
    });

    const gracefulShutdown = async () => {
      console.log('Received shutdown signal, closing server...');
      await closeDatabaseConnection();
      server.close(() => {
        console.log('Server closed');
        process.exit(0);
      });
    };

    process.on('SIGTERM', gracefulShutdown);
    process.on('SIGINT', gracefulShutdown);
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;

app.post('/reset-password', async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  try {
    console.log('Received password reset request for email:', email); // debugging information
    const user = await User.findOne({ email });

    if (!user) {
      console.log('User not found in database'); // debugging information
      return res.status(404).json({ error: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid old password' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Password reset failed:', error);
    res.status(500).json({ error: 'Password reset failed' });
  }
});
// module.exports = User;// add


function availableRoutesString() {
  return app._router.stack
    .filter(r => r.route)
    .map(r => Object.keys(r.route.methods)[0].toUpperCase().padEnd(7) + r.route.path)
    .join("\n")
}
