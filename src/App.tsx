import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [color, setColor] = useState("rgb(255, 0, 0)");
  const [shouldGenerate, setShouldGenerate] = useState(false);

  const [countColor, setCountColor] = useState(0);
  const [speed, setSpeed] = useState(30);

  const generateColor = () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);

    setColor(`rgb(${r}, ${g}, ${b})`);
  };

  useEffect(() => {
    const generatingColors = setTimeout(() => {
      if (countColor < 100 && shouldGenerate) {
        generateColor();
        setCountColor((prev) => prev + 1);
      }
    }, speed);
    return () => clearTimeout(generatingColors);
  }, [countColor, shouldGenerate]);

  useEffect(() => {
    if (countColor === 100) {
      setShouldGenerate(false);
      setCountColor(0);
    }
    setSpeed(() => {
      if (countColor > 95) {
        return 500;
      }
      return 30;
    });
  }, [countColor]);

  return (
    <div className="wrapper">
      <div className="top-content">
        <h1>Генератор цвета ногтей для моей малышки</h1>
        <div style={{ background: color }} className="item"></div>
        <button
          onClick={() => setShouldGenerate(true)}
          className="generate-button"
        >
          Жмяк
        </button>
      </div>
      <div>
        <h2>Сохраненные цвета:</h2>
        <p>Пупс еще не сохранял цвета</p>
      </div>
    </div>
  );
}

export default App;
