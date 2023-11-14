import React from 'react';

import "./bookCard.css"
export default function BookSearchCard ({ book }){
    const { title, author, releaseDate, description } = book;

    return (
        <div className="book-card">
            <h3>{title}</h3>
            <p>Author: {author}</p>
            <p>Release Date: {releaseDate}</p>
            <p>{description}</p>
        </div>
    );
};

