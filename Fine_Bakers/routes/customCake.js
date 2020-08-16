const express = require("express");
const CustomCake = require("../models/customCakes");
const mongoose = require("mongoose");
const router = express.Router();
const auth = require("../midldleware/sessionAuthCheck");
router.get("/", async (req, res, next) => {
      let cakes = await CustomCake.find();
      res.render("items/CustomCakes", { CstmCake: cakes });
});

router.get("/cart/:id", async (req, res, next) => {
      let cakes = await CustomCake.findById(req.params.id);
      let cart = [];
      if (req.cookies.cart) {
            cart = req.cookies.cart;
      }
      cart.push(cakes);
      res.cookie("cart", cart);
      res.send("Item Added Successfully");
});

router.get("/addItem", (req, res, next) => {
      res.render("items/AddcustomCake");
});
router.post("/addItem", auth, async (req, res, next) => {
      let cstmCake = new CustomCake(req.body);
      await cstmCake.save();
      let cakes = await CustomCake.find();
      res.render("items/CustomCakes", { CstmCake: cakes });
});

router.get("/updateItem/:id", async (req, res, next) => {
      let cstmcake = await CustomCake.findById(req.params.id);
      res.render("items/UpdateCustomCake", { cstmcake });
});
router.post("/updateItem/:id", async (req, res, next) => {
      let cstmCake = await CustomCake.findById(req.params.id);
      cstmCake.imagePath = req.body.imagePath;
      cstmCake.name = req.body.name;
      cstmCake.size = req.body.size;
      cstmCake.QuantityInStock = req.body.QuantityInStock;
      cstmCake.price = req.body.price;
      cstmCake.url = req.body.url;
      await cstmCake.save();
      res.redirect("/CustomizedCakes");
});

router.get("/deleteItem/:id", async (req, res, next) => {
      let cstmCake = await CustomCake.findByIdAndRemove(req.params.id);
      res.redirect("/CustomizedCakes");
});
module.exports = router;

module.exports = router;
