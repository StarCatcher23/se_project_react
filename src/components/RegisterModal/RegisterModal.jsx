import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect } from "react";

const RegisterModal = ({ isOpen, onRegister, onClose, isLoading }) => {
  const defaultValues = {
    name: "",
    avatar: "",
    email: "",
    password: "",
  };

  const { values, handleChange, errors, resetForm, isValid } =
    useFormWithValidation(defaultValues);

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    if (isValid) {
      onRegister({
        name: values.name,
        avatar: values.avatar,
        email: values.email,
        password: values.password,
      });
    }
  }

  return (
    <ModalWithForm
      title="Sign Up"
      name="register"
      buttonText={isLoading ? "Signing up..." : "Sign Up"}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      footerText="or Log In"
    >
      <label className="modal__label">
        Email
        <input
          type="email"
          name="email"
          className={`modal__input ${errors.email ? "modal__input_invalid" : ""}`}
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          required
        />
        {errors.email && <span className="modal__error">{errors.email}</span>}
      </label>

      <label className="modal__label">
        Password
        <input
          type="password"
          name="password"
          className={`modal__input ${errors.password ? "modal__input_invalid" : ""}`}
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          required
        />
        {errors.password && (
          <span className="modal__error">{errors.password}</span>
        )}
      </label>
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
        Avatar URL
        <input
          type="url"
          name="avatar"
          className={`modal__input ${errors.avatar ? "modal__input_invalid" : ""}`}
          placeholder="Avatar URL"
          value={values.avatar}
          onChange={handleChange}
          required
        />
        {errors.avatar && <span className="modal__error">{errors.avatar}</span>}
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;
