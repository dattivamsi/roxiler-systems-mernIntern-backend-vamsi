Features
  --Seed the database with transaction data from an external JSON source.
  --Retrieve transaction data with optional search and pagination.
  --Get statistics of transactions for a specified month.
  --Generate bar chart data based on price ranges for a specified month.
  --Generate pie chart data based on categories for a specified month.

Prerequisites
  -Node.js
  -npm or yarn
  -MySQL
  
Database Setup
  --Make sure MySQL is installed and running on your machine.
  --Seed the database with initial data by running:
  --node seedData.js

  
Start the server:
  --node src/server.js

  
Transactions
GET /api/transactions

Retrieve transactions with optional search and pagination.

Query Parameters:
    month: Name of the month (e.g., "January").
    search: Search term for title or description.
    page: Page number for pagination.
    perPage: Number of items per page.
    GET /api/transactions?month=January&search=phone&page=1&perPage=10
    
Statistics
GET /api/statistics

  Retrieve statistics for a specified month.

Query Parameters:

  month: Name of the month (e.g., "January").
  GET /api/statistics?month=January
Bar Charts
GET /api/graphs

  Retrieve bar chart data for a specified month.
  
  Query Parameters:
  
  month: Name of the month (e.g., "January").
  Example:GET /api/graphs?month=January

Pie Charts
  GET /api/piecharts
  
  Retrieve pie chart data for a specified month.
  
  Query Parameters:
  
  month: Name of the month (e.g., "January").
  Example:GET /api/piecharts?month=January

Combined
  GET /api/combined
  
  Retrieve combined data for a specified month.
  
  Query Parameters:
  
  month: Name of the month (e.g., "January").
  Example:GET /api/combined?month=January


