const users = new Map().set('test@gmail.com', {
  fistName: 'Test',
  lastName: 'Testovich',
  email: 'test@gmail.com',
  password: 'test1Test',
});

module.exports.loginUser = (req, res, next) => {
  const { body } = req;
  if (users.has(body.email)) {
    const user = users.get(body.email);
    if (user.password === body.password) {
      const preparedUser = {
        ...user,
      };
      delete user.password;
      return res.status(200).send(preparedUser);
    }

    return res.status(401).send('email or password is incorrect');
  } else {
    return res.status(404).send('User not found');
  }
};

module.exports.signUpUser = (req, res, next) => {
  const { body } = req;
  const newUser = {
    id: users.size,
    ...body,
  };
  if (users.has(newUser.email)) {
    return res.status(409).send('user with this email address already exists');
  }

  users.set(newUser.email, newUser);

  const preparedUser = {
    ...newUser,
  };

  delete preparedUser.password;
  res.status(201).send(preparedUser);
};
module.exports.refreshAuth = () => {};
module.exports.logoutUser = () => {};
