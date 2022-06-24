import "./App.css";
import Die from "./Die";
import React from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [round, setRound] = React.useState(1);

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSame = dice.every((die) => die.value === firstValue);

    if (allHeld && allSame) {
      setTenzies(true);
    } else {
      return;
    }
  }, [dice]);

  React.useEffect(() => {
    if (tenzies) {
      if (localStorage.getItem("score") === null) {
        localStorage.setItem("score", round);
      } else if (localStorage.getItem("score") > round) {
        localStorage.setItem("score", round);
      }
    }
  }, [tenzies]);

  function allNewDice() {
    const numArray = [];
    for (let i = 0; i < 10; i++) {
      numArray.push(Math.floor(Math.random() * 6) + 1);
    }

    const numObject = numArray.map((num) => ({
      value: num,
      isHeld: false,
      id: nanoid(),
    }));
    return numObject;
  }

  function handleRoll() {
    setDice((prevDice) =>
      prevDice.map((die) =>
        !die.isHeld ? { ...die, value: Math.floor(Math.random() * 6) + 1 } : die
      )
    );
    setRound((prev) => prev + 1);
  }

  function holdDice(id) {
    setDice((prevSet) => {
      return prevSet.map((die) => {
        return die.id === id
          ? {
              ...die,
              isHeld: !die.isHeld,
            }
          : die;
      });
    });
  }

  const diceElement = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));
  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all the dice are the same. Click a die to freeze it at that
        current value between rolls.
      </p>
      <div className="dice-container">{diceElement}</div>
      {tenzies && <h2>You Won!</h2>}
      {round > 1 && <h2>Rolls: {round}</h2>}
      {!tenzies ? (
        <button className="roll-button" onClick={handleRoll}>
          Roll Dice
        </button>
      ) : (
        <button
          className="roll-button"
          onClick={() => {
            setDice(allNewDice());
            setTenzies(false);
            setRound(1);
          }}
        >
          New Game?
        </button>
      )}
      {localStorage.getItem("score") && (
        <p className="best-round">
          Best round: {localStorage.getItem("score")} rolls
        </p>
      )}
      {tenzies && <Confetti />}
    </main>
  );
}

export default App;
