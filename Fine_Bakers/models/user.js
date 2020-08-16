var a

var mongoose = require("mongoose");
const config = require('config');
const jwt = require("jsonwebtoken");
const { model } = require("./customCakes");
const Joi = require("joi");
var bcrypt = require("bcrypt");
const { boolean } = require("joi");

const userSchema = new mongoose.Schema({
      firstname: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 35,
      },
      lastname: { type: String, required: true, minlength: 5, maxlength: 35 },
      email: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 70,
            unique: true,
      },
      password: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 240,
      },
      admin:{type:Boolean}
});

userSchema.methods.generateAuthToken = function() { 
      const token = jwt.sign({ _id: this._id, admin: this.admin }, config.get('jwtPrivateKey'));
      return token;
    }
    
const User = mongoose.model("User", userSchema);

function validateUser(user) {
      const schema = Joi.object({
            firstname: Joi.string().min(5).max(35).required(),
            lastname: Joi.string().min(5).max(35).required(),
            email: Joi.string().min(5).max(70).required().email(),
            password:Joi.string().min(5).max(240).required(),
      });

      return schema.validate(user);
}
exports.User = User;
exports.validateUser= validateUser;