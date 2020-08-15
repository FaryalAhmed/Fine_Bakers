const express = require("express");
const Cupcake = require("../models/cupcake");
const mongoose = require("mongoose");
const router = express.Router();

router.get("/", async (req, res, next) => {
      let items = await Cupcake.find();
      res.render("items/CupCakes", {Cupcakes: items});
});
router.get("/cart/:id",async  (req, res, next) => {
      let cakes = await Cupcake.findById(req.params.id);
      let cart = [];
      if (req.cookies.cart) 
      {cart = req.cookies.cart;}
      cart.push(cakes);
      res.cookie("cart", cart);
      res.send("Item Added Successfully")
});
router.get("/cart/removeItem/:id", async function (req, res, next) {
      let cart = [];
      if (req.cookies.cart) cart = req.cookies.cart;
      cart.splice(cart.findIndex((c) => c._id == req.params.id),1);
      res.cookie("cart",cart);
      res.redirect("/ShoppingCart");
    });

module.exports = router;
