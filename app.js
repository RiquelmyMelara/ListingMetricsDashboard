require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const exphbs = require('express-handlebars').create(); // Update this line
const app = express();
const port = 3000;

// Set up handlebars as the template engine
app.engine('handlebars', exphbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static('public'));

// Set up PostgreSQL connection using environment variables
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: { rejectUnauthorized: false },
});

// Route for dashboard
app.get('/dashboard', async (req, res) => {
    try {
        // Query to fetch the necessary data
        const result = await pool.query(`
            SELECT 
                s.title AS broker,
                DATE_TRUNC('month', d.listing_date) AS listing_month,
                COUNT(d.id) AS new_listings,
                AVG(d.revenue) AS avg_revenue
            FROM deals d
            JOIN sites s ON d.site_id = s.id
            WHERE d.listing_date BETWEEN '2020-11-01' AND '2021-11-30'
            GROUP BY s.title, listing_month
            ORDER BY listing_month, s.title;
        `);

        // Restructure the data for the chart
        const chartData = {};
        result.rows.forEach(row => {
            const month = new Date(row.listing_month).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
            if (!chartData[row.broker]) {
                chartData[row.broker] = { broker: row.broker, months: [], listings: [] };
            }
            chartData[row.broker].months.push(month);
            chartData[row.broker].listings.push(row.new_listings);
        });

        const formattedData = result.rows.map(row => ({
            ...row,
            listing_month: new Date(row.listing_month).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }),
            avg_revenue: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(row.avg_revenue)
        }));

        // Pass both the chartData and table data to the template
        res.render('dashboard', { data: formattedData, chartData: Object.values(chartData) });
    } catch (err) {
        console.error(err);
        res.send("Error fetching data from the database.");
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
