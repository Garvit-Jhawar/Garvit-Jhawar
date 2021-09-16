const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Dishes = require("../models/dishes");

const dishRouter = express.Router();
dishRouter.use(bodyParser.json());
dishRouter
  .route("/")
  .get(function (req, res, next) {
    Dishes.find({})
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
  })

  .post(function (req, res, next) {
    Dishes.create(req.body)
      .then(
        (dish) => {
          console.log("Dish Created : ", dish);
          res.statusCode = 200;
          res.setHeader("content-type", "application/json");
          res.json(dish);
        },
        (err) => {
          next(err);
        }
      )
      .catch((err) => {});
  })

  .put(function (req, res, next) {
    res.statusCode = 403;
    res.end("PUT is not supported here right now");
  })
  .delete(function (req, res, next) {
    Dishes.remove({})
      .then(
        (result) => {
          res.statusCode = 200;
          res.setHeader("content-type", "application/json");
          res.json(result);
        },
        (err) => {
          next(err);
        }
      )
      .catch((err) => {});
  });

///////////second route/////////////////////
////////////////////////////////////////////
dishRouter
  .route("/:dishesID")
  .get(function (req, res, next) {
    Dishes.findById(req.params.dishesID)
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
  })

  .post(function (req, res, next) {
    res.end(`will add the dishes with ID ${req.params.dishesID}`);
  })
  .put(function (req, res, next) {
    Dishes.findByIdAndUpdate(
      req.params.dishesID,
      { $set: req.body },
      { new: true }
    )
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
  })
  .delete(function (req, res, next) {
    Dishes.findByIdAndDelete(req.params.dishesID)
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
/////////3RD ROUTE////////////////////
///////////////////////////////////////
dishRouter
  .route("/:dishesID/comments")
  .get(function (req, res, next) {
    Dishes.findById(req.params.dishesID)
      .then(
        (dish) => {
          if (dish != null) {
            res.statusCode = 200;
            res.setHeader("content-type", "application/json");
            res.json(dish.comments);
          } else {
            err = new Error("Dish " + req.params.dishesID + " not found");
            err.status = 404;
            return next(err);
          }
        },
        (err) => {
          next(err);
        }
      )
      .catch((err) => {});
  })

  .post(function (req, res, next) {
    Dishes.findById(req.params.dishesID)
      .then(
        (dish) => {
          if (dish != null) {
            dish.comments.push(req.body);
            dish.save().then((dish) => {
              res.statusCode = 200;
              res.setHeader("content-type", "application/json");
              res.json(dish);
            });
          } else {
            err = new Error("Dish " + req.params.dishesID + " not found");
            err.status = 404;
            return next(err);
          }
        },
        (err) => {
          next(err);
        }
      )
      .catch((err) => {});
  })

  .put(function (req, res, next) {
    res.statusCode = 403;
    res.end(
      "PUT is not supported here right now on COMMENTS " + req.params.dishesID
    );
  })
  .delete(function (req, res, next) {
    Dishes.findById(req.params.dishesID)
      .then(
        (dish) => {
          if (dish != null) {
            for (var i = dish.comments.length - 1; i >= 0; i--) {
              dish.comments.id(dish.comments[i]._id).remove();
            }
            dish.save().then((dish) => {
              res.statusCode = 200;
              res.setHeader("content-type", "application/json");
              res.json(dish);
            });
          } else {
            err = new Error("Dish " + req.params.dishesID + " not found");
            err.status = 404;
            return next(err);
          }
        },
        (err) => {
          next(err);
        }
      )
      .catch((err) => {});
  });

///////////4Th ROUTE route/////////////////////
////////////////////////////////////////////
dishRouter
  .route("/:dishesID/comments/:commentID")
  .get(function (req, res, next) {
    Dishes.findById(req.params.dishesID)
      .then(
        (dish) => {
          if (dish != null && dish.comments.id(req.params.commentID) != null) {
            res.statusCode = 200;
            res.setHeader("content-type", "application/json");
            res.json(dish.comments.id(req.params.commentID));
          } else if (dish == null) {
            err = new Error("Dish " + req.params.dishesID + " not found");
            err.status = 404;
            return next(err);
          } else {
            err = new Error("Comment" + req.params.commentID + " not found");
            err.status = 404;
            return next(err);
          }
        },
        (err) => {
          next(err);
        }
      )
      .catch((err) => {});
  })

  .post((req, res, next) => {
    res.statusCode = 403;
    res.end(
      "POST operation not supported on /dishes/" +
        req.params.dishesID +
        "/comments/" +
        req.params.commentID
    );
  })
  .put((req, res, next) => {
    Dishes.findById(req.params.dishesId)
      .then(
        (dish) => {
          if (dish != null && dish.comments.id(req.params.commentID) != null) {
            if (req.body.rating) {
              dish.comments.id(req.params.commentID).rating = req.body.rating;
            }
            if (req.body.comment) {
              dish.comments.id(req.params.commentID).comment = req.body.comment;
            }
            dish.save().then(
              (dish) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(dish);
              },
              (err) => next(err)
            );
          } else if (dish == null) {
            err = new Error("Dish " + req.params.dishesID + " not found");
            err.status = 404;
            return next(err);
          } else {
            err = new Error("Comment " + req.params.commentID + " not found");
            err.status = 404;
            return next(err);
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .delete((req, res, next) => {
    Dishes.findById(req.params.dishesID)
      .then(
        (dish) => {
          if (dish != null && dish.comments.id(req.params.commentID) != null) {
            dish.comments.id(req.params.commentID).remove();
            dish.save().then(
              (dish) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(dish);
              },
              (err) => next(err)
            );
          } else if (dish == null) {
            err = new Error("Dish " + req.params.dishesID + " not found");
            err.status = 404;
            return next(err);
          } else {
            err = new Error("Comment " + req.params.commentID + " not found");
            err.status = 404;
            return next(err);
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

module.exports = dishRouter;
