const auth = require("../midldleware/sessionAuthCheck");
const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
      res.render("index", { title: "Express" });
});
/* GET home page. */
router.get("/", function (req, res, next) {
      res.render("index", { title: "Express" });
});

router.get("/ShoppingCart", function (req, res, next) {
      let cart = req.cookies.cart;
      if (!cart) cart = [];
      res.render("Shopping/cart", { cart });
});

router.get("/cart/removeItem/:id", async function (req, res, next) {
      let cart = [];
      if (req.cookies.cart) {
            cart = req.cookies.cart;
      }
      cart.splice(
            cart.findIndex((c) => c._id == req.params.id),
            1
      );
      res.cookie("cart", cart);
      req.flash("error", "Item was removed from the cart");
      res.redirect("/ShoppingCart");
});

router.get("/cart/checkout", auth, function (req, res, next) {
      let cart = [];
      if (req.cookies.cart) {
            cart = req.cookies.cart;
            cart = [];
            res.cookie("cart", cart);
            req.flash("success", "Your Order will shipped soon");
      }

      res.redirect("/ShoppingCart");
});

router.get("/AboutUs", function (req, res, next) {
      res.render("aboutus");
});

module.exports = router;
