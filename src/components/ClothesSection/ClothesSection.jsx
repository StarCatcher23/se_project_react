import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function ClothesSection({
  clothingItems,
  onCardClick,
  onAddClick,
}) {
  const currentUser = useContext(CurrentUserContext);

  // Filter clothing items to show only those owned by the current user
  const userClothingItems = clothingItems.filter(
    (item) => item.owner === currentUser?._id,
  );

  return (
    <div className="clothes-section">
      <div className="clothes-section__row">
        <p className="clothes-section__title">Your items</p>
        <button className="clothes-section__add-btn" onClick={onAddClick}>
          + Add new
        </button>
      </div>

      <ul className="clothes-section__items">
        {userClothingItems.map((card) => (
          <ItemCard key={card._id} item={card} onCardClick={onCardClick} />
        ))}
      </ul>
    </div>
  );
}
