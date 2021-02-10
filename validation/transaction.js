const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateTransactionData(data) {
  let errors = {};

  if (isEmpty(data.debitAccountNo)) data.debitAccountNo = "";
  if (isEmpty(data.creditAccountNo)) data.creditAccountNo = "";
  if (isEmpty(data.transactionType)) data.transactionType = "";
  if (isEmpty(data.transactionAmount)) data.transactionAmount = "";


  if (
    Validator.isEmpty(data.debitAccountNo) &&
    data.transactionType != "deposit"
  ) {
    errors.debitAccountNo = "Debit Account Number is required";
  }

  if (
    Validator.isEmpty(data.creditAccountNo) &&
    data.transactionType != "withdrawal"
  ) {
    errors.creditAccountNo = "Credit Account Number is required";
  }

  if (Validator.isEmpty(data.transactionType)) {
    errors.transactionType = "Transaction Type is required";
  }

  if (Validator.isEmpty(data.transactionAmount)) {
    errors.transactionAmount = "Transaction Amount is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

