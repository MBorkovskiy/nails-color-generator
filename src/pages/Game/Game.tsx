import { useEffect, useState } from "react";
import "./game.css";

export const Game = () => {
  const [counter, setCounter] = useState(0);
  const [autoClick, setAutoClick] = useState(false);
  const [speed, setSpeed] = useState(200);
  const [points, setPoints] = useState(1);

  const tapHandler = () => {
    setCounter((prev) => {
      const result = prev + points;
      localStorage.setItem("points", `${result}`);
      return result;
    });
  };

  const resetHandler = () => {
    setPoints(1);
    setSpeed(200);
    setAutoClick(false);
  };

  useEffect(() => {
    const autockick = setTimeout(() => {
      if (autoClick) {
        setCounter((prev) => {
          const result = prev + points;
          localStorage.setItem("points", `${result}`);
          return result;
        });
      }
    }, speed);
    return () => clearTimeout(autockick);
  }, [counter, autoClick, speed]);

  useEffect(() => {
    if (localStorage.getItem("points") !== null) {
      setCounter(JSON.parse(localStorage.getItem("points")!));
    }
  }, []);

  return (
    <div className="game-wrapper">
      <h1>Тапай на пупса и зарабатывай Pups coins</h1>
      <div className="tap-item" onClick={tapHandler}></div>
      <span>{`${counter} pups coins`}</span>

      <div className="bottom">
        <button
          className="switch"
          onClick={() => setAutoClick((prev) => !prev)}
        >
          {`${autoClick ? "Выключить" : "Включить"} автокликер`}
        </button>
        <button
          className="switch"
          onClick={() => setSpeed((prev) => prev / 2)}
          disabled={speed <= 25}
        >
          Cкорость x2
        </button>
        <button
          className="switch"
          onClick={() => setPoints((prev) => prev * 2)}
          disabled={points >= 16}
        >
          Очки x{points}
        </button>
      </div>
      <button className="switch" onClick={resetHandler}>
        Сбросить настройки
      </button>
    </div>
  );
};
