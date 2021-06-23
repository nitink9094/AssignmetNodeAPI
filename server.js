const express = require('express');
const jwt = require('express-jwt');
const jsonwebtoken = require('jsonwebtoken');
const cors = require('cors');
const axios = require('axios');
//const bodyParser = require("body-parser");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const jwtSecret = 'secret123';

// app.get('/jwt/:username', (req, res) => {
//   console.log('------ username :', req.params.username);
//   res.json({
//     token: jsonwebtoken.sign({ user: req.params.username }, jwtSecret)
//   });
// });

app.post('/login', (req, res) => {
  console.log('------ body :', req.body);
  if (req.body.username === 'admin' && req.body.password === 'admin') {
    res.json({
      token: jsonwebtoken.sign({ user: req.body.username }, jwtSecret)
    });
  } else {
    res.sendStatus(401);
  }
  
});

app.use(jwt({ secret: jwtSecret, algorithms: ['HS256'] }));

app.get('/users', async (req, res) => {
  try {
    console.log('-------- req :', req.headers);
    if(req.headers && req.headers['authorization'] && req.headers['authorization'] !== '') {
      const users = await axios.get(`https://jsonplaceholder.typicode.com/users`);
      console.log('USERS :', users.data);
      res.json(users.data);
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    console.log(' err : ', err);
    if(err==='unauthorized') res.sendStatus(401);
    res.sendStatus(500);
  }

});
app.listen(3001);

console.log('App running on localhost:3001');