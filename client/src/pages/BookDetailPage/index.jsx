import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {Genre,Rating} from '../../components';
import { useLocation } from 'react-router-dom';

import "./bookDetails.css"

export default function BookDetailPage(){
  
  const location = useLocation();
  const books = location.state || [];
  console.log(books)
  const data  = books["0"]
  console.log(data)
   
  function handleOwnerClick(bookId, ownerEmail) {
      const requesterEmail = localStorage.getItem('email')
      console.log(bookId, ownerEmail, requesterEmail)
  };
  
  

  if (!data) {
    return <div>Loading...</div>;
  }
  const UserCard = ({ user }) => {
    const [showRequestButton, setShowRequestButton] = useState(false);

    const toggleRequestButton = () => {
      setShowRequestButton(!showRequestButton);
    };
    return (
      <div className="user-card" onClick={toggleRequestButton}>
        <img src={user.profileImageUrl || 'default-profile-icon.jpg'} alt={`${user.email}'s profile`} className="profile-icon" />
        <div>{user.email}</div>
        {showRequestButton && (
          <button className="send-request-btn" onClick={() => handleOwnerClick(user.item_id, user.email)}>
            Send Request
          </button>
        )}
      </div>
      
    );
  };
  
  return (
    <div className="book-detail-page">
      <div className="container">
        <h1 className="page-title">{data.title}</h1>
        <h3 className='page-author'> {data.author}</h3>
        <div className="image-container">
          <img src={data.img} alt={data.title} className="book-image"/>
        </div>
        <div className="text-content">
          <div className='description'>
            <h3> Discription : </h3>
            <p>{data.description}</p>
          </div>
          <div className="genres">
            <Genre genres={data.genre} />
          </div>
          <div className="rating">
            <Rating value={data.rating} />
          </div>
        </div>
      </div>
      <div className="owners-section">
      <h2>Owners of this Book</h2>
      <div className="owners-list">
        {books?.map((user, index) => (
          <UserCard key={index} user={user} />
        ))}
      </div>
    </div>
    </div>
  );
}

  

