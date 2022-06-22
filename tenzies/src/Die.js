import "./App.css";

export default function Die(props) {
  return (
    <div className="dice">
      <h2 className="dice-num">{props.value}</h2>
    </div>
  );
}
