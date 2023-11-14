import React,  {useState } from "react";
import SearchForm from "../SearchForm";

export default function ComicSearchWidget () {
    const [searchString, setSearchString] = useState("");
    
    function handleSearch(userInput){
        setSearchString(userInput);
    }
    return(
        <SearchForm handleSearch={handleSearch} lastSearch={searchString}/>
    )
}