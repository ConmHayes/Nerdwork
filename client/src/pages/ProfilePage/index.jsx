import { useState, useEffect } from "react"
import React from "react"
import "./style.css"
import { Link } from "react-router-dom"
import { GeneralForm, BookCard } from "../../components"
import Modal from "react-modal"
import { useNavigate } from "react-router-dom";



const apiURL = "https://nerdwork-server.onrender.com"
const siteURL = "https://nerdwork.onrender.com/"
const localURL = "http://localhost:5173/"

export default function ProfilePage(){
    const [sidebarExtended, setSidebarExtended] = useState(true)
    const [username, setUsername] = useState("");
    const [requests, setRequests] = useState([]);
    const [item, setItem] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [carouselItems, setCarouselItems] = useState([])
    const [userItems, setUserItems] = useState([])
    const [notifications, setNotifications] = useState(0)
    const [notificationsOpen, setNotificationsOpen] = useState(false)
    const [allUsers, setAllUsers] = useState([])
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

      const fetchRequest = async () => {
        try {
          const response = await fetch('https://nerdwork-server.onrender.com/trade/', {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const data = await response.json();
          const requestData = data.requests; // Access the Communities array in the response
          const filteredRequests = requestData.filter(request => request.user_email_request === localStorage.email && request.rejected_by_requestie===false);
          setNotifications(filteredRequests.length)
          console.log(filteredRequests)
          setRequests(requestData)
        } catch (error) {
          console.error('Error fetching requests:', error);
        }
      };

      const fetchItems = async () => {
        try {
          const response = await fetch('https://nerdwork-server.onrender.com/item/', {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const data = await response.json();
          const itemData = data.Items; // Access the Communities array in the response
          setItem(itemData)
        } catch (error) {
          console.error('Error fetching item:', error);
        }
      };

    useEffect(() => {
        fetchRequest();
        fetchItems()
    }, []);
  
    const top_rows = ["My Bookshelf", "My Games", "My Comics", "My Friends"]
    const top_icons = ["book", "sports_esports", "import_contacts", "diversity_3"]
    const top_var = ["book", "game", "comic book", ""]
    const top_links = [`${siteURL}profile/bookshelf`, `${siteURL}profile/bookshelf`, `${siteURL}profile/bookshelf`, "/"]

    const bottom_rows = ["Settings", "Contact Us"]
    const bottom_icons = ["settings", "call"]
    const bottom_links = ["/", "/"] 

    function displayRequests() { 
        return requests.filter(requests => requests.user_email_requestie === localStorage.getItem('email') && requests.rejected_by_requestie == false)
        .map(request => (
            <div className="flexbox-container flexbox-requests" key={request.request_id} >
                <div className="flexbox-container">
                    <h2>The email who requested: {request.user_email_request}</h2> 
                    <i className="material-icons close-ikon"
                        onClick={() => closeNotifications()} 
                        style={{position:"relative", left: "100px", color: "red"}}>
                            cancel
                    </i>
                </div>
                

                <p>The user has requested to trade for {item.filter(items => items.item_id == request.wanted_item_id).map(item => item.title)}</p>
                <div className="flexbox-container">
                    <button className="login-button" onClick={() => handleViewTrades(request)}>View Trades</button>
                    <div style={{width: "20px"}}></div>
                    <button className="login-button" onClick={() => handleReject(request)}>Reject</button>
                </div>
            </div>
          ));
      } 


    const handleReject = async (request) => {
        try {
            const response = await fetch('https://nerdwork-server.onrender.com/trade/', {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                user_email_request : request.user_email_request,
                user_email_requestie : request.user_email_requestie,
                wanted_item_id : request.wanted_item_id
                })
            });
            const res = await response.json();
            setNotifications(notifications--)
          } catch (error) {
            console.error('Error fetching requests:', error);
          }
        }

    function openModal(){
        setModalOpen(true)
    }
    function closeModal(){
        setModalOpen(false)
    }

    const handleViewTrades = async (request) => {
        navigate(`/request/${request.request_id}`)
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
        const filteredBooks = data.items.filter(item => item.email === localStorage.email);
        
        setUserItems(filteredBooks)
        

        setCarouselItems(randomArray)        

    }
    function setShelf(shelf){
        localStorage.shelf=shelf
    }

    function makeCarousel(items){
        return (
            items.map((item) => (
                <div className="profile-item" key={item.item_id} ><img src={item.img}></img></div>
            ))
        )
    }

    useEffect(() => {
        getUsername()
        getCarouselItems()
    }, [])

    function openNotifications(){
        setNotificationsOpen(true)
    }
    function closeNotifications(){
        setNotificationsOpen(false)
    }

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
                        <div className="flexbox-item" style = {{position: "relative", left: "10px", width: "400px"}}>
                            <h3> Welcome, {username}!</h3>
                        </div>
                        <div className="flexbox-item bell" >
                            <i className="material-icons bell-ikon" onClick={() => openNotifications()} >
                                notifications
                            </i>
                            <p className="notification">{notifications != 0 ? notifications : ""}</p>
                        </div>
                        <Modal
                                isOpen = {notificationsOpen}
                                onRequestClose = {closeNotifications}
                                contentLabel="Book Details"
                                className="modal-form-profile" 
                            >
                                <div className="flexbox-container">
                                    {displayRequests()}
                                </div>
                                
                            </Modal>
                    </div>
                </div>

                <div className="flexbox-container option-row ">
                    {top_rows.map((title, i) => (
                    <Link to={top_links[i]} className="link" key={i} onClick={() => setShelf(top_var[i])}>    
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
                                    >
                                        <GeneralForm style ={{textAlign: "center"}}
                                        setModalOpen={setModalOpen}
                                        modalOpen={modalOpen}/>
                                    </Modal>
                        </div>
                </div>

        
                <div className="wrapper">
                    <div id="permas" style={{flexDirection: "row"}}>
                        {makeCarousel(carouselItems)}
                    </div>
                </div>
                <div className="flexbox-item flexbox-carousel" style={{marginTop:"50px", width: "100%"}}>
                    <h3>Your Items</h3>
                    <div className="wrapper">
                        <div id="permas">
                            {makeCarousel(userItems)}
                        </div>
                    </div>
                </div>
            </div>
            
    </div>
  );
};

