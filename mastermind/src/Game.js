import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const GameButton = styled(Button)({
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

const CheckButton = styled(Button)({
  fontSize: 20,
  padding: "3px",
  backgroundColor: "#B58143",
  width: 150,
  marginLeft: 50,
  marginRight: 50,
  marginTop: 10,
  color: "white",
  "&:hover": {
    backgroundColor: "#D9D9D9",
    borderColor: "#0062cc",
    boxShadow: "none",
  },
});

function Game({
  dig1,
  setDig1,
  feed1,
  feed2,
  feed3,
  feed4,
  handleSubmit,
  test,
  getRandomNum,
  isToggle,
}) {
  return (
    <div>
      {isToggle && (
        <div classname="center">
          <GameButton onClick={getRandomNum}>Start the game</GameButton>
          <form className="gameContainer">
            <br></br>
            <input
              type="text"
              required
              className="circle"
              value={dig1}
              onChange={(e) => setDig1(e.target.value)}
            />
            <CheckButton type="submit" onClick={handleSubmit}>
              check
            </CheckButton>
            {test === feed1 ? <span>{feed1}</span> : ""}
            {test === feed2 ? <span>{feed2}</span> : ""}
            {test === feed3 ? <span>{feed3}</span> : ""}
            {test === feed4 ? <span>{feed4}</span> : ""}
          </form>
        </div>
      )}
    </div>
  );
}

export default Game;
