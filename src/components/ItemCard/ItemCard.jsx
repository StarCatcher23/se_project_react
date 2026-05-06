import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import likeButtonIcon from "../../assets/Likebutton.png";
import filledHeartIcon from "../../assets/Likebutton_filled.png";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isLoggedIn = !!currentUser;

  const handleCardClick = () => {
    onCardClick(item);
  };

  const isLiked =
    isLoggedIn &&
    item.likes.some(
      (likeUserId) => String(likeUserId) === String(currentUser._id),
    );

  const itemLikeButtonClassName = `card__like-btn ${
    isLiked ? "card__like-btn_active" : ""
  }`;

  const handleLikeClick = (e) => {
    e.stopPropagation();
    if (!isLoggedIn) return;
    if (!onCardLike) return;
    onCardLike({ id: item._id, isLiked });
  };

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__name">{item.name}</h2>

        <button
          className={itemLikeButtonClassName}
          onClick={handleLikeClick}
          aria-label={isLiked ? "Unlike item" : "Like item"}
          type="button"
          disabled={!isLoggedIn}
        >
          <img
            className="card__like-icon"
            src={isLiked ? filledHeartIcon : likeButtonIcon}
            alt={isLiked ? "Liked" : "Not liked"}
          />
        </button>
      </div>

      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.link || item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
