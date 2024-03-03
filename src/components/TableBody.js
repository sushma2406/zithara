import React from 'react';
import TableRow from './TableRows';

const TableBody = ({ customers }) => {
    return (
        <tbody>
            {customers.map((customer) => (
                <TableRow key={customer.sno} customer={customer} />
            ))}
        </tbody>
    );
};

export default TableBody;
