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
  { day: 2, place: "Подалок в домике" },
  { day: 4, place: "Подалок в домике" },
  { day: 6, place: "Подалок в домике" },
  { day: 8, place: "Подалок в домике" },
  { day: 10, place: "Подалок в домике" },
  { day: 12, place: "Загляни под кепки на мое столе" },
  { day: 14, place: "В ванне в шкафу на уровне глаз" },
  { day: 16, place: "Я жду пока меня поцелуют блин" },
  { day: 18, place: "Найди корзинку на втором холодильнике" },
  { day: 20, place: "Место где ты нашла чистящие средства для обуви" },
  { day: 22, place: "Загляни в мой шкаф,на самую верхнюю полку" },
  { day: 24, place: "Подалок в домике" },
  { day: 26, place: "Где-то в кладовке" },
  { day: 28, place: "Поищи за подушками дивана, в моей комнате" },
  { day: 30, place: "Подалок в домике" },
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
