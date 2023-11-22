import React from "react"
import "./communityCard.css"

export default function CommunityCard( {community, handleCommunityClick }){
    
    return(
        <div className="Community-Card">
            <div className="community-name">
                <h2>{community.community_name}</h2>
                < button className="Join" onClick={() => handleCommunityClick(community.community_id)}>Join</button>
            </div>
            <div className="community-description">
                <p>{community.description}</p>
            </div>
        </div>
    )
}