import { NavLink } from "react-router-dom";
import "./header.css";

export const Header = () => {
  console.log(";header");
  return (
    <header>
      <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
        Ноготки
      </NavLink>
      <NavLink
        to="/photos"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Фото
      </NavLink>
      <NavLink
        to="/task"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Занятия
      </NavLink>
      <NavLink
        to="/game"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Игра
      </NavLink>
    </header>
  );
};
