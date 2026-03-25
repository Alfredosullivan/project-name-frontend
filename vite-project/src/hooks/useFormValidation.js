import { useState, useCallback } from 'react';

function useFormValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value, validationMessage, form } = e.target;

    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validationMessage }));
    setIsValid(form ? form.checkValidity() : false);
  }, []);

  const resetForm = useCallback(() => {
    setValues({});
    setErrors({});
    setIsValid(false);
  }, []);

  return { values, errors, isValid, handleChange, resetForm };
}

export default useFormValidation;