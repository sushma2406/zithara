const express = require('express');
const cors=require('cors');
const app = express();
app.use(express.json());
app.use(
    cors({
        origin:"http://localhost:3000"
    })
);
const port = 5000;

const fs = require('fs');
const path = require('path');
const customersFilePath = path.join(__dirname, 'customers.json');


app.get('/api/customers', (req, res) => {
    const page = req.query.page || 1;
    const perPage = 20;
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;

    fs.readFile(customersFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        const customers = JSON.parse(data);
        const slicedCustomers = customers.slice(startIndex, endIndex);
        res.json({ data: slicedCustomers, total: customers.length });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
