import './SavedNewsHeader.css';

function SavedNewsHeader({ count, keywords, currentUser }) {
  return (
    <section className="saved-news-header">
      <p className="saved-news-header__subtitle">
        Artículos guardados
      </p>

      <h1 className="saved-news-header__title">
        {currentUser?.name || 'Usuario'}, tienes {count} artículos guardados
      </h1>

      <p className="saved-news-header__keywords">
        Por palabras clave: <span>{keywords || 'ninguna'}</span>
      </p>
    </section>
  );
}

export default SavedNewsHeader;