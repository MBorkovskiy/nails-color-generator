import { useEffect, useState } from "react";
import "./game.css";

export const Game = () => {
  const [counter, setCounter] = useState(0);
  const [clicked, setClicked] = useState(false);

  const tapHandler = () => {
    setClicked(true);
    setCounter((prev) => {
      const result = prev + 1;
      localStorage.setItem("points", `${result}`);
      return result;
    });
    setTimeout(() => {
      setClicked(false);
    }, 0);
  };

  useEffect(() => {
    if (localStorage.getItem("points") !== null) {
      setCounter(JSON.parse(localStorage.getItem("points")!));
    }
  }, []);

  return (
    <div className="game-wrapper">
      <h1>Тапай на пупса и зарабатывай миллион</h1>

      <div
        className={`tap-item ${clicked ? "clicked" : ""}`}
        onClick={tapHandler}
      ></div>
      <div>{`${counter} очка(ов)`}</div>
    </div>
  );
};
