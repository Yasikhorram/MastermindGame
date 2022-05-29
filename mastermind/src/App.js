import Header from "./Header";
import Game from "./Game";
import Rules from "./Rules";
import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  const [num, setNum] = useState(null);
  const URL = "https://www.random.org/clients/http/api/";

  useEffect(() => {
    axios.get(URL).then((response) => {
      setNum(response.data);
      console.log("num is: ", num);
    });
  }, [URL]);

  return (
    <div className="App">
      Testing
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
