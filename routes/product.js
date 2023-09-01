const express = require("express");
const Product = require("../models/Product");
const router = express.Router();

// product add POST request "api/product/add"
router.post("/add", async (req, res) => {
  try {
    await Product.create({
      image: req.body.image,
      title: req.body.title,
      description: req.body.description,
      price: parseInt(req.body.price),
      category: req.body.category,
      size: req.body.size,
      totleRatting: req.body.totleRatting,
      star: req.body.star,
      mrp: req.body.mrp,
      price: req.body.price,
    });
    res.send(req.body);
  } catch (error) {
    res.status(500).send(error);
  }
});

// get all products GET api/products/all  //
router.get("/all", async (req, res) => {
  try {
    const data = await Product.find();
    res.send(data);
  } catch (err) {
    res.status(500).send("server errors");
  }
});

// Find Product POST api/product/:id //
router.post("/:id", async (req, res) => {
  try {
    const data = await Product.findById(req.params.id);
    res.send(data);
  } catch (err) {
    res.status(500).send("server errors");
  }
});

router.post("/productgetbyid", async (req, res) => {
  // const ids = req.body.allproductid;
  // const oids = [];
  // ids.forEach(function (item) {
  //   oids.push(new ObjectId(item));
  // });
  // var documentIds = ids.map(function (myId) {
  //   return ObjectId(myId);
  // });
  try {
    const data = await Product.find({ _id: { $in: req.body.allproductid } });
    res.send(data);
  } catch (error) {
    res.status(500).send("server Errors");
  }
});

module.exports = router;
