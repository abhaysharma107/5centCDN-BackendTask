const mongoose = require("mongoose");
const User = mongoose.model("User");
const passport = require("passport");
const _ = require("lodash");
const { matchesProperty } = require("lodash");


module.exports.signup = (req, res, next) => {
    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    user.role = req.body.role;
    user.permission = req.body.permission;
    user.save((err, doc) => {
      if (!err) {
        console.log(doc);
        res.status(200).json({ token: user.generateJwt() });
      } else {
        console.log(err);
        if (err.code == 11000)
          res.status(422).send(["Duplicate email adrress found."]);
        else return next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  // call for passport authentication
  passport.authenticate("local", (err, user, info) => {
    // error from passport middleware
    if (err) return res.status(400).json(err);
    // registered user
    else if (user) return res.status(200).json({ token: user.generateJwt() });
    // unknown user or wrong password
    else return res.status(404).json(info);
  })(req, res);
};

module.exports.userProfile = (req, res, next) => {
  User.findOne({ _id: req._id }, (err, user) => {
    if (!user)
      return res
        .status(404)
        .json({ status: false, message: "User record not found." });
    else
      return res
        .status(200)
        .json({ status: true, user: user });
  });
};

module.exports.account = (req, res, next) => {
  res.status(200).send({ auth: true, message: 'Right Token' });
}

//get role
module.exports.getRole = (req, res, next) => {
  User.findOne({ _id: req._id }, (err, user) => {
    if (!user)
      return res
        .status(404)
        .json({ status: false, message: "User record not found." });
    else
      return res
        .status(200)
        .json({ status: true, role: user.role });
  });
}

//get all users whos roles is admin
module.exports.getAdmin = (req, res, next) => {
  User.find({ role: 'admin' }, (err, user) => {
    if (!user)
      return res
        .status(404)
        .json({ status: false, message: "User record not found." });
    else
      return res
        .status(200)
        .json({ status: true, user: user });
  });
}

//update user based on the id
module.exports.updateUser = (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, user) => {
    if (!user)
      return res
        .status(404)
        .json({ status: false, message: "User record not found." });
    else
      return res
        .status(200)
        .json({ status: true, user: user });
  })
}

//delete user based on the id
module.exports.deleteUser = (req, res, next) => {
  User.findByIdAndRemove(req.params.id, (err, user) => {
    if (!user)
      return res
        .status(404)
        .json({ status: false, message: "User record not found." });
    else
      return res
        .status(200)
        .json({ status: true, user: user });
  })
}