const express = require('express');
const authController = require('./controllers/authentication.controller');
const { validate } = require('./middleware');
const { ValidationError } = require('yup');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from express-app!');
});

app.post('/signup', validate.signUpValidate, authController.signUpUser);

app.post('/login', validate.loginValidate, authController.loginUser);

app.use((error, req, res, next) => {
  if (error instanceof ValidationError) {
    return res.status(400).send({ message: error.message });
  }
  res.status(500).send(error);
});

app.listen(3000);
