import { useState, useEffect } from "react";
import "./App.css"

function useDadJoke() {
  const [text, setText] = useState({ id: "", joke: "" });

  const fetchJokes = async (searchTerm) => {
    const url = searchTerm
      ? `https://icanhazdadjoke.com/search?term=${searchTerm}`
      : "https://icanhazdadjoke.com/";
  
      const res = await fetch(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0",
        },
      });
      
    const data = await res.json();
  
    if (searchTerm) {
      setText({ id: "", joke: data.results[0]?.joke || "No jokes found" });
    } else if (data && data.length > 0) { // add a check for data
      const randomJoke = data[Math.floor(Math.random() * data.length)];
      setText({ id: randomJoke.id, joke: randomJoke.joke });
    }
  };
  

  useEffect(() => {
    fetchJokes();
  }, []);

  const handleClick = () => {
    fetchJokes();
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    fetchJokes(searchTerm);
  };

  return { text, handleClick, handleSearch };
}


function App() {
  const { text, handleClick, handleSearch } = useDadJoke();

  return (
    <div>
      <div className="searchButton-container">
        <input
          type="text"
          id="search"
          placeholder="Search Jokes"
          className="searchBar"
          onChange={handleSearch}
        />

        <button className="searchButton"></button>
        <button className="searchButton"></button>
        <button className="searchButton"></button>
        <button className="searchButton"></button>
      </div>

      <div className="container">
        <h1>Dad Joke #{text.id}</h1>
        <p>{text.joke}</p>

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
