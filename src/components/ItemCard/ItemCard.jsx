import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const handleCardClick = () => {
    onCardClick(item);
  };

  // Determine if the current user has liked this item
  const isLiked = item.likes?.includes(currentUser?._id);

  const handleLikeClick = (e) => {
    e.stopPropagation(); // prevent opening the preview modal
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

      <button
        className={`card__like-btn ${isLiked ? "card__like-btn_active" : ""}`}
        onClick={handleLikeClick}
      />
    </li>
  );
}

export default ItemCard;
