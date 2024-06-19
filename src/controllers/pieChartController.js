const Transaction = require("../models/transaction");
const { getMonthNumber } = require("../utils/helper");

const getPieChartDetails = async (req, res) => {
  const { month } = req.query;
  const monthNumber = getMonthNumber(month);

  try {
    if (!month ) {
      return res.status(400).json({ error: "Invalid month parameter" });
    }

    const piechart = await Transaction.getpieChartDetails(monthNumber);
    res.json({ piechartDetails: piechart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getPieChartDetails };
