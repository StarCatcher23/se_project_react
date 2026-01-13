import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ isOpen, handleSubmit, onClose }) => {
  return (
    <ModalWithForm
      title="New garment"
      name="new-card"
      buttonText="Add garment"
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
    >
      {/* NAME FIELD — this was missing */}
      <label className="modal__label">
        Name
        <input
          type="text"
          name="name"
          className="modal__input modal__input_type_card-name"
          id="clothing-name"
          placeholder="Name"
          required
          minLength="1"
          maxLength="30"
        />
      </label>

      <label htmlFor="imageUrl" className="modal__label">
        Image URL
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          required // Add this!
        />
      </label>
      <fieldset className="modal__radio-button">
        <legend className="modal__label">Select the weather type:</legend>
        <label className="modal__label_type_radio">
          <input
            className="modal__input_type_radio"
            type="radio"
            name="weather"
            value="hot"
            required // Add this to ONE radio button
          />
          Hot
        </label>
        <label className="modal__label_type_radio">
          <input
            className="modal__input_type_radio"
            type="radio"
            name="weather"
            value="warm"
          />
          Warm
        </label>
        <label className="modal__label_type_radio">
          <input
            className="modal__input_type_radio"
            type="radio"
            name="weather"
            value="cold"
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
