import React, { useEffect, useState } from "react"
import { BookCard } from "../../components"
import { Link } from "react-router-dom";
import Modal from "react-modal";

const apiURL = "https://nerdwork-server.onrender.com"
const siteURL = "https://nerdwork.onrender.com/"
const localURL = "http://localhost:5173/"


export default function MyBookshelfPage( { sidebarExtended, setSidebarExtended }){
    
    const [isModalOpen, setModalOpen] = useState(false)
    const [selectedBook, setSelectedBook] = useState(null)
    const [starRating, setStarRating] = useState("")

    function openModal(book){


        const stars = Array.from({ length: 5 }, (_, index) => (
            <span key={index} className={index < Math.floor(book.rating) ? 'text-warning' : 'text-secondary'}>
              ★
            </span>
          ))
        setStarRating(stars)
        setSelectedBook(book)
        setModalOpen(true)
    }
    function closeModal(){
        setSelectedBook(null)
        setModalOpen(false)
    }

    const top_icons = ["home", "sports_esports", "import_contacts", "diversity_3"]
    const bottom_icons = ["settings", "call"]



    const top_links = [`${localURL}profile`, "/", "/", "/"]
    const bottom_links = ["/", "/"]

    const initialBooks = [
        // give me random books
        {
          id: 1,
          title: 'The Hobbit',
          img: 'x500_bbb7d1ed-aba7-4eb8-a464-b1d64350a1c1_500x.jpg',
          author: 'J.R.R. Tolkien',
          genres: ['Fantasy'],
          owner: 'John Doe',
          rating: 4.5
        },
        {
          id: 2,
          title: 'The Lord of the Rings',
          img: '9780261103252.jpg',
          author: 'J.R.R. Tolkien',
          genres: ['Fantasy'],
          owner: 'John Doe',
          rating: 4.5
        },
        {
          id: 3,
          title: 'Harry Potter and the Chamber of Secrets',
          img: '9780747538486-uk.jpg',
          author: 'J.K. Rowling',
          genres: ['Fantasy'],
          owner: 'John Doe',
          rating: 4.5
        },
        {
          id: 4,
          title: 'Harry Potter and the Prisoner of Azkaban',
          img: '71OZrU2sQTL._AC_UF1000,1000_QL80_.jpg',
          author: 'J.K. Rowling',
          genres: ['Fantasy'],
          owner: 'John Doe',
          rating: 4.5
        },
        {
          id: 5,
          title: 'Harry Potter and the Goblet of Fire',
          img: '71L9Y4OJn9L._AC_UF894,1000_QL80_.jpg',
          author: 'J.K. Rowling',
          genres: ['Fantasy'],
          owner: 'John Doe',
          rating: 2
        },
        {
          id: 6,
          title: 'Harry Potter and the Order of the Phoenix',
          img: 'Harry_Potter_and_the_Order_of_the_Phoenix.jpg',
          author: 'J.K. Rowling',
          genres: ['Fantasy'],
          owner: 'John Doe',
          rating: 3
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
                        <div key={i} onClick = {() => openModal(book)}>
                            <BookCard book={ book } isSelected={selectedBook && selectedBook.id === book.id}/>
                        </div>
                    ))}
                    
                </div>
            
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    contentLabel="Book Details"
                    className="custom-modal"
                    overlayClassName="custom-overlay"
                >
                    {selectedBook && (
                    <>
                        <div className="modal-arrow"></div>
                        <h2>{selectedBook.title}</h2>
                        <p>Author: {selectedBook.author}</p>
                        <div>{starRating}</div>
                        {/* Add other book details as needed */}
                        <button className="close-button" onClick={closeModal}>
                        Close Modal
                        </button>
                    </>
                    )}
                </Modal>
            </div>
        </div>
    )
}

//<button className="login-button" onClick={openModal}> Open Modal </button>