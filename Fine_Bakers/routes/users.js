
const { User, validateUser } = require("../models/user.js");
const express = require("express");
const bcrypt = require("bcryptjs");
const _ = require("lodash");

var router = express.Router();

router.get("/signup", (req, res, next) => {
      res.render("users/signup");
});

router.post("/signup", async (req, res, next) => {
      let user = await User.findOne({ email: req.body.email });
      if (user)
            return res.status(400).render("users/signup", {
                  title: "User already registered.",
            });

      const { error } = validateUser(req.body);
      if (error) {
            return res.render("users/signup", { title: error.message });
      } else {
            let user = new User(
                  _.pick(req.body, [
                        "firstname",
                        "lastname",
                        "email",
                        "password",
                  ])
            );
            bcrypt.genSalt(10, function (err, salt) {
                  bcrypt.hash(user.password, salt, async function (err, hash) {
                        if (err) {
                              console.log(err);
                        }
                        user.password = hash;
                        await user.save(function (err) {
                              if (err) {
                                    console.log(err);
                                    return;
                              } else {

                                    res.redirect("/users/login");
                              }
                        });
                  });
            });
      }
});
router.get("/login", (req, res, next) => {
      res.render("users/signin");
});

router.post("/login", async (req, res, next) => {
      let user = await User.findOne({ email: req.body.email });
      if (!user) {
            return res.status(400).render("users/signin", {
                  title: "User doesn't exist.",
            });
      }

      let isValid = await bcrypt.compare(req.body.password, user.password);
      if (!isValid) {
            return res.status(401).render("users/signin", {
                  title: "Invalid email or passsword",
            });
      }

      if (isValid) {
            req.session.user = user;
            req.session.user.admin = user.admin;
            res.redirect("/users/profile");
      }
});

router.get("/", function (req, res, next) {
      req.session.user = null;
      res.redirect("/");
});


router.get('/profile/update/:id',async(req, res, next)=>{

let user = await User.findById(req.params.id)
      res.render("users/updateProfile",{user});
});
router.post('/profile/update/:id',async(req, res, next)=>{

      let user = await User.findById(req.params.id)
      user.firstname = req.body.firstname;
      user.lastname = req.body.lastname;
      user.email= req.body.email;
      user.password = req.body.password;
      bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(user.password, salt, async function (err, hash) {
                  if (err) {
                        console.log(err);
                  }
                  user.password = hash;
                  await user.save(function (err) {
                        if (err) {
                              console.log(err);
                              return;
                        } else {
                              res.redirect("/users/profile");

                        }
                  });
            });
      });
      });
router.get('/profile',async(req, res, next)=>{

      let user = await User.findById(req.session.user._id)
            res.render("users/profile",{user});
      });
router.get('/profile/delete/:id',async(req, res, next)=>{
      let user = await User.findByIdAndRemove(req.params.id);
      req.session.user = null;
      res.redirect("/");
});


module.exports = router;
