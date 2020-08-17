const express = require("express");
const Bakeryitem = require("../models/bakeryItems");
const mongoose = require("mongoose");
const router = express.Router();
const auth = require("../midldleware/sessionAuthCheck");

router.get("/", async (req, res, next) => {
      let bakeProds = await Bakeryitem.find();

      res.render("items/BakeryItems", { BakeryProducts: bakeProds });
});
router.get("/cart/:id", async (req, res, next) => {
      let bakeryItems = await Bakeryitem.findById(req.params.id);
      let cart = [];
      if (req.cookies.cart) {
            cart = req.cookies.cart;
      }
      cart.push(bakeryItems);
      res.cookie("cart", cart);
      req.flash("success","Item Added to the cart");
      res.redirect('/BakeryProducts');

});

router.get("/addItem", (req, res, next) => {
      res.render("items/AddItem");
});
router.post("/addItem", auth, async (req, res, next) => {
      let bakeryItem = new Bakeryitem(req.body);
      await bakeryItem.save();
      let bakeProds = await Bakeryitem.find();
      req.flash('success','Item Added Successfully');
      res.render("items/BakeryItems", { BakeryProducts: bakeProds });
});

router.get("/updateItem/:id",async(req, res, next) => {
      let bakeryItem = await Bakeryitem.findById(req.params.id);
      res.render("items/updateItem",{bakeryItem});     
});
router.post("/updateItem/:id", async (req, res, next)=> {
      let bakeryItem = await Bakeryitem.findById(req.params.id);
      bakeryItem.imagePath = req.body.imagePath;
      bakeryItem.name = req.body.name;
      bakeryItem.QuantityInStock = req.body.QuantityInStock;
      bakeryItem.price = req.body.price;
      bakeryItem.url = req.body.url;
      await bakeryItem.save();
       req.flash('success','Item Updated Successfully');


      res.redirect("/BakeryProducts");
    });

router.get("/deleteItem/:id",async(req,res,next)=>
{    let product = await Bakeryitem.findByIdAndRemove(req.params.id); 
      req.flash('error','Item deleted Successfully')  
      res.redirect("/BakeryProducts");
});
module.exports = router;
