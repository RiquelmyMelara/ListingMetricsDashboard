

# ListingMetricsDashboard

### Overview

**ListingMetricsDashboard** is a server-side web application designed to analyze business listings and track key metrics, such as the number of new listings per month and average revenue per listing. The application displays data using dynamic line charts for each broker and provides a sortable, filterable table for more detailed analysis.

### Features

- **Line Graph**: Visualizes the number of new listings per month for each broker from November 2020 through November 2021, with each broker represented by its own unique line.
- **Sortable & Filterable Table**: Displays data including broker name, month, new listings, and average revenue. The table supports sorting and filtering for easy data exploration.
- **Data Aggregation**: Aggregates data by month and broker to provide clear insights into listing trends and revenue.
- **Responsive Design**: Built with a responsive layout to ensure usability across different screen sizes.
- **Scalable Architecture**: Designed with scalability in mind, using server-side data processing and efficient database queries.

### Tech Stack

- **Backend**:
    - [Express.js](https://expressjs.com/) - Web framework for Node.js.
    - [pg](https://www.npmjs.com/package/pg) - PostgreSQL client for Node.js.

- **Templating**:
    - [Handlebars](https://handlebarsjs.com/) - Templating engine for server-side HTML generation.

- **Charting**:
    - [Chart.js](https://www.chartjs.org/) - JavaScript library for rendering interactive charts.

- **Table Sorting and Filtering**:
    - [DataTables](https://datatables.net/) - jQuery plugin for advanced interaction controls for tables.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/ListingMetricsDashboard.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd ListingMetricsDashboard
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Configure PostgreSQL Connection**:
   Create a `.env` file in the root directory and add your database configuration:
   ```bash
   DB_USER=
   DB_HOST=
   DB_NAME=
   DB_PASSWORD=
   DB_PORT=5432
   DB_SSL=true
   ```

5. **Run the application**:
   ```bash
   npm run dev
   ```

6. **Access the dashboard**:
   Open your browser and navigate to `http://localhost:3000/dashboard`.

### Architecture and Data Flow

- **Data Access**: Data is fetched from a PostgreSQL database using `pg`. The query joins the `deals` and `sites` tables, aggregating data by broker and month using SQL's `GROUP BY` and `DATE_TRUNC` functions to provide monthly metrics.
- **Data Formatting**: Dates are formatted to `MMM YYYY` (e.g., `Nov 2020`), and revenue is formatted as currency using JavaScript's `Intl.NumberFormat`.
- **Rendering**: The data is passed to Handlebars templates, where it is used to render a Chart.js line chart and a DataTables-enhanced table.
- **Chart**: Each broker is represented by a unique line on the chart, showing the trend of new listings over time.
- **Table**: The table is sortable and filterable, allowing users to explore the dataset dynamically.

### Scalability Considerations

If the application needed to support millions of deals and thousands of brokers, the following enhancements would be considered:
- **Database Optimization**: Indexing key columns and using summary tables for pre-aggregated data.
- **Caching**: Implementing caching for frequently accessed data to reduce database load.
- **ETL Pipelines**: Using ETL processes to preprocess and store aggregated data, improving query performance.
- **Pagination**: Implementing pagination and lazy loading in both the chart and table for improved client-side performance.

### Key Decisions

- **X-Axis of the Graph**: Used `listing_date` (truncated to month) to show the trend of new listings over time, which is essential for visualizing growth patterns.
- **DataTables for Table**: Chose DataTables to provide built-in sorting, filtering, and pagination for the broker data table.
- **deal_history Table**: Not used in this implementation because the focus was on analyzing new listings and revenue trends, rather than tracking historical changes to individual deals.

### Dependencies

- `express`
- `pg`
- `express-handlebars`
- `chart.js`
- `jquery`
- `datatables.net`
- `dotenv`

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

