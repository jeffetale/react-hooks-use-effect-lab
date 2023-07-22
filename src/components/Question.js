import React, {  useEffect, useState } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // add useEffect code

  useEffect(() => {
    let countDownTimer;

    //decrease time
    const decreaseTimer = () => {
      setTimeRemaining((currentTime) => currentTime - 1); 
      console.log("decreasing time")
    };

    //start time
    countDownTimer = setInterval(decreaseTimer, 1000);

    //clean up interval
    return () => {
    clearInterval(countDownTimer);
    console.log('Interval cleared')
    };
  }, []);

  useEffect(() => {
    // reset time to ten when it hits zero
    if (timeRemaining === 0) {
      setTimeRemaining(10);
      //Initiate onAnswered callback "false"
      onAnswered(false);

      console.log('reset occured')
    }
  }, [timeRemaining, onAnswered]);

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
