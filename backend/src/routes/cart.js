
const express = require('express');
const router = express.Router();

const {getCart, saveCart, calculatePrice} = require('../controllers/Cart')

router.get('/:id', getCart)
router.post('/save', saveCart)
router.put('/price', calculatePrice) //Todo: Sería get???

module.exports = router
