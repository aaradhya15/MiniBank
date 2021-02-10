const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginData(data) {
  let errors = {};

  if (isEmpty(data.email)) data.email = "";
  if (isEmpty(data.password)) data.password = "";
  

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Invalid email";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}
