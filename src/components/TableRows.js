import React from 'react';
import TableFragment from './TableFragment';

const TableRows = ({ customers }) => {
    return (
        <tbody>
            {customers.map((customer) => (
                <TableFragment key={customer.sno} customer={customer} />
            ))}
        </tbody>
    );
};

export default TableRows;
