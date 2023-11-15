import React from "react"
import { useParams } from "react-router"

export default function BookOwnersPage(){
    const title =  useParams().title
    console.log(title)
    return (
        <div>
            <h1> title :  {title}</h1>

        </div>
        
      )
}