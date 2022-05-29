import Header from "./Header";
import Game from "./Game";
import Rules from "./Rules";
import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  const [num, setNum] = useState(null);
  const URL =
    "https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new";

  const getRandomNum = () => {
    axios
      .get(URL)
      .then((response) => {
        const myData = response.data;
        const newArr = myData.split("");
        const filtered = newArr.filter((item) => item !== "\n").join("");
        setNum(filtered);
        console.log(num);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="App">
      <button onClick={getRandomNum}>click me</button>
      <Router>
        <Header />
        <button>
          <Link to="/game">Game</Link>
        </button>
        <br></br>

        <br></br>
        <button>
          <Link to="/rules">Rules</Link>
        </button>

        <Routes>
          <Route path="/game" element={<Game />} />
          <Route path="/rules" element={<Rules />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
