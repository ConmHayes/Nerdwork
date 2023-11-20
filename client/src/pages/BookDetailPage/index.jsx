import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {Genre,Rating} from '../../components';
import { useLocation } from 'react-router-dom';

import "./bookDetails.css"

export default function BookDetailPage(){
  
  const mockUserOwners = [
    {
      id: 1,
      name: "Alice Johnson",
      profileImageUrl: "https://example.com/profiles/alice.jpg",
      // Additional user details can be added here
    },
    {
      id: 2,
      name: "Bob Smith",
      profileImageUrl: "https://example.com/profiles/bob.jpg",
      // Additional user details can be added here
    },
    {
      id: 3,
      name: "Carol Williams",
      profileImageUrl: "https://example.com/profiles/carol.jpg",
      // Additional user details can be added here
    },
    // Add more users as needed
  ];
   const location = useLocation();
   const books = location.state;
   console.log(books)
   const data  = books["0"]
   console.log(data)
   
   
  

    if (!data) {
      return <div>Loading...</div>;
    }
    const UserCard = ({ user }) => {
      return (
        <div className="user-card">
          <img src={user.profileImageUrl || 'default-profile-icon.jpg'} alt={`${user.email}'s profile`} className="profile-icon" />
          <Link to={`/profile`}>{user.email}</Link>
        </div>
      );
    };
  
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

  

