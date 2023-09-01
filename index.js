const connectToMongo = require('./db');
const express = require('express');
const cors = require("cors");


connectToMongo();
const app = express()
const port = 8080

// Middle wher //

app.use(express.json())
app.use(cors())

// Available Routs //

app.use('/api/user',require('./routes/user'));
app.use('/api/product',require('./routes/product'));
app.use('/api/cart',require('./routes/cart'));
app.use('/api/order',require('./routes/order'));


app.listen(port, () => {
  console.log(`app listening on port http://localhost:${port}`)
})



// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");


// main().catch((err) => console.log(err));
// async function main() {
//   await mongoose.connect("mongodb://127.0.0.1:27017/ecome");
//   console.log("mongoDB connected");
// }


// const server = express();

// server.use(cors());
// server.use(bodyParser.json());

// server.post("/user", async (req, res) => {
//   let user = new User();
//   user.username = req.body.username;
//   user.surname = req.body.surname;
//   const doc = await user.save();
//   res.json(doc);
//   // console.log(doc)
// });

// server.get("/user", async (req, res) => {
//   const docs = await User.find({});
//   res.json(docs);
// });

// server.delete('/user/:id', async (req, res) => {
  
//   try{
//     const deleteName = await User.findByIdAndDelete(req.params.id);
//   }catch(e){
//     res.status(500).send(e)
//   }
// });

// server.listen(8080, () => {
//   console.log("server started!");
// });
