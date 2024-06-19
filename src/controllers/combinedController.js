const { default: axios } = require("axios");
const { getMonthNumber } = require("../utils/helper");

const combines = async (req, res) => {
  try {
    const { month } = req.query;
    if (!month) {
      return res.status(400).send("Month is required.");
    }
    const statisticsResponse = await axios.get(
      `http://localhost:3000/api/statistics?month=${month}`,
    );
    
    const barChartResponse = await axios.get(`http://localhost:3000/api/graphs`, {
      params: { month },
    });

    const pieChartResponse = await axios.get(`http://localhost:3000/api/piecharts`, {
      params: { month },
    });

    res.status(200).json({
      statistics: statisticsResponse.data,
      bar_chart: barChartResponse.data,
      pie_chart: pieChartResponse.data
    });
  } catch (error) {
    res.status(500).send({error: error.message});
  }
};

module.exports = { combines };
