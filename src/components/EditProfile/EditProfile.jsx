import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import { useContext, useEffect } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./EditProfile.css";

function EditProfileModal({ isOpen, onClose, onSubmit }) {
  const currentUser = useContext(CurrentUserContext);

  const { values, handleChange, errors, resetForm, isValid } =
    useFormWithValidation({
      name: "",
      avatar: "",
    });

  useEffect(() => {
    if (isOpen) {
      resetForm(
        {
          name: currentUser?.name || "",
          avatar: currentUser?.avatar || "",
        },
        {},
        true,
      );
    }
  }, [isOpen]); // ← ONLY depend on isOpen

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name: values.name,
      avatar: values.avatar,
    });
  };

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <button className="modal__close" onClick={onClose}></button>

        <h2 className="modal__title">Edit Profile</h2>

        <form className="modal__form" onSubmit={handleSubmit}>
          <label className="modal__label">
            Name
            <input
              type="text"
              name="name"
              className="modal__input"
              value={values.name || ""}
              onChange={handleChange}
              required
            />
            <span className="modal__error">{errors.name}</span>
          </label>

          <label className="modal__label">
            Avatar URL
            <input
              type="url"
              name="avatar"
              className="modal__input"
              value={values.avatar || ""}
              onChange={handleChange}
              required
            />
            <span className="modal__error">{errors.avatar}</span>
          </label>

          <button
            type="submit"
            className="modal__submit-btn"
            disabled={!isValid}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfileModal;
