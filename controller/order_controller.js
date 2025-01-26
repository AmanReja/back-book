const express = require("express");
const orderSchema = require("../model/orderSchema");
const router = express.Router();
const CartSchema = require("../model/CartSchema");

router.post("/addOrder", async (req, res) => {
  const { bookname, price, quantity, bookimage, authore, offer } = req.body;
  const data = new orderSchema({
    userid: req.body.userid,
    totalamount: req.body.totalamount,
    itemquantity: req.body.itemquantity,
    items: [{ bookname, price, quantity, bookimage, authore, offer }]
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);

    const deleteCart = await CartSchema.findOneAndDelete({ userid });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
