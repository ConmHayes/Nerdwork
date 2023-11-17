import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {Genre,Rating} from '../../components';
import "./bookDetails.css"

export default function BookDetailPage(){
    const {id} = useParams()
    const MOCK_DATA = [
      {
        id: 1,
        author: 'Jane Doe',
        imageUrl: 'https://via.placeholder.com/150',
        title: 'Sample Book Title',
        description: 'This is a sample description of the book...',
        rating: 4,
        genres: ['Fiction', 'Adventure']
      },
  ]
    console.log(id)
    const [data, setData] = useState(null);
    console.log(data)
    useEffect(() => {
      // Ensure id is compared correctly
      const bookData = MOCK_DATA.find(book => book.id === parseInt(id));
      setData(bookData);
    }, [id]);
    console.log(data)
    if (!data) {
      return <div>Loading...</div>;
    }

  
    return (
      <div className="book-detail-page">
      <div className="container">
        <h1 className="page-title">Book Details</h1>
        <div className="image-container">
          <img src={data.imageUrl} alt={data.title} className="book-image"/>
        </div>
        <div className="text-content">
          <h2 className="title">{data.title}</h2>
          <h3 className="author">{data.author}</h3>
          <p className="description">{data.description}</p>
          <div className="genres">
            {data.genres.map((genre, index) => (
              <span key={index} className="genre">{genre}</span>
            ))}
          </div>
          <div className="rating">
            <Rating value={data.rating} />
          </div>
          </div>
        </div>
      </div>
    );
  }

  

