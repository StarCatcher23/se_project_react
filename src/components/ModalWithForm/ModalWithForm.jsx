import "./ModalWithForm.css";
import closeIcon from "../../assets/modalclose.png";

function ModalWithForm({
  title,
  name,
  buttonText = "Save ",
  isOpen,
  onSubmit,
  onClose,
  children,
  isLoading,
  footerText,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeIcon} alt="Close" />
        </button>

        <form
          onSubmit={onSubmit}
          className="modal__form"
          name={name}
          noValidate
        >
          {children}

          <div className="modal__button-footer">
            <button type="submit" className="modal__submit">
              {isLoading ? "Saving..." : buttonText}
            </button>
            {footerText && <p className="modal__footer-text">{footerText}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
