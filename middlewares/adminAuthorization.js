
module.exports = function (req, res, next) { 
    if (!req.header['isAdmin']) return res.status(403).send('Access denied. Not an Admin');
    next();
  }
const jwt = require("jsonwebtoken");
const { request } = require("express");

module.exports = function (req, res, next) {
  if(req.method ==='OPTIONS')
  next();
  const authHeader = req.headers['authorization'];
    //console.log(authHeader);
    const token = authHeader && authHeader.split(' ')[1];
    //console.log(token)
    if (token == null) return res.sendStatus(401) 
  
    jwt.verify(token, "secret", (err, user) => {
      console.log(err)
      if (err) return res.sendStatus(403)
      req.user = user
      if(!req.user.isAdmin)
      return res.status(403).send("Not an admin. Access Denied");
      //console.log(req.user);
      next() 
    });
  }
  
 //if not authorized, redirect to home.