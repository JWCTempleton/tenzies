import "./App.css";
import Die from "./Die";
import React from "react";
import { nanoid } from "nanoid";

function App() {
  const [dice, setDice] = React.useState(allNewDice());

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
      <div className="dice-container">{diceElement}</div>
      <button className="roll-button" onClick={handleRoll}>
        Roll Dice
      </button>
    </main>
  );
}

export default App;
