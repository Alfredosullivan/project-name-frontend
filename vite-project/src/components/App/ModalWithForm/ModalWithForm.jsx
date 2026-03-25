import './ModalWithForm.css';

function ModalWithForm() {
  return (
    <div className="modal">
      <div className="modal__container">
        <button className="modal__close"></button>
        <h3 className="modal__title">Iniciar sesión</h3>

        <form className="modal__form">
          <label className="modal__label">
            Correo electrónico
            <input className="modal__input" type="email" />
          </label>

          <label className="modal__label">
            Contraseña
            <input className="modal__input" type="password" />
          </label>

          <button className="modal__submit">Iniciar sesión</button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
