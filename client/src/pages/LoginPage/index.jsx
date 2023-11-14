import React, { useEffect, useState } from "react"
import { UsernameForm } from "../../components"
import { Link } from "react-router-dom";


export default function LoginPage(){
    const [inputUn, setInputUn] = useState("Username");
    const [inputPw, setInputPw] = useState("Password");
    const [button_Text, setButtonText] = useState("Login")
  

    document.body.classList.add("login-page")

    return (
        <div className="flexbox-container login-container" >
            <div className="flexbox-item"></div>
           <div className="flexbox-item login-array" style={{width: "600px"}}>
                <h2 data-testid = "welcome">Welcome to the NerdWork</h2>
                <hr />
                <p data-testid = "login-request">Please log in below</p>
                <UsernameForm 
                    inputUn={inputUn}
                    setInputUn={setInputUn}
                    inputPw={inputPw}
                    setInputPw={setInputPw}
                    button_Text={button_Text}
                    setButtonText={setButtonText}
                />
                <p data-testid="no-account">Not have an account yet? <Link to="/signup" className = "inline">Create one here!</Link></p>
           </div>
           <div className="flexboxItem"></div>
        </div>
    )
}