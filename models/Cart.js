const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema({
  userid: {
    type: String,
    require: true,
  },
  cartitem: {
    type: [
      {
        productId: {
          type: String
        },
        quantity: {
          type: String
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    require: true,
  },
});

module.exports = mongoose.model("cart", cartSchema);
