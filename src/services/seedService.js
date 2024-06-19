// src/services/seedService.js
const axios = require('axios');
const Transaction = require('../models/transaction');

const seedDatabase = async () => {
    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const transactions = response.data;

        for (let transaction of transactions) {
            await Transaction.create(transaction);
        }

        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding the database:', error);
    }
};

module.exports = {
    seedDatabase,
};
