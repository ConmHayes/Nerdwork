import { useState, useEffect } from "react"
import React from "react"


export default function ProfilePage(){
    //const [sidebarExtended, setSidebarExtended] = useState(true)
    
    const top_rows = ["My Bookshelf", "My Games", "My Comics", "My Friends"]
    const top_icons = ["book", "sports_esports", "import_contacts", "diversity_3"]
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
                        <div className="flexbox-item" style = {{position: "relative", left: "10px"}}>
                            <h3> Welcome example user!</h3>
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
            </div>
            
            <div className="flexbox-item carousel-item"></div>

        </div>
    )
}