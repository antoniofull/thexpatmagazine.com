import React from 'react';
import searchIcon from '../img/icon-search.svg';
import '../styles/search.css';

const SearchForm = () => (
  <form className='search-form search wf-montserrat'>
    <label>Search For Items</label>

    <input
      type='text'
      placeholder='Type and hit enter'
      className='search__input'
    />
    <button
      type='submit'
      className='btn--search'
      style={{ backgroundImage: `url(${searchIcon})` }}
    />
  </form>
);

export default SearchForm;
