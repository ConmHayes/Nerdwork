import React, { useEffect, useState } from "react"
import { BookCard } from "../../components"
import { Link } from "react-router-dom";

const apiURL = "https://nerdwork-server.onrender.com"
const siteURL = "https://nerdwork.onrender.com/"
const localURL = "http://localhost:5173/"


export default function MyBookshelfPage( { sidebarExtended, setSidebarExtended }){
    
    const top_icons = ["home", "sports_esports", "import_contacts", "diversity_3"]
    const bottom_icons = ["settings", "call"]


    const top_links = [`${siteURL}profile`, "/", "/", "/"]
    const bottom_links = ["/", "/"]

    const initialBooks = [
        // give me random books
        {
          id: 1,
          title: 'The Hobbit',
          img: '',
          author: 'J.R.R. Tolkien',
          genres: ['Fantasy'],
          owner: 'John Doe',
          rating: 4.5
        },
        {
          id: 2,
          title: 'The Lord of the Rings',
          img: '',
          author: 'J.R.R. Tolkien',
          genres: ['Fantasy'],
          owner: 'John Doe',
          rating: 4.5
        },
        {
          id: 3,
          title: 'Harry Potter and the Chamber of Secrets',
          img: '',
          author: 'J.K. Rowling',
          genres: ['Fantasy'],
          owner: 'John Doe',
          rating: 4.5
        },
        {
          id: 4,
          title: 'Harry Potter and the Prisoner of Azkaban',
          img: '',
          author: 'J.K. Rowling',
          genres: ['Fantasy'],
          owner: 'John Doe',
          rating: 4.5
        },
        {
          id: 5,
          title: 'Harry Potter and the Goblet of Fire',
          img: '',
          author: 'J.K. Rowling',
          genres: ['Fantasy'],
          owner: 'John Doe',
          rating: 4.5
        },
        {
          id: 6,
          title: 'Harry Potter and the Order of the Phoenix',
          img: '',
          author: 'J.K. Rowling',
          genres: ['Fantasy'],
          owner: 'John Doe',
          rating: 4.5
        },
      ];

      

    return (
        
        <div className="flexbox-container profile-container">

            <div className="flexbox-item profile-sidebar">
                <div className="flexbox-container profile-bar" style = {{width: "100%"}}>
                    <div className="flexbox-container profile-header" style={{justifyContent: "center"}}>
                        <div className="flexbox-item">
                            <span className="dot">  
                                <i className="material-icons ikon">person</i>
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flexbox-container option-box ">
                    {top_icons.map((icon, i) => (
                    <Link to={top_links[i]} className="link" key={i}>    
                        <div className={`flexbox-item profile-box ${i % 2 === 0 ? 'even' : 'odd'}`}>
                                <i className="material-icons ">{icon}</i>
                        </div>
                    </Link>
                    ))}
                </div>
                <div className="flexbox-item placeholder" style={{border: "transparent"}}>

                </div>
                <div className="flexbox-item option-row">
                    {bottom_icons.map((icon, i) => (
                        <Link to={bottom_links[i]} className="link" key={i}>
                            <div className={`flexbox-item profile-box ${i % 2 === 0 ? 'even' : 'odd'}`}>
                                    <i className="material-icons">{icon}</i> 
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <div className="flexbox-container profile-bookshelf">
                <p>Your Books</p>
                <div className="flexbox-item carousel-container" style={{justifyContent:"flex-start"}}>
                    {
                    initialBooks.map((book, i) => (
                        <div key={i}><BookCard book={ book } /></div>
                    ))}
                    
                </div>
            </div>
        </div>
    )
}