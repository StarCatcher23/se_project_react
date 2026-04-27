import { useState } from "react";

export function useFormWithValidation(defaultValues = {}) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  function handleChange(evt) {
    const { name, value } = evt.target;

    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: evt.target.validationMessage }));
    setIsValid(evt.target.closest("form").checkValidity());
  }

  function resetForm() {
    setValues(defaultValues);
    setErrors({});
    setIsValid(false);
  }

  return { values, errors, isValid, handleChange, resetForm };
}
