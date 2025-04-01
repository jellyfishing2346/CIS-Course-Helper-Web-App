import React from 'react';
import styles from './SearchBar.module.css'; // Import the CSS module

const SearchBar = ({ searchQuery, onSearchChange, onSearchSubmit }) => {
  return (
    <div className={styles.searchContainer}>
      <form onSubmit={onSearchSubmit} className={styles.searchForm}>
        <input
          type="search"
          placeholder="Search courses, majors, or minors..."
          aria-label="Search courses and programs"
          value={searchQuery}
          onChange={onSearchChange}
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;