import { useState } from "react";
import "./App.css";
import * as Pages from "./pages";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Header } from "./components";
import React from "react";


function App() {  
  const [books, setBooks] = useState([]);
  function LayoutWithHeader({ children }) {
    return (
      <div>
        <Header />
        {children}
      </div>
    );
  }

  const handleAddBook = (newBook) => {
    setBooks((prevBooks) => [...prevBooks, newBook]);
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<Pages.LoginPage />} />
        <Route path="/signup" element={<Pages.SignupPage />} />
        <Route element={<LayoutWithHeader />} >
          <Route path="/request" element={<Pages.RequestPage />} />
          <Route path="/forms" element={<Pages.FormsPage onAddBook={handleAddBook} />} />
        <Route path="/books" element={<Pages.BookshelfPage books={books} />} />
        </Route>
      </Routes>
    </div>
  );
}



export default App;
