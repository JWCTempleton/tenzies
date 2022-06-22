import "./App.css";
import Die from "./Die";

function App() {
  function allNewDice() {
    const numArray = [];
    for (let i = 0; i < 6; i++) {
      numArray.push(Math.floor(Math.random() * 6) + 1);
    }
    return numArray;
  }

  console.log(allNewDice());
  return (
    <main>
      <div className="dice-container">
        <Die value="1" />
        <Die value="1" />
        <Die value="2" />
        <Die value="3" />
        <Die value="4" />
        <Die value="5" />
        <Die value="6" />
        <Die value="1" />
        <Die value="1" />
        <Die value="1" />
      </div>
    </main>
  );
}

export default App;
