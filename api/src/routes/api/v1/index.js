const express = require('express');
const db = require('../../../db');

const apiCache = require('apicache').middleware;

const { getAllBurgers } = require('./burgers');
// const { getAllRestaurants } = require('./restaurants');
const { getInstagramBurgerData, getLatestInstagramData } = require('./instagram');

const router = express.Router();

router.get('/burgers', getAllBurgers);
// router.get('/restaurants', getAllRestaurants);
router.get('/instagram-data', apiCache('5 minutes'), getInstagramBurgerData);
router.get('/instagram-data/latest', apiCache('5 minutes'), getLatestInstagramData);
module.exports = router;
