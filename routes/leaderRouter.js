const express = require("express");
const bodyParser = require("body-parser");

const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());
leaderRouter
  .route("/")
  .all(function (req, res, next) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })

  .get(function (req, res, next) {
    res.end("Will send all the LEADERS! to you");
  })

  .post(function (req, res, next) {
    res.end(
      `will add the LEADER! : ${req.body.name} and ${req.body.description}`
    );
  })

  .put(function (req, res, next) {
    res.end("PUT is not supported on LEADER! here right now");
  })
  .delete(function (req, res, next) {
    res.end("Deleted the specified LEADER!");
  });

///////////second route/////////////////////
////////////////////////////////////////////
leaderRouter
  .route("/:leaderID")
  .all(function (req, res, next) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get(function (req, res, next) {
    res.end("Will send LEADERS! with id " + req.params.leaderID);
  })

  .post(function (req, res, next) {
    res.end(`will add the LEADER! with ID ${req.params.leaderID}`);
  })
  .put(function (req, res, next) {
    res.end("PUT is called on LEADERID! " + req.params.leaderID);
  })
  .delete(function (req, res, next) {
    res.end("Deleted the specified LEADER! with the id " + req.params.leaderID);
  });

module.exports = leaderRouter;
