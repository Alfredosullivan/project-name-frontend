import './NewsCard.css';

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function NewsCard({ article, isLoggedIn, isSaved, isSavedPage, onSave, onDelete }) {
  const {
    title,
    description,
    text,
    publishedAt,
    date,
    source,
    urlToImage,
    image,
    keyword,
  } = article;

  function handleClick() {
    if (isSavedPage) {
      onDelete();
    } else {
      if (!isLoggedIn) return;
      if (isSaved) {
        onDelete();
      } else {
        onSave();
      }
    }
  }

  return (
    <article className="news-card">

      {/* Palabra clave — solo en página de guardados */}
      {isSavedPage && keyword && (
        <span className="news-card__keyword">{keyword}</span>
      )}

      <button
        type="button"
        className={`news-card__button ${
          isSavedPage
            ? 'news-card__button_type_delete'
            : isSaved
            ? 'news-card__button_type_active'
            : 'news-card__button_type_save'
        }`}
        aria-label={isSavedPage ? 'Eliminar artículo' : isSaved ? 'Eliminar artículo' : 'Guardar artículo'}
        onClick={handleClick}
      />

      {!isLoggedIn && !isSavedPage && (
        <span className="news-card__tooltip">
          Inicia sesión para guardar artículos
        </span>
      )}

      <img
        src={urlToImage || image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c'}
        alt={title}
        className="news-card__image"
      />

      <div className="news-card__content">
        <p className="news-card__date">
          {formatDate(publishedAt || date)}
        </p>
        <h3 className="news-card__title">{title}</h3>
        <p className="news-card__text">{description || text}</p>
        <p className="news-card__source">{source?.name || source}</p>
      </div>
    </article>
  );
}

export default NewsCard;