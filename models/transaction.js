const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
//10 digit transaction ID
    transactionID: {
      type: String,
      default: Math.floor(1000000000 + Math.random() * 9000000000)
    },
//Debit account number
    debitAccountNo: {
        type: Number
    },
//Credit account number, if there
    creditAccountNo: {
        type:Number
    },
//Type of transaction 
    transactionType:{
        type: String,
        enum: ['transfer','withdrawal','deposit'],
        required: true
    },
//Transaction amount
    transactionAmount: {
        type: Number,
        required: true
    },
//Status of the transaction
    transactionStatus: {
        type: String,
        enum: ['pending','completed','failed'],
        default: 'pending'
    },
//Transaction initiation time
    initiatedAt: {
        type: Date,
        default: Date.now
    },
//Transaction desc
    transactionDescription: {
        type: String,
        required: false
    }

});

  module.exports = User = mongoose.model("transaction", TransactionSchema);