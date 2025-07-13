import React, { useState } from 'react';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
    // Add search functionality here
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      padding: '2rem',
      backgroundColor: '#f8f9fa' 
    }}>
      <form onSubmit={handleSearch} style={{ 
        display: 'flex', 
        gap: '1rem',
        width: '100%',
        maxWidth: '600px' 
      }}>
        <input
          type="text"
          placeholder="Search for courses (e.g., CISC 3130, Data Structures)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: 1,
            padding: '0.75rem',
            border: '1px solid #ddd',
            borderRadius: '6px',
            fontSize: '1rem'
          }}
        />
        <button
          type="submit"
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          🔍 Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
