import React from 'react';

const SortOptions = ({ currentSortField, onSortByChange, onSortOrderChange, sortOrder }) => {
    return (
        <div className='container'>
            <label htmlFor="sortBy" style={{    border:' 2px solid black',padding:'6px 0', width:' 120px',margin: '10px 20px',borderRadius:' 7px',background: 'white',color: 'grey'}}>Sort By  </label>
            <select id="sortBy" value={currentSortField} onChange={(e) => onSortByChange(e.target.value)} style={{height:'39px',width: '180px',textAlign: 'center'}}>
                <option value="customer_name">Customer Name</option>
                <option value="location">Location</option>
            </select>
            <button onClick={onSortOrderChange} style={{margin: '0 15px',height: '39px',width: '130px',borderRadius:'5px'}}>Sort {sortOrder === 'asc' ? 'Descending' : 'Ascending'}  </button>
        </div>
    );
};

export default SortOptions;
