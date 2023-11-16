import { useState, useEffect } from "react"
import React from "react"
import "./style.css"

const apiURL = "https://nerdwork-server.onrender.com"
const siteURL = "https://nerdwork.onrender.com/"

export default function ProfilePage(){
    //const [sidebarExtended, setSidebarExtended] = useState(true)
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
        const response = await fetch(`${apiURL}/user/${localStorage.email}`, options)
        const data = await response.json()
        setUsername(data.username)
      }
      
  
    
    const top_rows = ["My Bookshelf", "My Games", "My Comics", "My Friends"]
    const top_icons = ["book", "sports_esports", "import_contacts", "diversity_3"]
    const bottom_rows = ["Settings", "Contact Us"]
    const bottom_icons = ["settings", "call"]

    useEffect(() => {
        const carousel = document.querySelector("#carouselExampleSlidesOnly")

        const animationDuration = 5
        const totalDuration = animationDuration * 1000 * 3

        carousel.style.animation = `scrollAnimation ${totalDuration}ms linear infinite`

        return () => (carousel.style.animation = "none")
    }, [])

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
                        <div className={`flexbox-item profile-option ${i % 2 === 0 ? 'even' : 'odd'}`} key={i}>
                            <i className="material-icons left">{top_icons[i]}</i>
                            {title}
                        </div>
                    ))}
                </div>
                <div className="flexbox-item placeholder">

                </div>
                <div className="flexbox-item option-row">
                    {bottom_rows.map((title, i) => (
                        <div className={`flexbox-item profile-option ${i % 2 === 0 ? 'even' : 'odd'}`} key={i}>
                            <i className="material-icons left">{bottom_icons[i]}</i>
                            {title}
                        </div>
                    ))}
                </div>
            </div>
            <div className="flexbox-container flexbox-carousel">
                <p>Suggested for you...</p>
                <div className="flexbox-item carousel-container">
                    
                    <div id="carouselExampleSlidesOnly" className="carousel">
                        <div className="carousel-inner ">
                            <div className="carousel-item active" >
                                <p>Hello</p>
                            </div>
                            <div className="carousel-item">
                                <p>There</p>
                            </div>
                            <div className="carousel-item">
                                <p>World</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}