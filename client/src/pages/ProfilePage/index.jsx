import { useState, useEffect } from "react"
import React from "react"


export default function ProfilePage(){
    //const [sidebarExtended, setSidebarExtended] = useState(true)

    return(
        <div className="flexbox-container profile-container">
            <div className="flexbox-item profile-sidebar-extended">
                <div className="flexbox-container" style = {{width: "100%"}}>
                    <div className="flexbox-container profile-header">
                        <div className="flexbox-item">
                            <span class="dot">  
                                <i className="material-icons ikon">person</i>
                            </span>
                        </div>
                        <div className="flexbox-item" style = {{position: "relative", left: "10px"}}>
                            <h3> Welcome example user!</h3>
                        </div>
                        <div className="flexbox-item bell">
                            <i className="material-icons ikon">notifications</i>
                        </div>
                        

                    </div>
                    
                </div>
            </div>
            <div className="flexbox-item carousel-item"></div>

        </div>
    )
}