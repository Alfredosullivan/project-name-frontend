import { useState } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import useFormValidation from '../../hooks/useFormValidation';
import './LoginPopup.css';

function LoginPopup({ isOpen, onClose, onLogin, onRegisterClick }) {
  const { values, errors, isValid, handleChange, resetForm } = useFormValidation();
  const [submitError, setSubmitError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitError('');
    setIsLoading(true);

    onLogin({ email: values.email, password: values.password })
      .then(() => resetForm())
      .catch((err) => {
        setSubmitError(err.message || 'Error al iniciar sesión');
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Iniciar sesión"
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
        />
        {errors.password && (
          <span className="popup__field-error">{errors.password}</span>
        )}
      </label>

      {submitError && <p className="popup__error">{submitError}</p>}

      <button
        type="submit"
        className="popup__submit"
        disabled={!isValid || isLoading}
      >
        {isLoading ? 'Cargando...' : 'Iniciar sesión'}
      </button>

      <p className="popup__switch">
        ¿No tienes cuenta?{' '}
        <button type="button" className="popup__link" onClick={onRegisterClick}>
          Regístrate
        </button>
      </p>
    </PopupWithForm>
  );
}

export default LoginPopup;
