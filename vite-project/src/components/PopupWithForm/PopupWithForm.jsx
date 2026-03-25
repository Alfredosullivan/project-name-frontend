import './PopupWithForm.css';

function PopupWithForm({
  isOpen,
  onClose,
  title,
  onSubmit,
  children
}) {
  // No renderizar si está cerrado
  if (!isOpen) return null;

  function handleSubmit(e) {
    e.preventDefault();
    if (onSubmit) onSubmit(e);
  }

  return (
    <div className="popup">
      <div className="popup__overlay" onClick={onClose} />

      <div
        className="popup__container"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
        />

        {title && (
          <h2 className="popup__title">{title}</h2>
        )}

        <form className="popup__form" onSubmit={handleSubmit}>
          {children}
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
