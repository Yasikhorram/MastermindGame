import Header from "./Header";
import Game from "./Game";
import Rules from "./Rules";

import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Button from "@mui/material/Button";

import { styled } from "@mui/material/styles";

import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

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

const StartButton = styled(Button)({
  fontSize: 20,
  padding: "12px 12px",
  backgroundColor: "#A6A6A6",
  width: 200,
  color: "white",
  "&:hover": {
    backgroundColor: "#D9D9D9",
    borderColor: "#0062cc",
    boxShadow: "none",
  },
});

const App = () => {
  const [entry, setEntry] = useState("");
  const [num, setNum] = useState(0);
  const [isToggle, setToggle] = useState(false);
  const [ruleToggle, setRuleToggle] = useState(false);
  const [flipButton, setFlipButton] = useState(false);
  const [test, setTest] = useState("");
  const [history, setHistory] = useState([]);
  const [attempts, setAttempts] = useState(9);
  const { width, height } = useWindowSize();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log("Entry: " + entry);
    console.log("Random number: " + num);
    console.log(history);
  }, [entry, num, history]);

  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const feed1 = "Hooaaaaaaaray!!! You won!!";
  const feed2 =
    "You guessed a correct number and its correct location.  You can do this :)";
  const feed3 = "You guessed a correct number! Keep going :)";
  const feed4 = "guess was incorrect! :(";

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
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = () => {
    console.log("guess1 is: ", entry, "num is: ", num);
    setTest("");
    setAttempts(attempts - 1);
    if (attempts === 0) {
      setOpen(true);
    }
    if (entry === num) {
      setTest(feed1);
      writeHistory(attempts, entry, feed1);
    } else {
      for (let number of entry) {
        if (
          num.indexOf(number) >= 0 &&
          num.indexOf(number) === entry.indexOf(number)
        ) {
          console.log("iam in both");
          setTest(feed2);
          writeHistory(attempts, entry, feed2);
          return;
        } else if (num.indexOf(number) >= 0) {
          setTest(feed3);
          writeHistory(attempts, entry, feed3);
          return;
        }
      }
      setTest(feed4);
      writeHistory(attempts, entry, feed4);
    }
  };

  const writeHistory = (a, b, c) => {
    setHistory([...history, { a, b, c }]);
  };

  const handleGame = (e) => {
    setToggle(!isToggle);
    setFlipButton(!flipButton);
  };

  const handleRules = (e) => {
    setRuleToggle(!ruleToggle);
  };

  const handleClose = () => {
    setOpen(false);
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

        {flipButton ? (
          <>
            <StartButton onClick={getRandomNum}>Start The Game</StartButton>
            <br />
            <>
              <TextField
                id="outlined-basic"
                label="Enter the number"
                variant="outlined"
                onChange={(e) => setEntry(e.target.value)}
              />
              <br />
              <Button variant="outlined" onClick={handleSubmit}>
                Submit the answer
              </Button>
              <>{num === entry && <Confetti width={width} height={height} />}</>
              <br />
              <div>
                History:<br></br>
                {history
                  .map((item) => (
                    <Card sx={{ minWidth: 275 }}>
                      <CardContent>
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="text.secondary"
                          gutterBottom
                        >
                          {`You have ${item.a} more attempts`}
                        </Typography>
                        <Typography variant="h5" component="div">
                          Your guess: {item.b}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                          Feedback: {item.c}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))
                  .reverse()}
              </div>
            </>
          </>
        ) : (
          <>
            <RuleButton
              variant="contained"
              color="secondary"
              size="large"
              onClick={handleRules}
              style={{ marginBottom: "2em", display: "block" }}
            >
              Rules
            </RuleButton>
            <Rules ruleToggle={ruleToggle} />
          </>
        )}
      </div>
      {open && (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">GAME OVER!</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Refresh the page and start over again.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleClose} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default App;
