const express = require("express");
const Cupcake = require("../models/cupcake");
const mongoose = require("mongoose");
const router = express.Router();
const auth = require("../midldleware/sessionAuthCheck");

router.get("/", async (req, res, next) => {
      let items = await Cupcake.find();
      res.render("items/CupCakes", { Cupcakes: items });
});
router.get("/cart/:id", async (req, res, next) => {
      let cakes = await Cupcake.findById(req.params.id);
      let cart = [];
      if (req.cookies.cart) {
            cart = req.cookies.cart;
      }
      cart.push(cakes);
      res.cookie("cart", cart);
      req.flash("success","Item Added to the cart");
      res.redirect('/Cupcakes');

});

router.get("/addItem", (req, res, next) => {
      res.render("items/Addcupcake");
});
router.post("/addItem", auth, async (req, res, next) => {
      let cupcake = new Cupcake(req.body);
      await cupcake.save();
      let items = await Cupcake.find();
      req.flash('success','Item Added Successfully');
      res.render("items/Cupcakes", { Cupcakes: items });
});

router.get("/updateItem/:id", async (req, res, next) => {
      let cupcake = await Cupcake.findById(req.params.id);
      res.render("items/UpdateCupcake", { cupcake });
});
router.post("/updateItem/:id", async (req, res, next) => {
      let cupcake = await Cupcake.findById(req.params.id);
      cupcake.imagePath = req.body.imagePath;
      cupcake.name = req.body.name;
      cupcake.QuantityInStock = req.body.QuantityInStock;
      cupcake.price = req.body.price;
      cupcake.url = req.body.url;
      await cupcake.save();
      req.flash('success','Item Updated Successfully');
      res.redirect("/Cupcakes");
});

router.get("/deleteItem/:id", async (req, res, next) => {
      let cupcake = await Cupcake.findByIdAndRemove(req.params.id);
      req.flash('error','Item deleted Successfully');
      res.redirect("/Cupcakes");
});
module.exports = router;
