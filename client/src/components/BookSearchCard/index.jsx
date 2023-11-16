import React from 'react';
import "./bookCard.css"
import { useNavigate } from 'react-router-dom';


export default function BookSearchCard ({ book }){
    const { title, author, book_image,releaseDate } = book;
    const navigate = useNavigate();

    function displayUser(id){
       navigate(`/request/${id}`)
    }

    return (
        <div className="book-card" onClick={() => displayUser(book.id)}>
            <img src={book_image} alt={title}/> 
            
            <h3 style={{borderTop: "20px"}}>{title}</h3>
            <p>Author: {author}</p>
            <p>Release Date: {releaseDate}</p>
        </div>
    );
};

