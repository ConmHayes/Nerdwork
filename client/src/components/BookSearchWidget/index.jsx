import React,  {useState, useEffect } from "react";
import SearchForm from "../SearchForm";
import "./bookSearchWidget.css"
import BookSearchCard from "../BookSearchCard";
import BookCard from "../BookCard";

export default function BookSearchWidget () {
    const [searchString, setSearchString] = useState("");
    const [books, setBooks] = useState([]);
   

    useEffect(() => {
        fetchBooks();
    }, []);
   

    const fetchBooks = async () => {
        try {
            const response = await fetch('https://nerdwork-server.onrender.com/item/book'); 
            const data = await response.json();
            console.log(data)
            const books = data.items
            setBooks(books);
            console.log( "books", books)
            // Initially display all books
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };
    
    function displayBooks() {
        return books
                .filter(book => searchString.length == 0 || book.title.toLowerCase().includes(searchString.toLowerCase()))
                .map(book => <BookCard key={book.item_id} book={book} />)
    }
    return(
        <div>
            <SearchForm searchString={searchString} setSearchString={setSearchString}/>
            <div className="cards-container">
               {displayBooks()}
            </div>
        </div>

    )
}