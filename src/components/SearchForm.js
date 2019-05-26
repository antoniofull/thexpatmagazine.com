import React from 'react';
import SearchIcon from '../img/icon-search.svg';
import '../styles/search.css';

const SearchForm = () => (
  <form className='search-form search '>
    <label>Search For Items</label>

    <input
      type='text'
      placeholder='Type and hit enter'
      className='search__input'
    />
    <button type='submit' className='btn--search'>
      <SearchIcon />
    </button>
  </form>
);

export default SearchForm;
