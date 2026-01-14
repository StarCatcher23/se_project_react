import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

export default function ClothesSection({ clothingItems, onCardClick }) {
  const filteredItems = clothingItems.filter((item) => item.weather === "hot");
  // Replace "hot" with weatherData.type when you add weatherData back

  return (
    <div className="clothes-section">
      <div className="clothes-section__row">
        <p className="clothes-section__title">Your items</p>
        <button className="clothes-section__add-btn">+ Add new</button>
      </div>
      <ul className="clothes-section__items">
        {filteredItems.map((card) => (
          <ItemCard key={card._id} item={card} onCardClick={onCardClick} />
        ))}
      </ul>
    </div>
  );
}
