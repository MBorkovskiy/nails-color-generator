import uuid from "react-uuid";

import { useEffect, useState } from "react";

interface ISavedColors {
  color: string;
  id: string;
}

export const Nails = () => {
  const [color, setColor] = useState("rgb(255, 0, 0)");
  const [countColor, setCountColor] = useState(0);
  const [speed, setSpeed] = useState(30);
  const [shouldSaveColor, setShouldSaveColor] = useState(false);
  const [shouldGenerate, setShouldGenerate] = useState(false);
  const [isAnimateButton, setIsAnimateButton] = useState(true);
  const [savedColors, setSavedColors] = useState<ISavedColors[]>([]);

  const generateColor = () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    setColor(`rgb(${r}, ${g}, ${b})`);
  };

  const setShouldGenerateHandler = () => {
    setShouldGenerate(true);
    setIsAnimateButton(false);
    setCountColor(0);
    setShouldSaveColor(false);
  };

  const saveColorHandler = () => {
    setSavedColors((prev) => {
      const result = [...prev, { color, id: uuid() }];
      localStorage.setItem("savedColors", JSON.stringify(result));
      return result;
    });
    setShouldSaveColor(false);
  };

  const deleteColorHandler = (id: string) => {
    const filteredSavedColors = savedColors.filter((el) => el.id !== id);
    setSavedColors(filteredSavedColors);
    localStorage.setItem("savedColors", JSON.stringify(filteredSavedColors));
  };

  useEffect(() => {
    if (localStorage.getItem("savedColors") !== null) {
      setSavedColors(JSON.parse(localStorage.getItem("savedColors")!));
    }
  }, []);

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

      setIsAnimateButton(true);
      setShouldSaveColor(true);
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
        <h1>Не знаешь в какой цвет покрасить ноготки? Нажми на глазик 😘</h1>
        <div className="item-wrapper">
          <div
            style={{ background: color, width: `${countColor}%` }}
            className="item"
          ></div>
          {countColor}%
        </div>
        <button
          onClick={saveColorHandler}
          className={`shouldSaveColorButton ${shouldSaveColor ? "show" : ""}`}
        >
          Сохранить сгенерированный цвет?
        </button>
        <button
          onClick={setShouldGenerateHandler}
          className={`generate-button ${isAnimateButton ? "animation" : ""}`}
        ></button>
      </div>
      <div className="saved-colors-wrapper">
        <h2>Сохраненные цвета:</h2>
        <div className="saved-colors">
          {savedColors.length > 0 ? (
            savedColors.map(({ color, id }) => (
              <div
                style={{ background: color }}
                className="item"
                onClick={() => deleteColorHandler(id)}
              >
                Кликни чтобы удалить
              </div>
            ))
          ) : (
            <p>Пупс еще не сохранял цвета 😢 </p>
          )}
        </div>
      </div>
    </div>
  );
};
