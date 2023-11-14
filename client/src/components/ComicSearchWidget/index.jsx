import React,  {useState } from "react";
import SearchForm from "../SearchForm";

export default function BookSearchWidget () {
    const [searchString, setSearchString] = useState("");
    
    function handleSearch(userInput){
        setSearchString(userInput);
    }
    return(
        <SearchForm handleSearch={handleSearch} lastSearch={searchString}/>
    )
}