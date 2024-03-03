import React, { useEffect, useState } from 'react';
import TableRows from './TableRows';
import SearchInput from './SearchInput';
import SortOptions from './SortOptions';

const CustomerTable = () => {
    const [customers, setCustomers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortField, setSortField] = useState('customer_name');
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        fetchCustomers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, sortField, sortOrder]);

    const fetchCustomers = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/customers?page=${currentPage}&sortField=${sortField}&sortOrder=${sortOrder}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setCustomers(data.data);
            setTotalPages(Math.ceil(data.total / 20));
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    const handleSearch = (value) => {
        setSearchTerm(value);
    };

    const handleSortByChange = (value) => {
        setSortField(value);
    };

    const toggleSortOrder = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const sortedCustomers = [...customers].sort((a, b) => {
        const fieldA = sortField === 'location' ? a[sortField].toLowerCase() : a[sortField];
        const fieldB = sortField === 'location' ? b[sortField].toLowerCase() : b[sortField];
        return sortOrder === 'asc' ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA);
    });

    const filteredCustomers = sortedCustomers.filter((customer) =>
        customer.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="container" style={{ display: 'flex', justifyContent: 'center', marginTop: '30px', textAlign: 'center' }}>
                <SearchInput onSearch={handleSearch} />
                <SortOptions currentSortField={sortField} onSortByChange={handleSortByChange} onSortOrderChange={toggleSortOrder} />
            </div>
            <div className="container d-flex justify-content-between" style={{ width: 'fit-content', marginTop: '40px' }}>
                <table style={{ width: '80vw', backgroundColor: 'grey', color: 'white' }}>
                    <thead style={{ color: 'white', backgroundColor: 'black' }}>
                        <tr>
                            <th style={{ padding: '10px' }}>Customer Name</th>
                            <th style={{ padding: '10px' }}>Age</th>
                            <th style={{ padding: '10px' }}>Phone</th>
                            <th style={{ padding: '10px' }}>Location</th>
                            <th style={{ padding: '10px' }}>Created At</th>
                        </tr>
                    </thead>
                    <TableRows customers={filteredCustomers} />
                </table>
            </div>
            <div style={{display:'flex',justifyContent:'center',margin:'10px 0'}}>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button key={page} onClick={() => setCurrentPage(page)} style={{height:'40px',width:'40px', margin:'0 5px',font:'5px',fontWeight:'bold',borderRadius:'20px',background:'red'}}>
                        {page}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CustomerTable;
