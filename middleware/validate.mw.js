const yup = require('yup');

const SIGN_UP_SCHEMA = yup.object({
  fistName: yup.string().trim().required(),
  lastName: yup.string().trim().required(),
  email: yup.string().trim().email().required(),
  password: yup.string().min(8).max(64).required(),
});

const LOGIN_SCHEMA = yup.object({
  email: yup.string().trim().email().required(),
  password: yup.string().min(8).max(64).required(),
});

module.exports.signUpValidate = async (req, res, next) => {
  const { body } = req;
  try {
    req.body = await SIGN_UP_SCHEMA.validate(body);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports.loginValidate = async (req, res, next) => {
  const { body } = req;
  try {
    req.body = await LOGIN_SCHEMA.validate(body);
    next();
  } catch (error) {
    next(error);
  }
};
