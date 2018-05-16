const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();
const db = require('./config/keys').mongoURI;

mongoose.connect(db)
  .then(() => {console.log('MongoDB connected')})
  .catch((err) => {console.log(err)});

// Routes
app.get('/', (req, res) => {res.send('It Works!');});

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});