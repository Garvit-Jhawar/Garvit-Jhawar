const express = require("express");
const bodyParser = require("body-parser");

const dishRouter = express.Router();
dishRouter.use(bodyParser.json());
dishRouter
  .route("/")
  .all(function (req, res, next) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })

  .get(function (req, res, next) {
    res.end("Will send all the dishes to you");
  })

  .post(function (req, res, next) {
    res.end(
      `will add the dishes : ${req.body.name} and ${req.body.description}`
    );
  })

  .put(function (req, res, next) {
    res.end("PUT is not supported here right now");
  })
  .delete(function (req, res, next) {
    res.end("Deleted the specified dish");
  });

///////////second route/////////////////////
////////////////////////////////////////////
dishRouter
  .route("/:dishesID")
  .all(function (req, res, next) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get(function (req, res, next) {
    res.end("Will send dish with id " + req.params.dishesID);
  })

  .post(function (req, res, next) {
    res.end(`will add the dishes with ID ${req.params.dishesID}`);
  })
  .put(function (req, res, next) {
    res.end("PUT is called on ID " + req.params.dishesID);
  })
  .delete(function (req, res, next) {
    res.end("Deleted the specified dish with the id " + req.params.dishesID);
  });

module.exports = dishRouter;
