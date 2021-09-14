const express = require("express");
const bodyParser = require("body-parser");

const promoRouter = express.Router();
promoRouter.use(bodyParser.json());
promoRouter
  .route("/")
  .all(function (req, res, next) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })

  .get(function (req, res, next) {
    res.end("Will send all the PROMOTIONS! to you");
  })

  .post(function (req, res, next) {
    res.end(
      `will add the Promotions : ${req.body.name} and ${req.body.description}`
    );
  })

  .put(function (req, res, next) {
    res.end("PUT is not supported on PROMOTIONS here right now");
  })
  .delete(function (req, res, next) {
    res.end("Deleted the specified PROMOTION");
  });

///////////second route/////////////////////
////////////////////////////////////////////
promoRouter
  .route("/:promoID")
  .all(function (req, res, next) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get(function (req, res, next) {
    res.end("Will send PROMOTION with id " + req.params.promoID);
  })

  .post(function (req, res, next) {
    res.end(`will add the PROMOTION with ID ${req.params.promoID}`);
  })
  .put(function (req, res, next) {
    res.end("PUT is called on PROMOTIONID " + req.params.promoID);
  })
  .delete(function (req, res, next) {
    res.end("Deleted the specified PROMOTION with the id " + req.params.promoID);
  });

module.exports = promoRouter;
