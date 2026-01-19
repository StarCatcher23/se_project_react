import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import { APIKey } from "../../utils/constants";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { addItem, getItems, removeItem } from "../../utils/api";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";

import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

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

  // Add Item
  const onAddItem = (inputValues) => {
    const newCardData = {
      name: inputValues.name,
      imageUrl: inputValues.imageUrl,
      weather: inputValues.weather,
    };

    setIsLoading(true);

    addItem(newCardData)
      .then((data) => {
        setClothingItems((prev) => [data, ...prev]);
        closeActiveModal();
      })
      .catch((err) => console.error("Something went wrong:", err))
      .finally(() => setIsLoading(false));
  };

  // Delete Item
  const handleDeleteItem = (id) => {
    setIsLoading(true);

    removeItem(id)
      .then(() => {
        setClothingItems((prev) => prev.filter((item) => item._id !== id));
        closeActiveModal();
      })
      .catch((err) => console.error("Delete failed:", err))
      .finally(() => setIsLoading(false));
  };

  // Get user's geolocation and fetch weather data
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userCoordinates = { latitude, longitude };
          setCoordinates(userCoordinates);

          // Fetch weather data with user's coordinates
          getWeather(userCoordinates, APIKey)
            .then((data) => setWeatherData(filterWeatherData(data)))
            .catch(console.error);
        },
        (error) => {
          console.error("Geolocation error:", error);
          // Fallback to default coordinates if geolocation fails
          const fallbackCoordinates = {
            latitude: 39.951061,
            longitude: -75.165619,
          };
          setCoordinates(fallbackCoordinates);
          getWeather(fallbackCoordinates, APIKey)
            .then((data) => setWeatherData(filterWeatherData(data)))
            .catch(console.error);
        },
      );
    } else {
      console.error("Geolocation is not supported by this browser");
      // Fallback to default coordinates
      const fallbackCoordinates = {
        latitude: 39.951061,
        longitude: -75.165619,
      };
      setCoordinates(fallbackCoordinates);
      getWeather(fallbackCoordinates, APIKey)
        .then((data) => setWeatherData(filterWeatherData(data)))
        .catch(console.error);
    }

    getItems()
      .then((data) => setClothingItems([...data].reverse()))
      .catch(console.error);
  }, []);

  // -----------------------------
  // Render
  // -----------------------------
  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />

          <Routes>
            <Route
              path="/"
              element={
                isWeatherDataLoaded ? (
                  <Main
                    weatherData={weatherData}
                    clothingItems={clothingItems}
                    handleCardClick={handleCardClick}
                  />
                ) : (
                  <p>Loading weather data...</p>
                )
              }
            />

            <Route
              path="/profile"
              element={
                <Profile
                  clothingItems={clothingItems}
                  onCardClick={handleCardClick}
                  onAddClick={handleAddClick}
                />
              }
            />
          </Routes>

          <Footer />
        </div>

        <AddItemModal
          activeModal={activeModal}
          isOpen={activeModal === "add-garment"}
          onAddItem={onAddItem}
          onClose={closeActiveModal}
          isLoading={isLoading}
        />

        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={closeActiveModal}
          onDelete={handleDeleteItem}
          isLoading={isLoading}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
