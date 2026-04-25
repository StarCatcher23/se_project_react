import { NavLink, useLocation } from "react-router-dom";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import "./Header.css";
import logo from "../../assets/logo.svg";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  weatherData,
  onRegisterClick,
  onLoginClick,
  isLoggedIn,
}) {
  const location = useLocation();
  const currentUser = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const getInitial = (name) => {
    if (!name) return "?";
    return name.charAt(0).toUpperCase();
  };

  return (
    <header className="header">
      <NavLink to="/" className="header__logo-link">
        <img src={logo} className="header__logo" alt="WTWR logo" />
      </NavLink>

      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>

      <ToggleSwitch />

      {/* AUTHORIZED USER UI */}
      {isLoggedIn ? (
        <>
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add Clothes
          </button>

          <NavLink to="/profile" className="header__nav-link">
            <div className="header__user-container">
              <p className="header__username">{currentUser?.name}</p>

              {currentUser?.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="header__avatar"
                />
              ) : (
                <div className="header__avatar-placeholder">
                  {getInitial(currentUser?.name)}
                </div>
              )}
            </div>
          </NavLink>
        </>
      ) : (
        /* NON-AUTHORIZED USER UI */
        <>
          <button
            onClick={onRegisterClick}
            type="button"
            className="header__auth-btn"
          >
            Sign Up
          </button>

          <button
            onClick={onLoginClick}
            type="button"
            className="header__auth-btn"
          >
            Log In
          </button>
        </>
      )}
    </header>
  );
}

export default Header;
