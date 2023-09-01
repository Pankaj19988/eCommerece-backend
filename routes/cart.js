const express = require("express");
const Cart = require("../models/Cart");
const router = express.Router();

// Cart 
// ADD cart item in database POST request " api/cart/add "

router.post("/add", async (req, res) => {
  try {
    const oldUser = await Cart.findOne({ userid: req.body.userId });
    if (oldUser) {
      const cartId = oldUser.id;
    await Cart.updateOne({_id:cartId},{$push:{cartitem:{
        productId: req.body.productId,
        quantity: req.body.quantity,
      }}})
     res.send("addedCart");
    }else{
    await Cart.create({
      userid: req.body.userId,
      cartitem: [
        {
          productId: req.body.productId,
          quantity: req.body.quantity,
        },
      ],
    });
    res.send("item added");
}
  } catch (error) {
    res.status(500).send("server Errors");
  }
});

router.post("/get", async (req, res) => {
    try {
        // const cartId = req.body.cartId
      const finding = await Cart.find({ cartitem:{$elemMatch: { _id: req.body.cartItemId } }});
      res.send(finding);
    } catch (error) {
      res.status(500).send("server Errors");
    }
  });


  

//  DELETE cart item DELETE request "api/cart/delete/:id" //

router.delete("/delete/:id", async (req, res) => {
  try {
    await Cart.updateOne({}, { $pull: { cartitem: { _id: req.params.id } } });
    res.send("Cart Item Deleted");
  } catch (error) {
    res.status(500).send("server Errors");
  }
});
module.exports = router;
