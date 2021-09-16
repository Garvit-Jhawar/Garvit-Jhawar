const express = require("express");
const bodyParser = require("body-parser");
const Leader = require("../models/leaders");

const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());
leaderRouter
  .route("/")
  .get(function (req, res, next) {
    Leader.find({})
      .then(
        (leader) => {
          res.statusCode = 200;
          res.setHeader("content-type", "application/json");
          res.json(leader);
        },
        (err) => {
          next(err);
        }
      )
      .catch((err) => {});
  })

  .post(function (req, res, next) {
    Leader.create(req.body)
      .then(
        (leader) => {
          console.log("Leader Created : ", leader);
          res.statusCode = 200;
          res.setHeader("content-type", "application/json");
          res.json(leader);
        },
        (err) => {
          next(err);
        }
      )

      .catch((err) => {});
  })

  .put(function (req, res, next) {
    res.end("PUT is not supported on LEADER! here right now");
  })
  .delete(function (req, res, next) {
    Leader.remove()
      .then(
        (leader) => {
          res.statusCode = 200;
          res.setHeader("content-type", "application/json");
          res.json(leader);
        },
        (err) => {
          next(err);
        }
      )

      .catch((err) => {});
  });

///////////second route/////////////////////
////////////////////////////////////////////
leaderRouter
  .route("/:leaderID")
  .get(function (req, res, next) {
    Leader.findById(req.params.leaderID)
      .then(
        (leader) => {
          res.statusCode = 200;
          res.setHeader("content-type", "application/json");
          res.json(leader);
        },
        (err) => {
          next(err);
        }
      )
      .catch((err) => {});
  })

  .post(function (req, res, next) {
    res.end(`Post is not supported on LEADER! with ID ${req.params.leaderID}`);
  })
  .put(function (req, res, next) {
    Leader.findByIdAndUpdate(
      req.params.leaderID,
      { $set: req.body },
      { new: true }
    )
      .then(
        (leader) => {
          res.statusCode = 200;
          res.setHeader("content-type", "application/json");
          res.json(leader);
        },
        (err) => {
          next(err);
        }
      )
      .catch((err) => {});
  })
  .delete(function (req, res, next) {
    Leader.findByIdAndDelete(req.params.leaderID)
      .then((leader) => {
        res.statusCode = 200;
        res.setHeader("content-type", "application/json");
        res.json(leader);
      })
      .catch((err) => {});
  });

module.exports = leaderRouter;
