import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState({ id: "", advice: "" });

  const fetchAdvice = async () => {
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
    fetchAdvice();
  }, []);

  return (
    <div className="container">
      <h1>Dad Joke #{text.id}</h1>
      <p>{text.advice}</p>

      <picture>
        <source media="(min-width: 768px)" srcSet="" />
        <img src="" alt="" />
      </picture>

      <div>
        <button onClick={fetchAdvice}>
          <img src="./dice-icon" alt="" />
        </button>
      </div>
    </div>
  );
}

export default App;
