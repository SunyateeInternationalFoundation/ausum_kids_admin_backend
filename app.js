require('dotenv').config(); 
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const adminRoutes = require('./routes/admin');
app.use(cors());
app.use(express.json());


app.use('/', adminRoutes)


mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
  })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Database connection error:', err));

app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});