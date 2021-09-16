const express = require("express");
const bodyParser = require("body-parser");
const Promotion = require("../models/promotions");

const promoRouter = express.Router();
promoRouter.use(bodyParser.json());
promoRouter
  .route("/")
  .get(function (req, res, next) {
    Promotion.find({})
      .then(
        (promotion) => {
          res.statusCode = 200;
          res.setHeader("content-type", "application/json");
          res.json(promotion);
        },
        (err) => {
          next(err);
        }
      )
      .catch((err) => {});
  })

  .post(function (req, res, next) {
    Promotion.create(req.body)
      .then(
        (promotion) => {
          console.log("Promotion Created : ", promotion);
          res.statusCode = 200;
          res.setHeader("content-type", "application/json");
          res.json(promotion);
        },
        (err) => {
          next(err);
        }
      )
      .catch((err) => {});
  })

  .put(function (req, res, next) {
    res.end("PUT is not supported on PROMOTIONS here right now");
  })
  .delete(function (req, res, next) {
    Promotion.remove({})
      .then(
        (promotion) => {
          res.statusCode = 200;
          res.setHeader("content-type", "application/json");
          res.json(promotion);
        },
        (err) => {
          next(err);
        }
      )
      .catch((err) => {});
  });
///////////second route/////////////////////
////////////////////////////////////////////
promoRouter
  .route("/:promoID")
  .get(function (req, res, next) {
    Promotion.findById(req.params.promoID)
      .then(
        (promotion) => {
          res.statusCode = 200;
          res.setHeader("content-type", "application/json");
          res.json(promotion);
        },
        (err) => {
          next(err);
        }
      )
      .catch((err) => {});
  })

  .post(function (req, res, next) {
    res.end(`Post is not availabe on PROMOTION with ID ${req.params.promoID}`);
  })
  .put(function (req, res, next) {
    Promotion.findByIdAndUpdate(
      req.params.promoID,
      { $set: req.body },
      { new: true }
    )
      .then(
        (promotion) => {
          res.statusCode = 200;
          res.setHeader("content-type", "application/json");
          res.json(promotion);
        },
        (err) => {
          next(err);
        }
      )
      .catch((err) => {});
  })
  .delete(function (req, res, next) {
    Promotion.findByIdAndDelete(req.params.promoID)
      .then(
        (dish) => {
          res.statusCode = 200;
          res.setHeader("content-type", "application/json");
          res.json(dish);
        },
        (err) => {
          next(err);
        }
      )
      .catch((err) => {});
  });

module.exports = promoRouter;
