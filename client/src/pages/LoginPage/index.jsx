import React, { useEffect, useState } from "react"
import { UsernameForm } from "../../components"

export default function LoginPage(){
    const [inputUn, setInputUn] = useState("Username");
    const [inputPw, setInputPw] = useState("Password");
    const [button_Text, setButtonText] = useState("Login")
  

    document.body.classList.add("login-page")

    return (
        <div className="flexbox-container login-container" >
            <div className="flexbox-item"></div>
           <div className="flexbox-item login-array">
                <h2>Welcome to the NerdWork</h2><br />
                <vh />
                <p>Please log in below</p>
                <UsernameForm 
                    inputUn={inputUn}
                    setInputUn={setInputUn}
                    inputPw={inputPw}
                    setInputPw={setInputPw}
                    button_Text={button_Text}
                    setButtonText={setButtonText}
                />
           </div>
        </div>
    )
}