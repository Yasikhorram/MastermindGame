import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

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
  isToggle,
}) {
  return (
    <div>
      {isToggle && (
        <div className="center">
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
            {test === feed1 ? <span className="box">{feed1}</span> : ""}
            {test === feed2 ? <span className="box">{feed2}</span> : ""}
            {test === feed3 ? <span className="box">{feed3}</span> : ""}
            {test === feed4 ? <span className="box">{feed4}</span> : ""}
          </form>
        </div>
      )}
    </div>
  );
}

export default Game;
