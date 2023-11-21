import { useState, useEffect } from "react"
import React from "react"
import "./style.css"
import { Link } from "react-router-dom"

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
    const top_links = [`${siteURL}profile/bookshelf`, "/", "/", "/"]

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
        <p>Suggested for you...</p>
        
            <div className="wrapper">
                <div id="permas" style={{flexDirection: "row"}}>
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
                </div>
            </div>
            


      </div>
    </div>
  );
};


