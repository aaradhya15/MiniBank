const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

const validateRegistrationData = require("../../validation/registration");
const validateLoginData = require("../../validation/login");
const authorizeToken = require("../../middlewares/authorization");
const adminAuthorizeToken = require("../../middlewares/adminAuthorization");


const User = require("../../models/user");

//@route POST api/users/register
//@desc User registration
router.post("/register", (req, res) => {
    
//validation
    const { errors, isValid} = validateRegistrationData(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

//checking if user already exists in the DB
    User.findOne({ email: req.body.email })
    .then(user => { if (user) {
          return res.status(400)
          .json({ email: "Email already exists", });
        } else {
          const newUser = new User({
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password,
            availableBalance: 0,
            isAdmin: false
          });

//hashing and salting the password before saving in DB
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(user => res.json(user))
                .catch(err => console.log(err));
            });
          });
        }
});
});

//@route POST api/users/login
//@desc User login and return JSON web token
router.post("/login", (req, res) => {

//validation
const { errors, isValid } = validateLoginData(req.body);
if (!isValid) {
    return res.status(400).json(errors);
}

const email = req.body.email;
const password = req.body.password;

//Find user's email and check if it exists in the DB
User.findOne({ email }).then(user => {
    if (!user) {
        return res.status(404).json({ emailnotfound: "Email not found" });
      }
//compare and check password
    bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // Create JWT Payload if user matched
          const payload = {
            id: user.id,
            email: user.email,
            accountNo : user.accountNo,
            isAdmin: user.isAdmin
            };
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 31556926
            },
            (err, token) => {
              res.json({payload,
                success: true,
                token: "Bearer " + token,
                
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Incorrect Password!" });
        }
    });
});

});



//@route /api/users/accountNo
//@desc details of a particular account
router.get("/:accountNo", [authorizeToken], (req,res)=>{

    const accountNo = req.params.accountNo;
    User.findOne({ 'accountNo': accountNo })
    .then(user => { 
        if(!user){
            return res.status(400).json({noUser : "No such user found!"});
        }
        res.send(user);
    })
    .catch(err => { res.status(400).send(err)});
});


//@route /api/users
//@desc all the users
router.get('/', (req,res)=>{

    // User.find({ email: { $ne: 'testemail@email.com' } })
    User.find({}, 'userName email accountNo availableBalance')
    .then(users => {
        if(!users){
            return res.status(400).json({noUserFound: "No Users found"});
        }
        //console.log(users);
        res.status(200).json({users:users});
    }).catch(err=>{
        res.status(400).send(err);
    });
});

module.exports = router;

