import "./App.css";
import Die from "./Die";
import React from "react";
import { nanoid } from "nanoid";

function App() {
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
    setDice(allNewDice());
  }

  const [dice, setDice] = React.useState(allNewDice());

  const diceElement = dice.map((die) => (
    <Die key={die.id} value={die.value} isHeld={die.isHeld} />
  ));
  return (
    <main>
      <div className="dice-container">{diceElement}</div>
      <button className="roll-button" onClick={handleRoll}>
        Roll Dice
      </button>
    </main>
  );
}

export default App;
