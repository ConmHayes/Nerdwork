import "./App.css";
import * as Pages from "./pages";
import { Routes, Route } from "react-router-dom";
import { NavigationBar, Bookshelf } from "./components";
import React from "react";


function App() {  function LayoutWithHeader({ children }) {
    return (
      <div>
        <NavigationBar />
        {children}
      </div>
    );
  }
  return (
    <div>
      <Routes>
        <Route path="/" element={<Pages.LoginPage />} />
        <Route path="/signup" element={<Pages.SignupPage />} />
        <Route element={<LayoutWithHeader />} >
          <Route path="/request" element={<Pages.RequestPage />} />
          <Route path="/books" element={<Bookshelf />} />
          <Route path="/profile" element={<Pages.ProfilePage />}/> 

        </Route>
      </Routes>
    </div>
  );
}



export default App;
