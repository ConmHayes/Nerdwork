import React from 'react';
import "./bookCard.css"
import { useNavigate } from 'react-router-dom';
import Genre from '../Genre'
import Rating from '../Rating';

export default function BookSearchCard ({ book }){
    const { title, author, img, rating, genre } = book;
    const navigate = useNavigate();
    console.log("img", img)
    function displayUser(id){
       navigate(`/BookDetail/${id}`)
    }

    return (
        <div className="book-card" onClick={() => displayUser(book.item_id)}>
            <img src={img} alt={title}/> 
            
            <h3 style={{borderTop: "20px"}}>{title}</h3>
            <p>Author: {author}</p>
            <div className="genres">
              {genre.map((genre, index) => (
                <span key={index} className="genre">{genre}</span>
              ))}
            </div>
            <div className="rating">
              <Rating value={rating} />
            </div>
            
        </div>
    );
};

