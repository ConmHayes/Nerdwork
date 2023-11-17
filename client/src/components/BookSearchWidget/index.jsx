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
            const response = await fetch('https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=UxtGZxXz9zBBaz9Bbsha7jdBmqqQVMLH'); 
            const data = await response.json();
            console.log(data.results.books)
            const books = data.results.books
            setBooks(books);
            // Initially display all books
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };
    
    function displayBooks() {
        return books
                .filter(book => searchString.length == 0 || book.title.toLowerCase().includes(searchString.toLowerCase()))
                .map(book => <BookSearchCard key={book.primary_isbn10} book={book} />)
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