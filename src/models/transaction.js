// src/models/transaction.js
const pool = require("../config/db");

const Transaction = {
  create: async (data) => {
    const query = `
      INSERT INTO transactions (title, description, price, date_of_sale, sold, category, images)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    await pool.query(query, [
      data.title,
      data.description,
      data.price,
      data.dateOfSale,
      data.sold,
      data.category,
      data.image,
    ]);
  },
  find: async (month, search, limit, offset) => {
    let query = `
            SELECT *
            FROM transactions
            WHERE 1 = 1
            `;
    const params = [];
    if (month) {
      query += ` AND MONTH(date_of_sale) = ${month}`;
      params.push(month);
    }

    console.log(search);

    if (search.trim() !== "") {
      query += ` AND (title LIKE ? OR description LIKE ?)`;
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    query += ` LIMIT ${limit} OFFSET ${offset}`;
    params.push(limit, offset);

    const [rows] = await pool.query(query, params);
    return rows;
  },
  
  count: async (search, month) => {
    let query = `
        SELECT COUNT(*) AS count
        FROM transactions
        WHERE 1 = 1
    `;
    const params = [];
    console.log(month);

    if (month) {
        query += ` AND MONTH(date_of_sale) = ?`;
        params.push(month);
    }


    if (search.trim() !== "") {
        query += ` AND (title LIKE ? OR description LIKE ? OR CAST(price AS CHAR) LIKE ?)`;
        params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    const [rows] = await pool.query(query, params);
    console.log(rows);
    return rows[0].count;
},

  getStatistics: async (month) => {
    const query = `
            SELECT
                SUM(price) AS total_sale_amount,
                COUNT(CASE WHEN sold = 1 THEN 1 END) AS total_sold_items,
                COUNT(CASE WHEN sold = 0 THEN 1 END) AS total_not_sold_items
            FROM transactions
            WHERE MONTH(date_of_sale) = ?
        `;
    const [rows] = await pool.query(query, [month]);
    console.log(rows);
    return rows[0];
  },
  getbarCharDetails: async (month) => {
    const query = `
        SELECT
            CASE
                WHEN price BETWEEN 0 AND 100 THEN '0-100'
                WHEN price BETWEEN 101 AND 200 THEN '101-200'
                WHEN price BETWEEN 201 AND 300 THEN '201-300'
                WHEN price BETWEEN 301 AND 400 THEN '301-400'
                WHEN price BETWEEN 401 AND 500 THEN '401-500'
                WHEN price BETWEEN 501 AND 600 THEN '501-600'
                WHEN price BETWEEN 601 AND 700 THEN '601-700'
                WHEN price BETWEEN 701 AND 800 THEN '701-800'
                WHEN price BETWEEN 801 AND 900 THEN '801-900'
                ELSE '901-above'
            END AS price_range,
            COUNT(*) AS item_count
        FROM transactions
        WHERE MONTH(date_of_sale) = ?
        GROUP BY price_range
        ORDER BY FIELD(price_range,
            '0-100', '101-200', '201-300', '301-400', '401-500',
            '501-600', '601-700', '701-800', '801-900', '901-above')
    `;
    const [rows] = await pool.query(query, [month]);
    return rows;
  },
  getpieChartDetails: async (month) => {
    const query = `SELECT category, COUNT(*) AS item_count
    FROM transactions
    WHERE MONTH(date_of_sale) = ?
    GROUP BY category;`;

    const [rows] = await pool.query(query, [month]);
    return rows
  },
};

module.exports = Transaction;
