import Header from "./Header";
import Game from "./Game";
import Rules from "./Rules";
import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Button from "@mui/material/Button";

import { styled } from "@mui/material/styles";

const GameButton = styled(Button)({
  fontSize: 20,
  padding: "12px 12px",
  backgroundColor: "#7834FF",
  width: 700,
  marginLeft: 50,
  marginTop: 200,

  "&:hover": {
    backgroundColor: "#D9D9D9",
    borderColor: "#0062cc",
    boxShadow: "none",
  },
});
const RuleButton = styled(Button)({
  fontSize: 20,
  padding: "12px 12px",
  backgroundColor: "#7834FF",
  width: 700,
  marginLeft: 50,
  "&:hover": {
    backgroundColor: "#D9D9D9",
    borderColor: "#0062cc",
    boxShadow: "none",
  },
});

function App() {
  const [dig1, setDig1] = useState("");
  const [guess1, setGuess1] = useState("");
  const [num, setNum] = useState(0);
  const [isToggle, setToggle] = useState(false);
  const [ruleToggle, setRuleToggle] = useState(false);

  const [test, setTest] = useState("");

  const feed1 = "Hooray!!! You won!!";
  const feed2 = "You guessed a correct number and its correct location";
  const feed3 = "You guessed a correct number ";
  const feed4 = "guess was incorrect";

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
    setTest("");

    if (dig1 === num) {
      setTest(feed1);
    } else {
      for (let number of dig1) {
        if (
          num.indexOf(number) >= 0 &&
          num.indexOf(number) === dig1.indexOf(number)
        ) {
          console.log("iam in both");
          setTest(feed2);
          return;
        } else if (num.indexOf(number) >= 0) {
          setTest(feed3);
          return;
        }
      }
      setTest(feed4);
    }
  };

  const handleGame = (e) => {
    setToggle(!isToggle);
  };
  const handleRules = (e) => {
    setRuleToggle(!ruleToggle);
  };

  return (
    <div className="App">
      <Header />

      <div className="container">
        <GameButton
          variant="contained"
          color="secondary"
          size="large"
          onClick={handleGame}
          style={{ marginBottom: "2em" }}
        >
          Game
        </GameButton>

        <Game
          dig1={dig1}
          setDig1={setDig1}
          feed1={feed1}
          feed2={feed2}
          feed3={feed3}
          feed4={feed4}
          test={test}
          handleSubmit={handleSubmit}
          getRandomNum={getRandomNum}
          isToggle={isToggle}
        />
        <RuleButton
          variant="contained"
          color="secondary"
          size="large"
          onClick={handleRules}
          style={{ marginBottom: "2em", display: "block" }}
        >
          {" "}
          Rules
        </RuleButton>
        <Rules ruleToggle={ruleToggle} />
      </div>
    </div>
  );
}

export default App;
