import { useState, useEffect } from 'react';
import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard';

const CARDS_TO_SHOW = 3;

function NewsCardList({
  articles,
  title,
  isLoggedIn,
  isSavedPage,
  onDelete,
  onSave,
  savedArticles = [],
  getSavedId,
}) {
  const [visibleCount, setVisibleCount] = useState(CARDS_TO_SHOW);

  useEffect(() => {
    setVisibleCount(CARDS_TO_SHOW);
  }, [articles]);

  function getArticleId(article) {
    return article._id || `${article.title}-${article.publishedAt}`;
  }

  function handleSave(article) {
    if (onSave) onSave(article);
  }

  function handleDelete(article) {
    if (isSavedPage && onDelete) {
      onDelete(article._id);
    } else if (onDelete && getSavedId) {
      const savedId = getSavedId(article);
      if (savedId) onDelete(savedId);
    }
  }

  function isArticleSaved(article) {
    if (isSavedPage) return true;
    if (getSavedId) return !!getSavedId(article);
    return false;
  }

  return (
    <section className="news-card-list">
      <h2 className="news-card-list__title">{title}</h2>

      <ul className="news-card-list__grid">
        {articles.slice(0, visibleCount).map((article) => (
          <li
            key={getArticleId(article)}
            className="news-card-list__item"
          >
            <NewsCard
              article={article}
              isLoggedIn={isLoggedIn}
              isSaved={isArticleSaved(article)}
              isSavedPage={isSavedPage}
              onSave={() => handleSave(article)}
              onDelete={() => handleDelete(article)}
            />
          </li>
        ))}
      </ul>

      {visibleCount < articles.length && (
        <button
          type="button"
          className="news-card-list__button"
          onClick={() => setVisibleCount((v) => v + CARDS_TO_SHOW)}
        >
          Mostrar más
        </button>
      )}
    </section>
  );
}

export default NewsCardList;