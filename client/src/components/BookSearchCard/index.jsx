import React from 'react';
import "./bookCard.css"
import { useNavigate } from 'react-router-dom';
import Genre from '../Genre'
import Rating from '../Rating';

export default function BookSearchCard ({ item }){
    const { title, author, img, rating, genre } = item;
    const navigate = useNavigate();
    function displayUser(id){
       navigate(`/BookDetail/${id}`)
    }
    console.log("item" , item)
    return (
        <div className="book-card" onClick={() => displayUser(item.item_id)}>
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

