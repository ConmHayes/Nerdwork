import React, { useEffect, useState } from "react"
import { BookCard } from "../../components"
import { Link } from "react-router-dom";
import Modal from "react-modal";
import Harry_Potter_and_the_Order_of_the_Phoenix from "../../../public/Harry_Potter_and_the_Order_of_the_Phoenix.jpg"
import HPGOF from "../../../public/71L9Y4OJn9L._AC_UF894,1000_QL80_.jpg"
import HPCOS from "../../../public/9780747538486-uk.jpg"
import HPPOA from "../../../public/71OZrU2sQTL._AC_UF1000,1000_QL80_.jpg"
import LOTR from "../../../public/9780261103252.jpg"
import TH from "../../../public/x500_bbb7d1ed-aba7-4eb8-a464-b1d64350a1c1_500x.jpg"
import "animate.css"
import { Container, Row, Col, Button, Form, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { NavigationBar, FormInput, FormMultiSelect, FormRating, FormSelect, Bookshelf } from '../../components';``




const apiURL = "https://nerdwork-server.onrender.com"
const siteURL = "https://nerdwork.onrender.com/"
const localURL = "http://localhost:5173/"


export default function MyBookshelfPage( { sidebarExtended, setSidebarExtended, onAddBook }){
    
    const [isModalOpen, setModalOpen] = useState(false)
    const [selectedBook, setSelectedBook] = useState(null)
    const [starRating, setStarRating] = useState("")
    const [modalArrowX, setModalArrowX] = useState(0);
    const [formOpen, setFormOpen] = useState(false)
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [error, setError] = useState('');
    const [initialBooks, setInitialBooks] = useState([])
    const [formData, setFormData] = useState({
        title: "",
        img: "",
        author: "",
        genre: [],
        issue_num: "",
        email: "",
        rating: 0,
        category: "book",
        description: null,
        tradeable: true
      });

      const [username, setUsername] = useState("")


      const top_icons = ["home", "sports_esports", "import_contacts", "diversity_3"]
      const bottom_icons = ["settings", "call"]
  
      const top_links = [`${siteURL}profile`, "/", "/", "/"]
      const bottom_links = ["/", "/"]
  
      async function getUsername(){
          const options = {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization : localStorage.token,
            },
          }
          console.log(options)
          const response = await fetch(`${apiURL}/user/${localStorage.email}`, options)
          const data = await response.json()
          console.log(response)
          setUsername(data.username)
        }
        
        useEffect(() => {
            getUsername()
        }, [])
    

    function openModal(book){


        const stars = Array.from({ length: 5 }, (_, index) => (
            <span key={index} className={index < Math.floor(book.rating) ? 'text-warning' : 'text-secondary'}>
              ★
            </span>
          ))
          
        console.log(book.item_id)
        const bookCardElement = document.getElementById(`Book_${book.item_id}`);
        const bookCardRect = bookCardElement.getBoundingClientRect();
        const modalArrowX = bookCardRect.left - bookCardRect.width/2;       
        setStarRating(stars)
        setModalArrowX(modalArrowX)
        console.log(modalArrowX)
        setSelectedBook(book)
        
        setModalOpen(true)
    }
    function closeModal(){
        setSelectedBook(null)
        setModalOpen(false)
    }

    function openAdd(){
        setModalOpen(false)
        setFormOpen(true)   
    }
    function closeAdd(){
        setFormData({
            title: '',
            img: '',
            author: '',
            genres: [],
            email: '',
            rating: 0,
            category: 'book',
            issue_num: null,
            description: null,
            tradeable: true
          })
        setFormOpen(false)
    }
    

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value
        }));
      };
    
      const handleGenreChange = (selectedOption) => {
        let newSelected;
        if (selectedGenres.includes(selectedOption)) {
          newSelected = selectedGenres.filter(option => option !== selectedOption);
        } else {
          newSelected = [...selectedGenres, selectedOption];
        }
        setSelectedGenres(newSelected);
        setFormData(prev => ({ ...prev, genre: newSelected }));
      };
    
      useEffect(() => {
        const userEmail = localStorage.getItem('email');
        if (userEmail) {
          setFormData(prevFormData => ({ ...prevFormData, email: userEmail }));
        }
      }, []);
    
      const updateImage = async (title, email) => {
        try {
          const response = await fetch(`https://nerdwork-server.onrender.com/google/`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, email }),
          });
    
          if (!response.ok) {
            const errorBody = await response.json();
            throw new Error(`HTTP error! status: ${response.status}, Message: ${errorBody.message}`);
          }
    
          // Handle the response here
          const result = await response.json();
          console.log('Image updated:', result);
          setFormOpen(false)
          getBooksAndFilter()
        } catch (error) {
          console.error('Error updating image:', error);
          setError(`There was a problem updating the image: ${error.message}`);
        }
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
    
        const dataToSend = {
          ...formData,
          genre: selectedGenres, 
          issue_num: parseInt(formData.issue_num, 10),
          email: formData.email,
          rating: parseFloat(formData.rating) 
        };
    
        try {
          const response = await fetch('https://nerdwork-server.onrender.com/item/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: localStorage.token
            },
            body: JSON.stringify(dataToSend),
          });
    
          if (!response.ok) {
            const errorBody = await response.json(); 
            throw new Error(`HTTP error! status: ${response.status}, Message: ${errorBody.message}`);
          }
    
          const result = await response.json();
          console.log(result);
    
          // Call the updateImage function after successful POST
          await updateImage(formData.title, formData.email);
          setFormData({
            title: "",
            img: "",
            author: "",
            genre: [],
            issue_num: "",
            email: "",
            rating: 0,
            category: "book",
            description: null,
            tradeable: true
        });
        setSelectedGenres([])
        setModalOpen(false)
          // navigate("/profile");
        } catch (error) {
          setError(`There was a problem adding your item: ${error.message}`);
          console.error('Error:', error);
        }
      };
    
    
    function generateBadges(genres){
        const genreBadges = genres && Array.isArray(genres) ? genres.map((genre, index) => (
            <Badge key={index} pill bg="secondary" className="mr-1" color='tertiary'>
              {genre}
            </Badge>
          )) : null;
        return (genreBadges

        )
    }


    async function getBooksAndFilter(){
        const options = {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: localStorage.token
            }
        }
        const response = await fetch(`${apiURL}/item/book`, options)
        const data = await response.json()
        console.log(data.items)
    
        // Filter books based on the condition
        const filteredBooks = data.items.filter(book => book.email === localStorage.email);
        console.log(filteredBooks)

        setInitialBooks(filteredBooks)

    }
    useEffect(() => {
        getBooksAndFilter()
    }, [])


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
                <div className="flexbox-item placeholder-box" style={{border: "transparent"}}>

                </div>
                <div className="flexbox-item option-row">
                    {bottom_icons.map((icon, i) => (
                        <Link to={bottom_links[i]} className="link" key={i} >
                            <div className={`flexbox-item profile-box ${i % 2 === 0 ? 'even' : 'odd'}`} >
                                    <i className="material-icons">{icon}</i> 
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <div className="flexbox-container profile-bookshelf">
                <div className="flexbox-container" style={{width:"100%"}}>
                    <div className="flexbox-item"style={{width:"50%", justifyContent: "flex-start"}}><p>Your Books</p></div>
                    <div className="flexbox-item add-book" style={{width:"50%", justifyContent: "flex-end"}}>
                            <p>Add another book</p>
                                <i className="material-icons"
                                    onClick={openAdd} 
                                    style={{marginRight: "50px", marginLeft: "20px", marginBottom:"20px"}}>
                                        add_circle
                                </i>
                        </div>
                </div>
                <Modal
                    isOpen={formOpen}
                    onRequestClose={closeAdd}
                    contentLabel="Book Details"
                    className="modal-form"
                    
                >
                    <h2 style={{textAlign: "center"}}>Add a new book to your collection!</h2>
                        <Form onSubmit={handleSubmit} style={{width: "100%", textAlign: "center"}}>
                            <Row className="justify-content-md-center w-100">
                                <Col md={6}>
                                    <FormInput label="Title" type="text" placeholder="Enter title" name="title" value={formData.title} onChange={handleChange} />
                                    <FormInput label="Author" type="text" placeholder="Enter author's name" name="author" value={formData.author} onChange={handleChange} />
                                    <FormMultiSelect label="Genres" name="genres" selected={selectedGenres} options={['Cyberpunk', 'Superhero', 'Romance', 'Adventure', 'Thriller', 'Survival', 'Sport', 'Mecha', 'Musical', "Comedy", "Science Fiction", "Fantasy", "Historical", 'Other']} onChange={handleGenreChange} />
                                    <h3>Owner:</h3><p>{username}</p>
                                    <FormRating label="Rating" name="rating" value={formData.rating} onChange={handleChange} min={0} max={5} step={0.1} />
                                    <Button variant="primary" type="submit" className="login-button">Submit</Button>
                                </Col>
                            </Row>    
                        </Form>

                </Modal>
                
                <div className="flexbox-item bookshelf-container" style={{justifyContent:"flex-start"}}>
                    {
                    initialBooks.map((book, i) => (
                        <div className="test" key={i} onClick = {() => openModal(book)} id={`Book_${book.item_id}`}>
                            <img src={book.img} className={selectedBook?.item_id=== book.item_id ? "selected-book" : ""}
                            />
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
                        <div className="flexbox-container">
                            <div className="flexbox-item" style={{width: "30%", justifyContent: "flex-start"}}>
                            <h3>{selectedBook.title}</h3>
                            </div>
                            <div className="flexbox-item" style={{width: "60%"}}>
                                {generateBadges(selectedBook.genre)}
                            </div>
                            <div className="flexbox-item" style={{width: "10%", justifyContent: "flex-end"}}>
                            <i className="material-icons close-ikon"
                                    onClick={closeModal} 
                                    style={{marginRight: "50px", marginLeft: "20px", marginBottom:"20px", color: "red"}}>
                                        cancel
                                </i>

                            </div>

                        </div>
                        <p>Author: {selectedBook.author}</p>
                        <div>{starRating}</div>
                        <p>{selectedBook.description}</p>
                        
                    </>
                    )}
                </Modal>
                {isModalOpen && selectedBook && (
                    <div className="modal-arrow" style={{ left: modalArrowX, marginTop: "-50px" }}></div>
                )}
            </div>
        </div>
    )
}

