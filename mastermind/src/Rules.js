function Rules({ ruleToggle }) {
  return (
    <div>
      {ruleToggle && (
        <ul>
          <li>
            - By clicking on the GAME button, the computer will randomly select
            a pattern of four different numbers from a total of 8 different
            numbers
          </li>
          <li>- It is a 4 digit number between 0 ~ 7</li>
          <li>- Duplicate digits are allowed</li>
          <li>- You will have 10 attempts to guess the number combinations</li>
          <li>
            - At the end of each guess, click on Check button and let computer
            provide you with a feedback
          </li>
        </ul>
      )}
    </div>
  );
}

export default Rules;
