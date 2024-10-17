import { useEffect, useState } from "react";
import "./App.css";
import uuid from "react-uuid";
import a from "./assets/photoGalery/1.jpg";
import b from "./assets/photoGalery/2.jpg";
import c from "./assets/photoGalery/3.jpg";
import d from "./assets/photoGalery/4.jpg";
import e from "./assets/photoGalery/5.jpg";
import f from "./assets/photoGalery/6.jpg";
import g from "./assets/photoGalery/7.jpg";
import i from "./assets/photoGalery/8.jpg";
import j from "./assets/photoGalery/9.jpg";
import k from "./assets/photoGalery/10.jpg";
import l from "./assets/photoGalery/11.jpg";

interface ISavedColors {
  color: string;
  id: string;
}

const photoGalery = [a, b, c, d, e, f, g, i, j, k, l];

function App() {
  const [color, setColor] = useState("rgb(255, 0, 0)");
  const [countColor, setCountColor] = useState(0);
  const [speed, setSpeed] = useState(30);
  const [shouldSaveColor, setShouldSaveColor] = useState(false);
  const [shouldGenerate, setShouldGenerate] = useState(false);
  const [isAnimateButton, setIsAnimateButton] = useState(true);
  const [savedColors, setSavedColors] = useState<ISavedColors[]>([]);
  const [showPhotos, setShowPhotos] = useState(false);

  const generateColor = () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    setColor(`rgb(${r}, ${g}, ${b})`);
  };

  const setShouldGenerateHandler = () => {
    setShouldGenerate(true);
    setIsAnimateButton(false);
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
      setCountColor(0);
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
        <div style={{ background: color }} className="item"></div>
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
      <div className="photo-galery-wrapper">
        <h2 onClick={() => setShowPhotos((prev) => !prev)}>{`${
          showPhotos ? "Скрыть" : "Показать"
        } галерею фото`}</h2>
        <div
          className={`container x mandatory-scroll-snapping ${
            showPhotos ? "show-photos" : ""
          }`}
        >
          {photoGalery.map((img) => (
            <div>
              <img src={img} alt="image" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
