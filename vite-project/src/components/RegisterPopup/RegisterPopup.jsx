import { useState } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import useFormValidation from '../../hooks/useFormValidation';
import './RegisterPopup.css';

function RegisterPopup({ isOpen, onClose, onRegister, onLoginClick }) {
  const { values, errors, isValid, handleChange, resetForm } = useFormValidation();
  const [submitError, setSubmitError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitError('');
    setIsLoading(true);

    onRegister({
      email: values.email,
      password: values.password,
      name: values.name,
    })
      .then(() => resetForm())
      .catch((err) => {
        setSubmitError(err.message || 'Error al registrarse');
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Registrarse"
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <span className="popup__label">Correo electrónico</span>
        <input
          type="email"
          name="email"
          className={`popup__input ${errors.email ? 'popup__input_error' : ''}`}
          placeholder="Introduce tu correo"
          value={values.email || ''}
          onChange={handleChange}
          required
        />
        {errors.email && (
          <span className="popup__field-error">{errors.email}</span>
        )}
      </label>

      <label className="popup__field">
        <span className="popup__label">Contraseña</span>
        <input
          type="password"
          name="password"
          className={`popup__input ${errors.password ? 'popup__input_error' : ''}`}
          placeholder="Introduce tu contraseña"
          value={values.password || ''}
          onChange={handleChange}
          required
          minLength={6}
        />
        {errors.password && (
          <span className="popup__field-error">{errors.password}</span>
        )}
      </label>

      <label className="popup__field">
        <span className="popup__label">Nombre</span>
        <input
          type="text"
          name="name"
          className={`popup__input ${errors.name ? 'popup__input_error' : ''}`}
          placeholder="Introduce tu nombre"
          value={values.name || ''}
          onChange={handleChange}
          required
          minLength={2}
          maxLength={30}
        />
        {errors.name && (
          <span className="popup__field-error">{errors.name}</span>
        )}
      </label>

      {submitError && <p className="popup__error">{submitError}</p>}

      <button
        type="submit"
        className="popup__submit"
        disabled={!isValid || isLoading}
      >
        {isLoading ? 'Cargando...' : 'Registrarse'}
      </button>

      <p className="popup__switch">
        ¿Ya tienes cuenta?{' '}
        <button type="button" className="popup__link" onClick={onLoginClick}>
          Inicia sesión
        </button>
      </p>
    </PopupWithForm>
  );
}

export default RegisterPopup;