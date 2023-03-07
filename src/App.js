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

  const handleClick = () => {
    const query = document.getElementById("search").value;
    fetchDadJoke(query);
  };

  return { text, handleClick, fetchRandomDadJoke };
}

function App() {
  const { text, handleClick, fetchRandomDadJoke } = useDadJoke();

  return (
    <div>
      <div className="SearchBar-container">
        <input
          type="text"
          id="search"
          placeholder="Search Jokes"
          className="searchBar"
        />
        <button id="searchSubmit" onClick={handleClick}>
          Enter
        </button>
      </div>
      <div className="searchButton-container">
        <button className="searchButton"></button>
        <button className="searchButton"></button>
        <button className="searchButton"></button>
        <button className="searchButton"></button>
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
