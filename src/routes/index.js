// src/routes/index.js
const express = require('express');
const router = express.Router();
const transactionsController = require('../controllers/transactionsController');
const statisticsController = require('../controllers/statisticsController');
const barChartsController = require('../controllers/barchartController');
const pieChartsController = require('../controllers/pieChartController');
const combinedController = require('../controllers/combinedController');

router.get('/transactions', transactionsController.getTransactions);
router.get('/statistics', statisticsController.getStatistics);
router.get('/graphs', barChartsController.barChars);
router.get('/piecharts', pieChartsController.getPieChartDetails);
router.get('/combined',combinedController.combines)

module.exports = router;
