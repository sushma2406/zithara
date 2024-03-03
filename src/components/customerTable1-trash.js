import React, { useEffect, useState } from 'react';
import TableRows from './TableRows';

const CustomerTable = () => {
    const [customers, setCustomers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortField, setSortField] = useState('created_at');

    useEffect(() => {
        fetchCustomers();
    },);
    const fetchCustomers = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/customers?page=${currentPage}&sortField=${sortField}&sortOrder=${sortOrder}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setCustomers(data.data);
            setTotalPages(Math.ceil(data.total / 20));
            // Rest of the function remains the same
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };
    
    // const fetchCustomers = async () => {
    //     try {
    //         const response = await fetch(`http://localhost:5000/api/customers?page=${currentPage}`);
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }
    //         const data = await response.json();
    //         setCustomers(data.data);
    //         setTotalPages(Math.ceil(data.total / 20));
    //     } catch (error) {
    //         console.error('Error fetching customers:', error);
    //     }
    // };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredCustomers = customers.filter((customer) =>
        customer.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    

    return (
        <div>
            <input type="text" placeholder="Search..." onChange={handleSearch} />
            <table>
                <thead>
                    <tr>
                        <th>Customer Name</th>
                        <th>Age</th>
                        <th>Phone</th>
                        <th>Location</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <TableRows customers={filteredCustomers} />
            </table>
            <div> 
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button key={page} onClick={() => setCurrentPage(page)}>
                        {page}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CustomerTable;
