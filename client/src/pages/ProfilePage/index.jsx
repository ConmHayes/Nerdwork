import { useState, useEffect } from "react"
import React from "react"
import "./style.css"
import { Link } from "react-router-dom"
import gsap from "gsap"

const apiURL = "https://nerdwork-server.onrender.com"
const siteURL = "https://nerdwork.onrender.com/"
const localURL = "http://localhost:5173/"

export default function ProfilePage(){
    const [sidebarExtended, setSidebarExtended] = useState(true)
    const [username, setUsername] = useState("")


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
  
    
    const top_rows = ["My Bookshelf", "My Games", "My Comics", "My Friends"]
    const top_icons = ["book", "sports_esports", "import_contacts", "diversity_3"]
    const top_links = [`${localURL}profile/bookshelf`, "/", "/", "/"]

    const bottom_rows = ["Settings", "Contact Us"]
    const bottom_icons = ["settings", "call"]
    const bottom_links = ["/", "/"]

    

    useEffect(() => {
        getUsername()
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
                        <div className="flexbox-item" style = {{position: "relative", left: "10px", width: "400px"}}>
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
                <div className="flexbox-item placeholder">

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
        <p>Suggested for you...</p>
        

            <div className="wrapper" id="permas">
                <div className="imageContainer">
                    <div className="profile-item">Hello</div>
                    <div className="profile-item">There</div>
                    <div className="profile-item">World</div>
                    <div className="profile-item">How</div>
                    <div className="profile-item">Are</div>
                    <div className="profile-item">You </div>
                    <div className="profile-item">Doing</div>
                </div>
            </div>


      </div>
    </div>
  );
};



/*
<div class="row">
      <div class="col-md-2"></div>
      <div class="col-md-10">
        <div id="carouselExample" class="carousel slide">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="https://m.media-amazon.com/images/I/91ORJa-xI9L._SY466_.jpg" class="carPics"/>
              <img src="https://m.media-amazon.com/images/I/51XUd9lyjwL._SX342_SY445_.jpg" class="carPics"/>
              <img src="https://m.media-amazon.com/images/I/41esrpLG2BL._SY445_SX342_.jpg" class="carPics"/>
              <img src="https://m.media-amazon.com/images/I/51zZ3SAulVL._SY445_SX342_.jpg" class="carPics"/>
            </div>
            <div class="carousel-item">
              <img src="https://m.media-amazon.com/images/I/71ODBY2ChvL._SY466_.jpg" class="carPics"/>
              <img src="https://m.media-amazon.com/images/I/81c6aew79KL._SL1500_.jpg" class="carPics"/>
              <img src="https://m.media-amazon.com/images/I/91O1dxoUXoL._SL1500_.jpg" class="carPics"/>
              <img src="https://m.media-amazon.com/images/I/81WnXhMjGgL._SL1500_.jpg" class="carPics"/>
            </div>
            <div class="carousel-item">
              <img src="https://m.media-amazon.com/images/I/81mCE+uclxL._SL1500_.jpg" class="carPics"/>
              <img src="https://m.media-amazon.com/images/I/71D6PnMg4WL._SL1500_.jpg" class="carPics"/>
              <img src="https://m.media-amazon.com/images/I/81fygAyvKML._SL1500_.jpg" class="carPics"/>
              <img src="https://m.media-amazon.com/images/I/81HRGUehn1L._SY385_.jpg" class="carPics"/>
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
          >
          <span
            class="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="next"
          >
            <span
              class="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
    */