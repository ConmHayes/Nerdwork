import { useState, useEffect } from "react"
import React from "react"
import "./style.css"
import { Link } from "react-router-dom"
import { GeneralForm, BookCard } from "../../components"
import Modal from "react-modal"
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";



const apiURL = "https://nerdwork-server.onrender.com"
const siteURL = "https://nerdwork.onrender.com/"
const localURL = "http://localhost:5173/"

export default function ProfilePage( { onAddBook }){
    const [sidebarExtended, setSidebarExtended] = useState(true)
    const [username, setUsername] = useState("")
    const [modalOpen, setModalOpen] = useState(false)
    const [carouselItems, setCarouselItems] = useState([])
    const navigate = useNavigate()


    async function getUsername(){
        const options = {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization : localStorage.token,
          },
        }
        const response = await fetch(`${apiURL}/user/${localStorage.email}`, options)
        const data = await response.json()
        setUsername(data.username)
      } 
  
    
    const top_rows = ["My Bookshelf", "My Games", "My Comics", "My Friends"]
    const top_icons = ["book", "sports_esports", "import_contacts", "diversity_3"]
    const top_links = [`${siteURL}profile/bookshelf`, "/", "/", "/"]

    const bottom_rows = ["Settings", "Contact Us"]
    const bottom_icons = ["settings", "call"]
    const bottom_links = ["/", "/"]


    function openModal(){
        setModalOpen(true)
    }

    function closeModal(){
        setModalOpen(false)
    }

    async function getCarouselItems(){
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
        
        const len = data.items.length
        const randomArray = [];
        const tracking = []

        while (randomArray.length < 21) {
          const randomIndex = Math.floor(Math.random() * len);
        
          // Check if the random index is not already in the array
          if (!tracking.includes(randomIndex)) {
            tracking.push(randomIndex)
            randomArray.push(data.items[randomIndex]);
          }
        }
        setCarouselItems(randomArray)        

    }

    function makeCarousel(){
        console.log(carouselItems)
        return (
            carouselItems.map((item) => (
                <div className="profile-item" key={item.item_id} ><img src={item.img}></img></div>
            ))
        )
    }

    useEffect(() => {
        getUsername()
        getCarouselItems()
    }, [])

    return(
        <div className="flexbox-container profile-container">

            <div className="flexbox-item profile-sidebar-extended">
                <div className="flexbox-container profile-bar" style = {{width: "100%"}}>
                    <div className="flexbox-container profile-header">
                        <div className="flexbox-item">
                            <span className="dot">  
                                <i className="material-icons ikon">person</i>
                            </span>
                        </div>
                        <div className="flexbox-item" style = {{position: "relative", left: "10px", width: "350px"}}>
                            <h3> Welcome, {username}!</h3>
                        </div>
                        <div className="flexbox-item bell">
                            <i className="material-icons bell-ikon">notifications</i>
                        </div>
                    </div>
                </div>

                <div className="flexbox-container option-row ">
                    {top_rows.map((title, i) => (
                    <Link to={top_links[i]} className="link" key={i}>    
                        <div className={`flexbox-item profile-option ${i % 2 === 0 ? 'even' : 'odd'}`}>
                                <i className="material-icons left">{top_icons[i]}</i>
                                {title}
                        </div>
                        </Link>
                    ))}
                </div>
                <div className="flexbox-item placeholder-box">

                </div>
                <div className="flexbox-item option-row">
                    {bottom_rows.map((title, i) => (
                        <Link to={bottom_links[i]} className="link" key={i}>
                            <div className={`flexbox-item profile-option ${i % 2 === 0 ? 'even' : 'odd'}`}>
                                    <i className="material-icons left">{bottom_icons[i]}</i>
                                    {title}
                            </div>
                        </Link>    
                    ))}
                </div>

            </div>
            <div className="flexbox-container flexbox-carousel">
            <div className="flexbox-container" style={{width:"100%"}}>
                    <div className="flexbox-item"style={{width:"50%", justifyContent: "flex-start"}}><p>Suggested for you...</p></div>
                    <div className="flexbox-item add-book" style={{width:"50%", justifyContent: "flex-end"}}>
                            <p>Add an item to your account</p>
                                <i className="material-icons"
                                    onClick={openModal} 
                                    style={{marginRight: "50px", marginLeft: "20px", marginBottom:"20px"}}>
                                        add_circle
                                </i>
                                <Modal
                                    isOpen={modalOpen}
                                    onRequestClose={closeModal}
                                    contentLabel="Book Details"
                                    className="modal-form-profile" 
                                    modalOpen={modalOpen}
                                    setModalOpen={setModalOpen}
                                >
                                    <GeneralForm style ={{textAlign: "center"}}
                                    setModalOpen={setModalOpen}
                                    modalOpen={modalOpen}/>
                                </Modal>
                    </div>
                    
            </div>
                
        
            <div className="wrapper">
                <div id="permas" style={{flexDirection: "row"}}>
                    {makeCarousel()}
                </div>
            </div>
            


      </div>
    </div>
  );
};

//TODO: Get 21 things from the database
//21 entries
//#endregion

/*
<div className="profile-item">Hello</div>
                    <div className="profile-item">There</div>
                    <div className="profile-item">World</div>
                    <div className="profile-item">How</div>
                    <div className="profile-item">Are</div>
                    <div className="profile-item">You </div>
                    <div className="profile-item">Doing</div>
                    <div className="profile-item">Hello</div>
                    <div className="profile-item">There</div>
                    <div className="profile-item">World</div>
                    <div className="profile-item">How</div>
                    <div className="profile-item">Are</div>
                    <div className="profile-item">You </div>
                    <div className="profile-item">Doing</div>
                    <div className="profile-item">Hello</div>
                    <div className="profile-item">There</div>
                    <div className="profile-item">World</div>
                    <div className="profile-item">How</div>
                    <div className="profile-item">Are</div>
                    <div className="profile-item">You </div>
                    <div className="profile-item">Doing</div>


                    onclick={navigate(`/BookDetail/${item.item_id}`, { state: booksWithTitle  })}
*/
