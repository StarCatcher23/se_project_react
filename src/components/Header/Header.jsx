import { NavLink, useLocation } from "react-router-dom";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";

function Header({
  handleAddClick,
  weatherData,
  onRegisterClick,
  onLoginClick,
  isLoggedIn,
}) {
  const location = useLocation();

  const userLinkTarget = "/profile";

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header className="header">
      <NavLink to="/" className="header__logo-link">
        <img src={logo} className="header__logo" alt="WTWR logo" />
      </NavLink>

      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>

      <ToggleSwitch />

      <button
        onClick={() => {
          if (!isLoggedIn) {
            alert("Please log in first");
            return;
          }
          handleAddClick();
        }}
        type="button"
        className="header__add-clothes-btn"
      >
        + Add Clothes
      </button>

      <button
        onClick={onRegisterClick}
        type="button"
        className="header__auth-btn"
      >
        Sign Up
      </button>

      <button onClick={onLoginClick} type="button" className="header__auth-btn">
        Log In
      </button>

      <NavLink to="/profile" className="header__profile-link"></NavLink>

      <NavLink to={userLinkTarget} className="header__nav-link">
        <div className="header__user-container">
          <p className="header__username">Terrence Tegegne</p>
          <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
        </div>
      </NavLink>
    </header>
  );
}

export default Header;
