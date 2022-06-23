import "./App.css";

export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld && "#59E391",
  };

  return (
    <div className="dice" style={styles}>
      <h2 className="dice-num">{props.value}</h2>
    </div>
  );
}
