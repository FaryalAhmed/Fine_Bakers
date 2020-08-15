var mongoose = require("mongoose");

const cakesSchema = new mongoose.Schema({
      imagePath: {
            type: String,
            required: true,
      },
      name: {
        type: String,
        required: true,
       },

      size: {
            type: String,
            required: true,
      },
      QuantityInStock: {
            type: Number,
            required: true,
      },
      price: {
            type: Number,
            required: true,
      },
      url: {
            type: String,
            required: true,
      },
});
const Customcake = mongoose.model("Customcake", cakesSchema);

module.exports = Customcake;
