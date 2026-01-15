import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ isOpen, onAddItem, onClose }) => {
  const defaultValues = {
    name: "",
    imageUrl: "",
    weather: "",
  };
  const { values, handleChange } = useForm(defaultValues);

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddItem(values);
  }

  return (
    <ModalWithForm
      title="New garment"
      name="new-card"
      buttonText="Add garment"
      onSubmit={handleSubmit} // ← correct prop name
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
          value={values.name}
          onChange={handleChange}
        />
      </label>

      <label className="modal__label">
        Image
        <input
          type="url"
          name="imageUrl"
          id="clothing-imageUrl"
          className="modal__input modal__input_type_url"
          placeholder="Image URL"
          required // Add this!
          value={values.imageUrl}
          onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
            required // Add this to ONE radio button
          />
          Warm
        </label>
        <label className="modal__label_type_radio">
          <input
            className="modal__input_type_radio"
            type="radio"
            name="weather"
            value="cold"
            onChange={handleChange}
            required
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
