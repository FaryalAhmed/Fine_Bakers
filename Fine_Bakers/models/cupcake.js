var mongoose = require("mongoose");

const cupCakeSchema = new mongoose.Schema({
      imagePath: {
            type: String,
            required: true,
      },
      name: {
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
const Cupcake = mongoose.model("Cupcake", cupCakeSchema);

module.exports = Cupcake;
