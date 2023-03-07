import { useState, useEffect } from "react";
import "./App.css";

function useDadJoke() {
  const [text, setText] = useState({ id: "", advice: "" });

  const fetchDadJoke = async (query) => {
    const url = `https://icanhazdadjoke.com/search?term=${query}`;
    const res = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    setText({ id: data.results[0].id, advice: data.results[0].joke });
  };

  const fetchRandomDadJoke = async () => {
    const res = await fetch("https://icanhazdadjoke.com/", {
      headers: {
        Accept: "application/json",
      },
    });
    const data = await res.json();
    setText({ id: data.id, advice: data.joke });
  };

  useEffect(() => {
    fetchRandomDadJoke();
  }, []);

  const handleSearch = (query) => {
    fetchDadJoke(query);
  };

  return { text, handleSearch, fetchRandomDadJoke };
}

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const { text, handleSearch, fetchRandomDadJoke } = useDadJoke();

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleSearch(searchTerm);
  };

  const handleButtonClick = (query) => {
    handleSearch(query);
  };

  return (
    <div>
      <div className="SearchBar-container">
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Search Jokes"
            className="searchBar"
            value={searchTerm}
            onChange={handleInputChange}
          />
          <button id="searchSubmit" type="submit">
            Enter
          </button>
        </form>
      </div>
      <div className="searchButton-container">
        <button className="searchButton1" onClick={() => handleButtonClick("bike")}>
          Bike
        </button>
        <button className="searchButton2" onClick={() => handleButtonClick("fat")}>
          Fat
        </button>
      </div>
      <div className="container">
        <h1>Dad Joke #{text.id}</h1>
        <p>{text.advice}</p>
        <picture>
          <source media="(min-width: 768px)" srcSet="" />
          <img src="" alt="" />
        </picture>
        <div>
          <button className="tink" onClick={fetchRandomDadJoke}>
            <img src="./dice.png" alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
