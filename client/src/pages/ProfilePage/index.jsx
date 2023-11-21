import { useState, useEffect } from "react"
import React from "react"
import "./style.css"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";

const apiURL = "https://nerdwork-server.onrender.com"
const siteURL = "https://nerdwork.onrender.com/"
const localURL = "http://localhost:5173/"

export default function ProfilePage(){
    const [sidebarExtended, setSidebarExtended] = useState(true)
    const [username, setUsername] = useState("");
    const [requests, setRequests] = useState([]);
    const [item, setItem] = useState([])
    const navigate = useNavigate();
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
    }, []);

    useEffect(() => {
        getUsername()
    }, [])

    useEffect(() => {
        fetchItems()
    }, [])

    // useEffect(() =>{
    //     displayRequests()
    // }, [requests])
  
    const top_rows = ["My Bookshelf", "My Games", "My Comics", "My Friends"]
    const top_icons = ["book", "sports_esports", "import_contacts", "diversity_3"]
    const top_links = [`${siteURL}profile/bookshelf`, "/", "/", "/"]

    const bottom_rows = ["Settings", "Contact Us"]
    const bottom_icons = ["settings", "call"]
    const bottom_links = ["/", "/"] 

    function displayRequests() {
        return requests.filter(requests => requests.user_email_requestie === localStorage.getItem('email') && requests.rejected_by_requestie == false)
        .map(request => (
            <div key={request.request_id} >
                <h2>The email who requested: {request.user_email_request}</h2>
                <p>The item_id that was requested: {item.filter(items => items.item_id == request.wanted_item_id).map(item => item.title)}</p>
                <button onClick={() => handleViewTrades(request)}>View Trades</button>
                <button onClick={() => handleReject(request)}>reject</button>
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
          } catch (error) {
            console.error('Error fetching requests:', error);
          }
    }

    const handleViewTrades = async (request) => {
        navigate(`/request/${request.request_id}`)
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
                <div>

                </div>
                <div>
                {displayRequests()}
                </div>
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


