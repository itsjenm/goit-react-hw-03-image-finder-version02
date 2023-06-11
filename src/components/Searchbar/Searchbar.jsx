import React, { useState } from 'react'
import PropTypes from 'prop-types';
import Styled from './searchbar.module.css';
import { toast } from 'react-toastify';


const Searchbar = ({ onSubmit }) => {
    const [searchQuery, setSearchQuery] = useState('');
   
    
    function handleSearchQueryChange (event) {
        setSearchQuery(event.currentTarget.value.toLowerCase());
    }

    function handleSubmit(event) {
        event.preventDefault(); 
        if(searchQuery.trim() === '') {
            setSearchQuery('');
            return toast.info('Input your search query');
        }
        onSubmit(searchQuery);
        setSearchQuery('');
    }; 


  return (
    <header className={Styled.Searchbar}>
        <form className={Styled.SearchForm} onSubmit={handleSubmit} >
            <button type='submit' className={Styled.SearchForm_button}>
                <span className={Styled.SearchForm_button_label}>Search</span>
            </button>
            <input className={Styled.SearchForm_input}
                type='text'
                autoComplete='off'
                name="searchQuery"
                value={searchQuery}
                autoFocus
                placeholder='Search images and photos'
                onChange={handleSearchQueryChange}
                
            />
        </form>
    </header>
  );
};

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default Searchbar