import React,  {useState, useEffect } from "react";
import SearchForm from "../SearchForm";
import BookCard from "../BookSearchCard";
import "./bookSearchWidget.css"

export default function BookSearchWidget () {
    const [searchString, setSearchString] = useState("");
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);

    useEffect(() => {
        fetchBooks();
    }, []);

    useEffect(() => {
        filterBooks();
    }, [searchString, books]);

    const fetchBooks = async () => {
        try {
            const response = await fetch('https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=UxtGZxXz9zBBaz9Bbsha7jdBmqqQVMLH'); // Replace with your API endpoint
            const data = await response.json();
            console.log(data.results.books)
            const books = data.results.books
            setBooks(books);
            setFilteredBooks(books); // Initially display all books
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };
    const filterBooks = () => {
        const filtered = books.filter(book =>
            book.title.toLowerCase().includes(searchString.toLowerCase())
           
        );
        setFilteredBooks(filtered);
        console.log("filtered :", filteredBooks)
        
    };
    
    function handleSearch(userInput){
        setSearchString(userInput);
    }

    return(
        <div>
            <SearchForm handleSearch={handleSearch} lastSearch={searchString}/>
            <div className="cards-container">
                {filteredBooks.map(book => (
                    <BookCard key={book.primary_isbn10} book={book} />
                ))}
            </div>
        </div>

    )
}