import React, { useState } from 'react';

const SearchInput = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='container d-flex my-40'>
            <input className="form-control me-2" type="text" placeholder="Search..." aria-label="Search" value={searchTerm} onChange={handleChange}/>
            <button className="btn btn-outline-success" type="submit">Search</button>
            </div>
        </form>
    );
};

export default SearchInput;
