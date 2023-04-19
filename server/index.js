"use strict";

const express = require("express");
const morgan = require("morgan");

const {
  getItems,
  getItemById,
  getCompanyDetails,
  getCompaniesList,
  getItemsWithCompanyNames,
  getCategoryItems,
  addToCart,
  removeFromCart,
  checkout,
  getCart,
  addUser,
  getOrder,
  getAllOrders,
} = require("./handlers");

const PORT = 4000;

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  // REST endpoints?
  .get("/bacon", (req, res) => res.status(200).json("🥓"))

  .get("/items", getItems) // works

  .get("/items/:_id", getItemById) // works

  .get("/company/:_id", getCompanyDetails) // works

  .get("/companies", getCompaniesList) // works

  .get("/items-with-company-names", getItemsWithCompanyNames) // works

  .get("/category/:category", getCategoryItems) // work

  .post("/add-user/:userId", addUser) // works

  .post("/cart/:userId", addToCart) // works // req.body = { _id: item ID, quantity: quantity added to cart }

  .get("/get-cart/:userEmail", getCart) // works

  .patch("/remove-from-cart", removeFromCart) // works

  .post("/checkout", checkout) // works

  .get("/order/:orderId", getOrder) // works

  .get("/orders/:userId", getAllOrders) // works

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
