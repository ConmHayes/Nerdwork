import "./App.css";
import * as Pages from "./pages";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components";
import React from "react";

function App() {  function LayoutWithHeader({ children }) {
    return (
      <div>
        <Header />
        {children}
      </div>
    );
  }
  return (
    <div>
      <Routes>
        <Route path="/Login" element={<Pages.LoginPage />} />
        <Route path="/" element={<Header/>}> 
          <Route path="/Home" element={<Pages.HomePage/>}/>
        </Route>
      </Routes>
    </div>
  );
}



export default App;
