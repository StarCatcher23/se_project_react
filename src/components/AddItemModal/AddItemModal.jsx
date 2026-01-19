import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect } from "react";

const AddItemModal = ({ isOpen, onAddItem, onClose, isLoading }) => {
  const defaultValues = {
    name: "",
    imageUrl: "",
    weather: "",
  };

  const {
    values,
    handleChange,
    errors,
    resetForm,
    isFormValid,
    isSubmitted,
    handleSubmit: handleValidationSubmit,
  } = useFormWithValidation(defaultValues);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    handleValidationSubmit();
    if (isFormValid()) {
      onAddItem(values);
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
        {errors.weather && (
          <span className="modal__error">{errors.weather}</span>
        )}
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
