const express = require('express');
const db = require('../../../db');
const { getAllBurgers } = require('./burgers');
const { getAllRestaurants } = require('./restaurants');

const router = express.Router();

router.get('/burgers', getAllBurgers);
router.get('/restaurants', getAllRestaurants);

module.exports = router;
