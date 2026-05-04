import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect } from "react";

const AddItemModal = ({ isOpen, handleAddItem, onClose, isLoading }) => {
  const defaultValues = {
    name: "",
    imageUrl: "",
    weather: "",
  };

  const { values, handleChange, errors, resetForm, isValid } =
    useFormWithValidation(defaultValues);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    if (isValid) {
      handleAddItem(values);
    }
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
          className={`modal__input ${errors.name ? "modal__input_invalid" : ""}`}
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          required
        />
        {errors.name && <span className="modal__error">{errors.name}</span>}
      </label>

      <label className="modal__label">
        Image URL
        <input
          type="text"
          name="imageUrl"
          className={`modal__input ${errors.imageUrl ? "modal__input_invalid" : ""}`}
          placeholder="Image URL"
          value={values.imageUrl}
          onChange={handleChange}
          required
        />
        {errors.imageUrl && (
          <span className="modal__error">{errors.imageUrl}</span>
        )}
      </label>

      <fieldset className="modal__radio-button">
        <legend className="modal__label">Select the weather type:</legend>

        <label className="modal__label_type_radio">
          <input
            type="radio"
            name="weather"
            value="hot"
            onChange={handleChange}
            checked={values.weather === "hot"}
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
            checked={values.weather === "warm"}
          />
          Warm
        </label>

        <label className="modal__label_type_radio">
          <input
            type="radio"
            name="weather"
            value="cold"
            onChange={handleChange}
            checked={values.weather === "cold"}
          />
          Cold
        </label>
        {errors.weather && (
          <span className="modal__error">{errors.weather}</span>
        )}
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
