const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');
const session = require('express-session');

const app = express();

//bodyparser middlware
app.use(express.json());
//DB config
const db = config.get('mongoURI');

//connect to mongoose databases

mongoose
  .connect(db, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => console.log('Mongo stable...'))
  .catch(err => console.log(err));

//session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);
//Router defined
app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

//Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  //Set static folder
  app.use(express.static('frontend/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

//port defined
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server running port ${port}`));
