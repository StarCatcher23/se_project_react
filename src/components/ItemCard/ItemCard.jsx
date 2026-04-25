import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  // Hide the entire card if user is not logged in
  if (!currentUser) return null;

  const handleCardClick = () => {
    onCardClick(item);
  };

  // Check if the item was liked by the current user
  const isLiked = item.likes.some((id) => id === currentUser._id);

  // Build className for the like button
  const itemLikeButtonClassName = `card__like-btn ${
    isLiked ? "card__like-btn_active" : ""
  }`;

  const handleLikeClick = (e) => {
    e.stopPropagation();
    onCardLike({ id: item._id, isLiked });
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>

      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.link || item.imageUrl}
        alt={item.name}
      />

      {/* Like button */}
      <button className={itemLikeButtonClassName} onClick={handleLikeClick} />
    </li>
  );
}

export default ItemCard;
