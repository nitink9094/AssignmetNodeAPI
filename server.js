const express = require('express');
const jwt = require('express-jwt');
const jsonwebtoken = require('jsonwebtoken');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
const jwtSecret = 'secret123';

app.get('/jwt/:username', (req, res) => {
  console.log('------ username :', req.params.username);
  res.json({
    token: jsonwebtoken.sign({ user: req.params.username }, jwtSecret)
  });
});

app.use(jwt({ secret: jwtSecret, algorithms: ['HS256'] }));

app.get('/users', async (req, res) => {
  try {
    const users = await axios.get(`https://jsonplaceholder.typicode.com/users`);
    console.log('USERS :', users);
    res.json(users.data);
  } catch (err) {
    console.log(' err : ', err);
    res.json(err);
  }

});
app.listen(3001);

console.log('App running on localhost:3001');