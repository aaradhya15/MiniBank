const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require('cors');

const users = require("./routes/api/users");
const transactions = require("./routes/api/transactions");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
// app.use(function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

//     if ('OPTIONS' === req.method) {
//       res.send(200);
//     }
//     else {
//       next();
//     }
// });

const db = require("./config/keys").mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true , useUnifiedTopology: true})
  .then(() => console.log("Mongoose connected"))
  .catch((err) => console.log(err));

app.use(passport.initialize());
require("./config/passport")(passport);
app.use("/api/users", users);
app.use("/api/transactions", transactions);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));

