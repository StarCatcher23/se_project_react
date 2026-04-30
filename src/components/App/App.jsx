import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import { apiKey } from "../../utils/constants";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import {
  addItem,
  getItems,
  removeItem,
  addCardLike,
  removeCardLike,
  editProfile,
} from "../../utils/api";
import { register, login, checkToken } from "../../utils/auth";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfile/EditProfile";
import Footer from "../Footer/Footer";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });

  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [coordinates, setCoordinates] = useState(null);

  const isWeatherDataLoaded = weatherData.type !== "";
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  // -----------------------------
  // Handlers
  // -----------------------------
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prev) => (prev === "F" ? "C" : "F"));
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
    setIsEditProfileOpen(false);
  };

  const handleEditProfileClick = () => {
    setIsEditProfileOpen(true);
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      alert("Please log in first");
      return;
    }

    const likeRequest = !isLiked ? addCardLike : removeCardLike;

    likeRequest(id, token)
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) => (item._id === id ? updatedCard : item)),
        );
      })
      .catch((err) => console.error("Like toggle failed:", err));
  };

  // ESC close
  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") closeActiveModal();
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null); // optional but recommended
  };

  // -----------------------------
  // Add Item
  // -----------------------------
  const handleAddItem = (inputValues) => {
    if (!isLoggedIn) {
      alert("Please log in first");
      return;
    }

    const token = localStorage.getItem("jwt");

    const newCardData = {
      name: inputValues.name,
      imageUrl: inputValues.imageUrl,
      weather: inputValues.weather,
    };

    setIsLoading(true);

    addItem(newCardData, token)
      .then((data) => {
        setClothingItems((prev) => [data, ...prev]);
        closeActiveModal();
      })
      .catch((err) => console.error("Something went wrong:", err))
      .finally(() => setIsLoading(false));
  };

  // -----------------------------
  // Delete Item
  // -----------------------------
  const handleDeleteItem = (id) => {
    if (!isLoggedIn) {
      alert("Please log in first");
      return;
    }

    const token = localStorage.getItem("jwt");

    setIsLoading(true);

    removeItem(id, token)
      .then(() => {
        setClothingItems((prev) => prev.filter((item) => item._id !== id));
        closeActiveModal();
      })
      .catch((err) => console.error("Delete failed:", err))
      .finally(() => setIsLoading(false));
  };

  // -----------------------------
  // Registration
  // -----------------------------
  const handleRegister = (userData) => {
    setIsLoading(true);

    register(userData)
      .then(() => {
        return login({
          email: userData.email,
          password: userData.password,
        });
      })
      .then((loginRes) => {
        localStorage.setItem("jwt", loginRes.token);
        setIsLoggedIn(true);
        closeActiveModal();
      })
      .catch((err) => console.error("Registration failed:", err))
      .finally(() => setIsLoading(false));
  };

  // -----------------------------
  // Login
  // -----------------------------
  const handleLogin = (credentials) => {
    setIsLoading(true);

    login(credentials)
      .then((res) => {
        console.log("Login successful:", res);

        // 1. Save token
        localStorage.setItem("jwt", res.token);

        // 2. Validate token
        return checkToken(res.token);
      })
      .then((userData) => {
        // 3. Update state
        setIsLoggedIn(true);
        setCurrentUser(userData);

        // 4. Close modal
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Login failed:", err);
      })
      .finally(() => setIsLoading(false));
  };

  const handleEditProfileSubmit = (data) => {
    const token = localStorage.getItem("jwt");
    setIsLoading(true);

    editProfile(data, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeActiveModal();
      })
      .catch((err) => console.error("Profile update failed:", err))
      .finally(() => setIsLoading(false));
  };

  // -----------------------------
  // Token Validation (Auto-login)
  // -----------------------------
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    checkToken(token)
      .then((data) => {
        setIsLoggedIn(true);
        setCurrentUser(data); // optional
      })
      .catch(() => {
        localStorage.removeItem("jwt");
        setIsLoggedIn(false);
      });
  }, []);

  // -----------------------------
  // Get user's geolocation and fetch weather data
  // -----------------------------
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userCoordinates = { latitude, longitude };
          setCoordinates(userCoordinates);

          getWeather(userCoordinates, apiKey)
            .then((data) => setWeatherData(filterWeatherData(data)))
            .catch(console.error);
        },
        () => {
          const fallbackCoordinates = {
            latitude: 39.951061,
            longitude: -75.165619,
          };
          setCoordinates(fallbackCoordinates);
          getWeather(fallbackCoordinates, apiKey)
            .then((data) => setWeatherData(filterWeatherData(data)))
            .catch(console.error);
        },
      );
    }

    getItems()
      .then((items) =>
        setClothingItems(Array.isArray(items) ? [...items].reverse() : items),
      )
      .catch(console.error);
  }, []);

  // -----------------------------
  // Render
  // -----------------------------
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              onLoginClick={() => setActiveModal("login")}
              onRegisterClick={() => setActiveModal("register")}
              isLoggedIn={isLoggedIn}
            />

            <Routes>
              <Route
                path="/"
                element={
                  isWeatherDataLoaded ? (
                    <Main
                      weatherData={weatherData}
                      clothingItems={clothingItems}
                      handleCardClick={handleCardClick}
                      onCardLike={handleCardLike}
                    />
                  ) : (
                    <p>Loading weather data...</p>
                  )
                }
              />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      clothingItems={clothingItems}
                      onCardClick={handleCardClick}
                      onAddClick={handleAddClick}
                      onEditProfile={handleEditProfileClick}
                      onCardLike={handleCardLike}
                      onSignOut={handleSignOut}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <Footer />

            <AddItemModal
              isOpen={activeModal === "add-garment"}
              handleAddItem={handleAddItem}
              onClose={closeActiveModal}
              isLoading={isLoading}
            />

            <ItemModal
              isOpen={activeModal === "preview"}
              card={selectedCard}
              onClose={closeActiveModal}
              onDelete={handleDeleteItem}
            />

            <LoginModal
              isOpen={activeModal === "login"}
              onLogin={handleLogin}
              onClose={closeActiveModal}
              isLoading={isLoading}
            />

            <RegisterModal
              isOpen={activeModal === "register"}
              onRegister={handleRegister}
              onClose={closeActiveModal}
              isLoading={isLoading}
            />

            <EditProfileModal
              isOpen={isEditProfileOpen}
              onClose={closeActiveModal}
              onSubmit={handleEditProfileSubmit}
            />
          </div>
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
