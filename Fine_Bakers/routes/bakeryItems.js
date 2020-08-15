const express = require("express");
const Bakeryitem = require("../models/bakeryItems");
const mongoose = require("mongoose");
const router = express.Router();

router.get("/", async (req, res, next) => {
      let bakeProds = await Bakeryitem.find();
      console.log(bakeProds);
      res.render("items/BakeryItems", {BakeryProducts: bakeProds });
});
router.get("/cart/:id",async  (req, res, next) => {
      let bakeryItems = await Bakeryitem.findById(req.params.id);
      let cart = [];
      if (req.cookies.cart) 
      {cart = req.cookies.cart;}
      cart.push(bakeryItems);
      res.cookie("cart", cart);
      res.send("Item Added Successfully")
});
module.exports = router;
