const express = require("express");
const CustomCake = require("../models/customCakes");
const mongoose = require("mongoose");
const router = express.Router();

router.get("/", async (req, res, next) => {
      let cakes = await CustomCake.find();
      res.render("items/CustomCakes", {CstmCake: cakes });
});


router.get("/cart/:id",async  (req, res, next) => {
      let cakes = await CustomCake.findById(req.params.id);
      let cart = [];
      if (req.cookies.cart) 
      {cart = req.cookies.cart;}
      cart.push(cakes);
      res.cookie("cart", cart);
      res.send("Item Added Successfully")
});

module.exports = router;
