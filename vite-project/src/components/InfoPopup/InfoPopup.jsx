import PopupWithForm from '../PopupWithForm/PopupWithForm';
import './InfoPopup.css';

function InfoPopup({ isOpen, onClose, onLoginClick }) {
  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="¡Registro completado!"
    >
      <p className="popup__message">
        ¡El registro se ha completado con éxito!
      </p>

      <button
        type="button"
        className="popup__link"
        onClick={onLoginClick}
      >
        Iniciar sesión
      </button>
    </PopupWithForm>
  );
}

export default InfoPopup;
