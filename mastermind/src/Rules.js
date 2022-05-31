function Rules({ ruleToggle }) {
  return (
    <div>
      {ruleToggle && (
        <ul>
          <li>
            At the start of the game the computer will randomly select a pattern
            of four different numbers from a total of 8 different numbers
          </li>
          <li>Select 4 numbers between 0 ~ 7</li>
          <li>You will have 10 attempts to guess the number combinations</li>
          <li>
            At the end of each guess, click on Check button and let computer
            provide you a feedback
          </li>
        </ul>
      )}
    </div>
  );
}

export default Rules;
