var mongoose = require("mongoose");

const bakerySchema = new mongoose.Schema({
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
const Bakeryitem = mongoose.model("Bakeryitem", bakerySchema);

module.exports = Bakeryitem;
