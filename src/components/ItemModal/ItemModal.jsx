import "../ModalWithForm/ModalWithForm.css";
import "./ItemModal.css";
import closeIcon from "../../assets/closeicon.png";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ isOpen, onClose, card, onDelete }) {
  const currentUser = useContext(CurrentUserContext);

  // Check if current user owns the item
  const isOwn = card.owner === currentUser?._id;

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button
          className="modal__close"
          type="button"
          onClick={onClose}
        ></button>

        <img
          src={card.link || card.imageUrl}
          alt={card.name}
          className="modal__image"
        />

        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>

          {/* DELETE BUTTON */}
          {isOwn && (
            <button
              className="modal__delete-btn"
              type="button"
              onClick={() => onDelete(card._id)}
            >
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
