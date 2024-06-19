const Transaction = require("../models/transaction");
const { getMonthNumber } = require("../utils/helper");

const barChars = async (req, res) => {
  const { month } = req.query;
  const monthNumber = getMonthNumber(month);

  try {
    const graphDetails = await Transaction.getbarCharDetails(monthNumber);
    console.log(graphDetails);
    res.json({graphDetails:graphDetails});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  barChars,
};
