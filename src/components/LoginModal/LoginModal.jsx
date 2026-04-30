import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect } from "react";

const LoginModal = ({ isOpen, onLogin, onClose, isLoading }) => {
  const defaultValues = {
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
      onLogin({
        email: values.email,
        password: values.password,
      });
    }
  }

  return (
    <ModalWithForm
      title="Log In"
      name="login"
      buttonText={isLoading ? "Logging in..." : "Log In"}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
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
    </ModalWithForm>
  );
};

export default LoginModal;
