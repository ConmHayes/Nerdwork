import "./App.css";
import * as Pages from "./pages";
import { Routes, Route } from "react-router-dom";
import { Header, Bookshelf } from "./components";
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
        <Route path="/" element={<Pages.LoginPage />} />
        <Route path="/signup" element={<Pages.SignupPage />} />
        <Route element={<LayoutWithHeader />}>
          <Route path="/Home" element={<Pages.HomePage/>} /> 
          <Route path="/BookSearch" element={<Pages.BookSearchPage/>} /> 
          <Route path="/BookSearch/:title" element={<Pages.BookOwnersPage/>}/>
          <Route path="/ComicSearch" element={<Pages.ComicSearchPage/>} /> 
          <Route path="/GameSearch" element={<Pages.GameSearchPage/>} /> 
          <Route path="/Profile" element={<Pages.ProfilePage/>} /> 
          <Route path="/request" element={<Pages.RequestPage />} />
          <Route path="/books" element={<Bookshelf />} />
        </Route>
      </Routes>
    </div>
  );
}



export default App;
