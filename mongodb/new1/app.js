const express = require("express");
const { connectToDb, getDb } = require("./db");
const { ObjectId } = require("mongodb");

const app = express();
app.use(express.json());
let db;
connectToDb((err) => {
  if (!err) {
    app.listen(3000, () => {
      console.log(`app listening on port 3000`);
    });
    db = getDb();
  }
});

app.get("/orders", (req, res) => {
    const orderID=req.query.p || 0
    const orderId=3
  let orders = [];
  db.collection("orders")
    .find()
    .sort({ customer: 1 })
    .skip(orderID*orderId)
    .limit(orderId)
    .forEach((order) => orders.push(order))
    .then(() => {
      res.status(200).json(orders);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not fetch the documents" });
    });
});

app.get("/orders/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection("orders")
      .findOne({ _id: new ObjectId(req.params.id) })
      .then((doc) => {
        res.status(200).json(doc);
      })

      .catch((err) => {
        res.status(500).json({ error: "Could not fetch the document" });
      });
  } else {
    res.status(500).json({ error: "Not a valid doc id" });
  }
});

app.post("/orders", (req, res) => {
  const order = req.body;
  db.collection("orders")
    .insertOne(order)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(500).json({ err: `Could not create a new document` });
    });
});

app.delete("/orders/:id", (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
    db.collection("orders")
      .deleteOne({ _id: new ObjectId(req.params.id) })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({ error: "Could not delete the document" });
      });
  } else {
    res.status(500).json({ error: "Not a valid doc id" });
  }
});

app.patch('/orders/:id',(req,res)=>{
const updates=req.body
if (ObjectId.isValid(req.params.id)) {
    db.collection("orders")
      .updateOne({ _id: new ObjectId(req.params.id) },{$set:updates})
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({ error: "Could not update the document" });
      });
  } else {
    res.status(500).json({ error: "Not a valid doc id" });
  }
})