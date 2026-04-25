import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function Main({ handleCardClick, clothingItems, weatherData, onCardLike }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const filteredItems = clothingItems.filter(
    (item) => item.weather.toLowerCase() === weatherData.type.toLowerCase(),
  );

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <section className="main__clothes">
        <p className="main__description">
          Today is {weatherData.type} and{" "}
          {weatherData.temp[currentTemperatureUnit]}° {currentTemperatureUnit} /
          You may want to wear:
        </p>
        <ul className="main__items">
          {filteredItems.map((card) => (
            <ItemCard
              key={card._id}
              item={card}
              onCardClick={handleCardClick}
              onCardLike={onCardLike}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
