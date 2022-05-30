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
        <form>
          <button onClick={getRandomNum}>Start the game</button>
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
          {test === feed1 ? <span>{feed1}</span> : ""}
          {test === feed2 ? <span>{feed2}</span> : ""}
          {test === feed3 ? <span>{feed3}</span> : ""}
          {test === feed4 ? <span>{feed4}</span> : ""}
        </form>
      )}
    </div>
  );
}

export default Game;
