// seedData.js
require('dotenv').config();
const { seedDatabase } = require('./src/services/seedService');

seedDatabase();
