import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import likeButtonIcon from "../../assets/Likebutton.png";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isLoggedIn = !!currentUser;

  const handleCardClick = () => {
    onCardClick(item);
  };

  // Check if the item was liked by the current user
  const isLiked =
    isLoggedIn &&
    item.likes.some(
      (likeUserId) => String(likeUserId) === String(currentUser._id),
    );

  // Build className for the like button
  const itemLikeButtonClassName = `card__like-btn ${
    isLiked ? "card__like-btn_active" : ""
  }`;

  const handleLikeClick = (e) => {
    e.stopPropagation();
    if (!onCardLike) return;
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

      {/* Like button only for logged-in users */}
      {isLoggedIn && (
        <button
          className={itemLikeButtonClassName}
          onClick={handleLikeClick}
          aria-label={isLiked ? "Unlike item" : "Like item"}
          type="button"
        >
          <img
            className="card__like-icon"
            src={likeButtonIcon}
            alt={isLiked ? "Liked" : "Not liked"}
          />
        </button>
      )}
    </li>
  );
}

export default ItemCard;
