import Header from "./Header";
import Game from "./Game";
import Rules from "./Rules";
import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  const [dig1, setDig1] = useState("");

  const [guess1, setGuess1] = useState("");
  const [num, setNum] = useState(0);

  const getRandomNum = () => {
    axios
      .get(
        "https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new"
      )
      .then((response) => {
        const myData = response.data;
        const newArr = myData.split("");
        const filtered = newArr.filter((item) => item !== "\n").join("");
        setNum(filtered);

        return filtered;
      })
      .then((res) => {
        console.log("num is", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setGuess1(dig1);

    console.log("guess1 is: ", dig1, "num is: ", num);
    if (dig1 === num) {
      alert("Hooooooray!! You WON!!");
    }
    for (let number of dig1) {
      if (num.indexOf(number) && num.indexOf(number) === dig1.indexOf(number)) {
        console.log("You guessed a correct number and its correct location");
        return;
      } else if (num.indexOf(number)) {
        console.log("You guessed a correct number ");
        return;
      } else {
        console.log("guess was incorrect");
        return;
      }
    }
  };

  return (
    <div className="App">
      <button onClick={getRandomNum}>click me</button>
      <form>
        <input
          type="text"
          required
          className="circle"
          value={dig1}
          onChange={(e) => setDig1(e.target.value)}
        />

        <button type="submit" onClick={handleSubmit}>
          check
        </button>
      </form>

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
          <Route
            path="/game"
            element={<Game />}
            dig1={dig1}
            setDig1={setDig1}
          />
          <Route path="/rules" element={<Rules />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
