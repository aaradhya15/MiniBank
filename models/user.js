const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
//Name of the User
    userName: {
      type: String,
      required: true
    },
//EmailID of the user    
  email: {
      type: String,
      required: true
    },
//Password
    password: {
      type: String,
      required: true
    },
//Assigned account number    
    accountNo: {
        type: Number,
        default: Math.floor(1000000000000000 + Math.random() * 9000000000000000)
    },
//Available account balance
    availableBalance: {
      type: Number,
      required: true
    },

    isAdmin: {
      type: Boolean,
      required: true
    },
//Time and date of account creation
    date: {
      type: Date,
      default: Date.now
    }

  });

  module.exports = User = mongoose.model("user", UserSchema);