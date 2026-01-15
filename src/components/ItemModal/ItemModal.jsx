import "./ItemModal.css";
import closeIcon from "../../assets/closeicon.png";

function ItemModal({ activeModal, onClose, card, onDelete }) {
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
            className="modal__delete-btn"
            type="button"
            onClick={() => onDelete(card._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
