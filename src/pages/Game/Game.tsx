import { useEffect, useState } from "react";
import "./game.css";

export const Game = () => {
  const [counter, setCounter] = useState(0);
  const [autoClick, setAutoClick] = useState(false);

  const tapHandler = () => {
    setCounter((prev) => {
      const result = prev + 1;
      localStorage.setItem("points", `${result}`);
      return result;
    });
  };

  useEffect(() => {
    setTimeout(() => {
      if (autoClick) {
        setCounter((prev) => {
          const result = prev + 1;
          localStorage.setItem("points", `${result}`);
          return result;
        });
      }
    }, 200);
  }, [counter, autoClick]);

  useEffect(() => {
    if (localStorage.getItem("points") !== null) {
      setCounter(JSON.parse(localStorage.getItem("points")!));
    }
  }, []);

  return (
    <div className="game-wrapper">
      <h1>Тапай на пупса и зарабатывай миллион</h1>
      <div className="tap-item" onClick={tapHandler}></div>
      <div>{`${counter} очка(ов)`}</div>
      <button className="switch" onClick={() => setAutoClick((prev) => !prev)}>
        {`${autoClick ? "Выключить" : "Включить"} автокликер`}
      </button>
    </div>
  );
};
