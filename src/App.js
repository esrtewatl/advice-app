import { useState, useEffect } from "react";
import "./App.css"

function useDadJoke() {
  const [text, setText] = useState({ id: "", advice: "" });
  

  const fetchDadJoke = async () => {
    const res = await fetch("https://icanhazdadjoke.com/", {
      headers: {
        Accept: "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    setText({ id: data.id, advice: data.joke });
  };

  useEffect(() => {
    fetchDadJoke();
  }, []);

  const handleClick = () => {
    fetchDadJoke();
  };

  return { text, handleClick };
}

function App() {
  const { text, handleClick } = useDadJoke();
  

  return (
<div>

        <input
          type="text"
          id="search"
          placeholder="Search Jokes"
          className="searchBar"
          
        />
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
        <button onClick={handleClick}>
          <img src="./dice.png" alt="" />
        </button>
      </div>
    </div>
    </div>
  );
}

export default App;
