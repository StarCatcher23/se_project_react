import "./ItemModal.css";
import closeIcon from "../../assets/closeicon.png";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ activeModal, onClose, card, onDelete }) {
  const currentUser = useContext(CurrentUserContext);

  //Check uf current user owns the item
  const isOwn = card.owner === currentUser?._id;

  //conditional delete button class
  const itemDeleteButtonClassName = `modal__delete-btn ${isOwn ? "" : "modal__delete-btn_hidden"}`;

  return (
    <div className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button className="modal__close" type="button" onClick={onClose}>
          <img src={closeIcon} alt="close icon" />
        </button>

        <img src={card.imageUrl} alt={card.name} className="modal__image" />

        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>

          {/* DELETE BUTTON */}
          <button
            className={itemDeleteButtonClassName}
            type="button"
            onClick={() => onDelete(card._id)}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
