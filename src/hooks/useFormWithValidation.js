import { useState } from "react";

export function useFormWithValidation(defaultValues) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (formValues) => {
    const newErrors = {};

    // Validate name
    if (!formValues.name || formValues.name.trim() === "") {
      newErrors.name = "Name is required";
    }

    // Validate imageUrl
    if (!formValues.imageUrl || formValues.imageUrl.trim() === "") {
      newErrors.imageUrl = "Image URL is required";
    } else {
      try {
        new URL(formValues.imageUrl);
      } catch {
        newErrors.imageUrl = "Please enter a valid URL";
      }
    }

    // Validate weather
    if (!formValues.weather) {
      newErrors.weather = "Please select a weather type";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  function handleChange(evt) {
    const { name, value } = evt.target;
    const updatedValues = { ...values, [name]: value };
    setValues(updatedValues);
    validateForm(updatedValues);
  }

  const resetForm = () => {
    setValues(defaultValues);
    setErrors({});
    setIsValid(false);
    setIsSubmitted(false);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const isFormValid = () => validateForm(values);

  return {
    values,
    setValues,
    handleChange,
    errors,
    setErrors,
    isValid:
      Object.keys(errors).length === 0 &&
      Object.values(values).every((v) => v !== ""),
    resetForm,
    isFormValid,
    validateForm,
    isSubmitted,
    handleSubmit,
  };
}
