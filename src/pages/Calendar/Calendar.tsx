import { useEffect, useState } from "react";
import "./calendar.css";
import gift from "../../assets/gift.png";

const months = [
  "Января",
  "Февраля",
  "Марта",
  "Апреля",
  "Мая",
  "Июня",
  "Июля",
  "Августа",
  "Сентября",
  "Октября",
  "Ноября",
  "Декабря",
];

const giftsPlace = [
  { day: 12, place: "Где-то" },
  { day: 14, place: "Где-то" },
  { day: 16, place: "Где-то" },
  { day: 18, place: "Где-то" },
  { day: 20, place: "Где-то" },
  { day: 22, place: "Где-то" },
  { day: 26, place: "Где-то" },
  { day: 28, place: "Где-то" },
  { day: 30, place: "Где-то" },
];

const day = new Date().getDate();
const month = new Date().getMonth();
const emptyGift =
  "На сегодня для пупсика нету подарка 😔, попробуй заглянуть завтра ❤️";

export const Calendar = () => {
  const [isRotated, setIsRotated] = useState(false);
  const [place, setPlace] = useState(emptyGift);

  useEffect(() => {
    if (month === 11) {
      const findPlace = giftsPlace.find((gift) => gift.day === day);
      if (findPlace) {
        setPlace(findPlace.place);
      }
    }
  }, []);

  return (
    <div className="calendar-wrapper">
      <h1>
        Сегодня {day} {months[month]}.Нажми на подарок и узнай где его искать 👇🏿
      </h1>
      <div
        className={`flip-box${isRotated ? "-clicked" : ""}`}
        onClick={() => setIsRotated((prev) => !prev)}
      >
        <div className="flip-box-inner">
          <div className="flip-box-front">
            <img src={gift} alt="Paris" />
          </div>
          <div className="flip-box-back">
            <h2>{place}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};
