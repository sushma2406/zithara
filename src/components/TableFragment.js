import React from 'react';

const TableFragment = ({ customer }) => {
    return (
        <tr key={customer.sno} style={{padding:'10px', borderColor:'white', borderWidth:'3px'}}>
            <td style={{padding:'10px'}}>{customer.customer_name}</td>
            <td style={{padding:'10px'}}>{customer.age}</td>
            <td style={{padding:'10px'}}>{customer.phone}</td>
            <td style={{padding:'10px'}}>{customer.location}</td>
            <td style={{padding:'10px'}}>{customer.created_at}</td>
        </tr>
    );
};

export default TableFragment;
