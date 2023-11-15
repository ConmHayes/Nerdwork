import React, { useState } from 'react';
import './SearchForm.css';

export default function SearchForm({ searchString, setSearchString }) {

    
    function updateTextFilter (e) {
        setSearchString(e.target.value);
    }

    return (
     
        <form className='search-form'>
             <label>Search:<input type="text" value={searchString} onChange={updateTextFilter} /></label>
        </form>

    )   
};