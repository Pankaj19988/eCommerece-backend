const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    userid: {
        type: String,
        require: true,
      },
      orderitem: {
        type: [
          {
            productId: {
              type: String,
              require: true,
            },
            quantity: {
              type: String,
              require: true,
            },
            date: {
              type: Date,
              default: Date.now,
            },
          },
        ],
        require: true,
      },
})


module.exports = mongoose.model('order',orderSchema);