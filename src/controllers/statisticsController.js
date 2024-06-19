// src/controllers/statisticsController.js
const Transaction = require('../models/transaction');
const { getMonthNumber } = require('../utils/helper');

const getStatistics = async (req, res) => {
    const { month } = req.query;
    const monthNumber = getMonthNumber(month);

    try {
        const stats = await Transaction.getStatistics(monthNumber);
        res.json({
            totalSaleAmount: stats.total_sale_amount || 0,
            totalSoldItems: stats.total_sold_items || 0,
            totalNotSoldItems: stats.total_not_sold_items || 0
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getStatistics,
};
