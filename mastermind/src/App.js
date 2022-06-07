import Header from "./Header";
import Rules from "./Rules";

import { useEffect, useState } from "react";
import axios from "axios";

import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import DataTable from "./DataTable";

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

const CheckButton = styled(Button)({
  backgroundColor: "#6849d3",

  color: "white",
  "&:hover": {
    backgroundColor: "#D9D9D9",
    borderColor: "#0062cc",
    boxShadow: "none",
  },
});

const App = () => {
  const [num, setNum] = useState(0);
  const [entry, setEntry] = useState("");
  // const [isToggle, setToggle] = useState(false);
  const [ruleToggle, setRuleToggle] = useState(false);
  const [flipButton, setFlipButton] = useState(false);
  const [open, setOpen] = useState(false);
  const [confettiOpen, setConfettiOpen] = useState(false);
  const [history, setHistory] = useState([]);
  const [attempts, setAttempts] = useState(9);
  const [confetti, setConfetti] = useState(false);
  const { width, height } = useWindowSize();
  const [historyShow, setHistoryShow] = useState(false); //History word
  const [count, setCount] = useState(1);

  const [gameState, setGameState] = useState(
    JSON.parse(localStorage.getItem("result")) || []
  );

  useEffect(() => {
    localStorage.setItem("result", JSON.stringify(gameState));
  }, [gameState]);

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
        console.log("response.data is: ", myData);
        const newArr = myData.split("");
        console.log("newArr:", newArr);
        const filtered = newArr.filter((item) => item !== "\n").join("");
        setNum(filtered);

        return filtered;
      })
      .catch((err) => {
        console.log(err);
      });
    handleGame();
  };

  const handleSubmit = () => {
    console.log("guess1 is: ", entry, "num is: ", num);
    setHistoryShow(true);

    setAttempts(attempts - 1);
    if (attempts === 0) {
      setOpen(true);
      setHistoryShow(false);
      setHistory([]);

      return;
    }
    if (entry === num) {
      setConfetti(true);
      setConfettiOpen(true);
      writeHistory(attempts, entry, feed1);
      setEntry("");
    } else {
      for (let number of entry) {
        if (
          num.indexOf(number) >= 0 &&
          num.indexOf(number) === entry.indexOf(number)
        ) {
          writeHistory(attempts, entry, feed2);
          setEntry("");
          return;
        } else if (num.indexOf(number) >= 0) {
          writeHistory(attempts, entry, feed3);
          setEntry("");
          return;
        }
      }

      writeHistory(attempts, entry, feed4);
      setEntry("");
    }
  };

  const writeHistory = (a, b, c) => {
    setHistory([...history, { a, b, c }]);
  };

  const updateGameHistory = (count, didWin) => {
    setGameState([...gameState, { count, didWin }]);
  };

  const handleRules = () => {
    setRuleToggle(!ruleToggle);
  };
  const handleGame = () => {
    setFlipButton(!flipButton);
  };

  const restartGame = () => {
    getRandomNum();
    setAttempts(9);
    setHistory([]);
    setHistoryShow(false);
  };

  const handleClose = () => {
    setOpen(false);
    restartGame();
    setCount(count + 1);
    updateGameHistory(count, "lost");
  };

  const handleCloseConfetti = () => {
    setConfettiOpen(false);
    setConfetti(false);
    restartGame();
    setCount(count + 1);
    updateGameHistory(count, "won");
  };

  return (
    <div className="App">
      <Header />
      <DataTable gameState={gameState} />

      <div className="container">
        <GameButton
          variant="contained"
          color="secondary"
          size="large"
          style={{ marginBottom: "2em" }}
          onClick={getRandomNum}
        >
          Game
        </GameButton>

        {flipButton ? (
          <>
            <br />
            <>
              <TextField
                type="number"
                id="outlined-basic"
                label="Enter the number"
                variant="outlined"
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
              />
              <br />
              <CheckButton variant="outlined" onClick={handleSubmit}>
                Check your answer
              </CheckButton>
              <>{confetti && <Confetti width={width} height={height} />}</>
              <br />
              <div>
                {historyShow && <h3>History:</h3>}

                <br></br>
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
              Oh no! The computer generated number was: {num}. Best of luck!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              Try Again
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {confettiOpen && (
        <Dialog
          open={confettiOpen}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Congratulations!</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You guessed the correct number and You won!!!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfetti} autoFocus>
              Play Again
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default App;
