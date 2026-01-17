import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ isOpen, onAddItem, onClose, isLoading }) => {
  const defaultValues = {
    name: "",
    imageUrl: "",
    weather: "",
  };

  const { values, handleChange } = useForm(defaultValues);

  function handleSubmit(e) {
    e.preventDefault();
    onAddItem(values);
  }

  return (
    <ModalWithForm
      title="New garment"
      name="new-card"
      buttonText={isLoading ? "Saving..." : "Add garment"}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
    >
      <label className="modal__label">
        Name
        <input
          type="text"
          name="name"
          className="modal__input"
          placeholder="Name"
          required
          value={values.name}
          onChange={handleChange}
        />
      </label>

      <label className="modal__label">
        Image URL
        <input
          type="url"
          name="imageUrl"
          className="modal__input"
          placeholder="Image URL"
          required
          value={values.imageUrl}
          onChange={handleChange}
        />
      </label>

      <fieldset className="modal__radio-button">
        <legend className="modal__label">Select the weather type:</legend>

        <label className="modal__label_type_radio">
          <input
            type="radio"
            name="weather"
            value="hot"
            onChange={handleChange}
            required
          />
          Hot
        </label>

        <label className="modal__label_type_radio">
          <input
            type="radio"
            name="weather"
            value="warm"
            onChange={handleChange}
          />
          Warm
        </label>

        <label className="modal__label_type_radio">
          <input
            type="radio"
            name="weather"
            value="cold"
            onChange={handleChange}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
