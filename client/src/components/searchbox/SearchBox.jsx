import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './SearchBox.css'

const SearchBox = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const searchOnClickListner = () => {
    if (query !== '') {
      navigate('/search?q=' + query);
    } else {
      alert("Please enter value");
    }
  }

  return (
    <div className="searchBox">
      <input className="searchInput" type="text" name="" placeholder="What are you looking for today?"
        value={query} onChange={(e) => setQuery(e.target.value)}
        onKeyPress={(e) => {
          if(e.key === 'Enter'){
            searchOnClickListner();
          }
        }}
      />
      <button className="searchButton" href="#" onClick={searchOnClickListner}>
        <img src="./Images/Icons/search_icon1.png" height={24} width={24} alt="" />
      </button>
    </div>
  );
};

export default SearchBox;
