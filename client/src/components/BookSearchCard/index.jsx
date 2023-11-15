import React from 'react';
import "./bookCard.css"
import { useNavigate } from 'react-router-dom';

export default function BookSearchCard ({ book }){
    const { title, author, book_image,releaseDate } = book;
    const navigate = useNavigate();

    function displayUser(){
       navigate(`/request`)
    }

    return (
        <div className="book-card" onClick={displayUser}>
            <img src={book_image} alt={title}/> 
            <h3>{title}</h3>
            <p>Author: {author}</p>
            <p>Release Date: {releaseDate}</p>
        </div>
    );
};

