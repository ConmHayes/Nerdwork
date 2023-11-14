import React, {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom'


/*
const apiURL = "https://time-table-server.onrender.com"
const siteURL = "https://time-table-app.onrender.com/"
const localURL = "http://localhost:5173/"
const localapi = "http://localhost:3003"
*/

export default function UsernameForm({
  inputUn,
  setInputUn,
  inputPw,
  setInputPw,
  button_Text,
  setButtonText
}) {
  const navigate = useNavigate()
  const [loginStatus, setLoginStatus] = useState('')
  const [showPassword, setShowPassword] = useState(false);

  function handleInputUN(e) {
    setInputUn(e.target.value);
  }
  function handleInputPW(e) {
    setInputPw(e.target.value);
  }
  
  async function handleSubmit(e) {
    e.preventDefault();
    let response; let data;
    
    if (button_Text === "Create Account"){
      const options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: inputUn,
          password: inputPw
        }),
      }
      response = await fetch(`${apiURL}/register`, options)
      data = await response.json()
    }
    else if (button_Text === "Login"){
      const options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: inputUn,
          password: inputPw
        }),
      }
      response = await fetch(`${apiURL}/login`, options)
      data = await response.json()
    }

    if (response.status == 200 || response.status == 201){
      localStorage.setItem("token", data.token)
      navigate('/home')
    }else{
      setLoginStatus('Username and/or password is invalid')
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  

  function revealPassword() {
    const x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  function pageRender(){
    if (button_Text == "Login"){
      return 
    }else if (button_Text == "Create Account"){}
  }

  return (
      <form id="login" onSubmit={handleSubmit}>
        <label htmlFor="username" className="input-label">
          <i className="material-icons ikon left" style = {{color: "#3C7F72"}}>person</i>
          <input
            className="Input"
            type="text"
            id="username"
            name="username"
            placeholder={inputUn}
            onChange={handleInputUN}
          />
        </label>
        <br />
        <label htmlFor="password" className="input-label">
  <i className="material-icons ikon left" style={{ color: "#3C7F72" }}>
    lock
  </i>
  <input
    className="Input"
    type={showPassword ? "text" : "password"}
    id="password"
    name="password"
    placeholder={inputPw}
    onChange={handleInputPW}
  />
  <i
    className={`material-icons ikon right toggle-password ${showPassword ? "visible" : ""}`}
    onClick={togglePasswordVisibility}
  >
    {showPassword ? "visibility" : "visibility_off"}
  </i>
</label>
<br />
        <button className="login-button" type="submit">
        {button_Text}
        </button>
        <p>{loginStatus}</p>
      </form>
  );
}