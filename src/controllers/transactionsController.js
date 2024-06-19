// src/controllers/transactionsController.js
const Transaction = require('../models/transaction');
const { getMonthNumber } = require('../utils/helper');

const getTransactions = async (req, res) => {
    const { month, search = "" , page = 1, perPage = 10 } = req.query;
    const monthNumber = getMonthNumber(month);
    const offset = (page - 1) * perPage;

    try {
        const transactions = await Transaction.find(monthNumber, search, parseInt(perPage), parseInt(offset));
        const total = await Transaction.count(search,monthNumber);
        res.json({ transactions, total, page, perPage });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getTransactions,
};
