const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');
//Item model
const Item = require('../../models/Item');

//create get router on items
router.get('/', (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items));
});

//router post
router.post('/', auth, (req, res) => {
  const newItem = new Item({
    name: req.body.name,
    discription: req.body.discription,
    price: req.body.price
  });
  newItem.save().then(item => res.json(item));
});

//DELETE @Items Router

router.get('/:id', auth, (req, res) => {
  Item.findByIdAndDelete(req.params.id)
    .then(item => res.json(item))
    .catch(err => res.status(400).json('Error' + err));
});

module.exports = router;
