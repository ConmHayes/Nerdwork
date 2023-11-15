import React from 'react';
import "./bookCard.css"
import { useNavigate } from 'react-router-dom';

export default function BookCard ({ book }){
    const { title, author, releaseDate, description } = book;
    const navigate = useNavigate();

    function displayUser(){
       navigate(`/BookSearch/${title}`)
    }

    return (
        <div className="book-card" onClick={displayUser}>
            <h3>{title}</h3>
            <p>Author: {author}</p>
            <p>Release Date: {releaseDate}</p>
            <p>{description}</p>
        </div>
    );
};

