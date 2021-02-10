const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegistrationData(data) {
  let errors = {};

  if (isEmpty(data.userName)) data.userName = "";
  if (isEmpty(data.email)) data.email = "";
  if (isEmpty(data.password)) data.password = "";
  if (isEmpty(data.password2)) data.password2 = "";

  if (Validator.isEmpty(data.userName)) {
    errors.userName = "Name field is required";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Invalid email";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  } else if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  } else if (!Validator.isLength(data.password, { min: 6, max: 15 })) {
    errors.password = "Password length must be between 6 to 15 characters";
  } else if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

