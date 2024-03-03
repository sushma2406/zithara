const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: 'pwd.env' });
const { Pool } = require('pg');
const app = express();
const port = 5000;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'project_database',
    password: process.env.DB_PASSWORD,
    port: 5432,
});

app.use(express.json());
app.use(
    cors({
        origin: 'http://localhost:3000',
    })
);

app.get('/api/customers', (req, res) => {
    const page = req.query.page || 1;
    const perPage = 20;
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;

    pool.query('SELECT * FROM project_node', (err, result) => {
        if (err) {
            console.error('Error querying database:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        const customers = result.rows;
        const slicedCustomers = customers.slice(startIndex, endIndex);
        res.json({ data: slicedCustomers, total: customers.length });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
