var express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const authenticate = require("../authenticate");

const User = require("../models/user");

var router = express.Router();
router.use(bodyParser.json());

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("WELCOME TO USERS, MOVE AHEAD TO LOGIN OR SIGNUP");
});
////////////////////IT IS FOR SIGNIN UP A WEBSITE///////////////////
/////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
router.post("/signup", (req, res, next) => {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    (err, user) => {
      if (err) {
        err.status = 500;
        res.setHeader("Content-Type", "application/json");
        res.json({
          error: err,
        });
      } else {
        passport.authenticate("local")(req, res, () => {
          res.status = 200;
          res.setHeader("Content-Type", "application/json");
          res.json({ status: "Success", success: true });
        });
      }
    }
  );
});

router.post("/login", passport.authenticate("local"), (req, res, next) => {
  res.status = 200;
  res.setHeader("Content-Type", "application/json");
  res.json({ status: "You are successfully logged in!", success: true });
});

router.get("/logout", (req, res, next) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie("session-id");
    res.redirect("/");
  } else {
    var err = new Error("Your are not logged in");
    err.status = 401;
    next(err);
  }
});

module.exports = router;
