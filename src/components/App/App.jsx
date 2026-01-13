import { useEffect, useState } from "react";

import "./App.css";
import { coordinates, APIKey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import Footer from "../Footer/Footer";
import { defaultClothingItems } from "../../utils/constants";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function App() {
  const [items, setitems] = useState(defaultClothingItems);
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });

  const isWeatherDataLoaded = weatherData.type !== "";

  console.log(weatherData);
  const [activeModal, setActiveModal] = useState(""); // or useState(null)
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    getWeather(coordinates, APIKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Main
            weatherData={weatherData}
            clothingItems={items}
            handleCardClick={handleCardClick}
          />
          <Footer />
        </div>
        {/* <ModalWithForm
          title="New garment"
          buttonText="Add garment"
          activeModal={activeModal}
          onClose={closeActiveModal}
          isOpen={activeModal === "add-garment"}
        ></ModalWithForm> */}
        <AddItemModal
          activeModal={activeModal}
          onClose={closeActiveModal}
          isOpen={activeModal === "add-garment"}
        />

        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={closeActiveModal}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
