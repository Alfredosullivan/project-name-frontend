import { useState, useEffect } from 'react';
import './SavedNews.css';

import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';
import { getSavedArticles, deleteArticle } from '../../utils/MainApi';

function SavedNews({ currentUser }) {
  const [savedArticles, setSavedArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSavedArticles()
      .then((articles) => {
        setSavedArticles(articles);
      })
      .catch((err) => console.error('Error al cargar artículos:', err))
      .finally(() => setIsLoading(false));
  }, []);

  function handleDelete(articleId) {
    deleteArticle(articleId)
      .then(() => {
        setSavedArticles((prev) =>
          prev.filter((article) => article._id !== articleId)
        );
      })
      .catch((err) => console.error('Error al eliminar artículo:', err));
  }

  // Calcular palabras clave ordenadas por popularidad
  function getKeywords(articles) {
    const count = {};
    articles.forEach((article) => {
      const kw = article.keyword;
      count[kw] = (count[kw] || 0) + 1;
    });

    const sorted = Object.entries(count)
      .sort((a, b) => b[1] - a[1])
      .map(([keyword]) => keyword);

    if (sorted.length <= 3) {
      return sorted.join(', ');
    }

    const remaining = sorted.length - 2;
    return `${sorted[0]}, ${sorted[1]} y ${remaining} más`;
  }

  return (
    <main className="saved-news">
      <SavedNewsHeader
        count={savedArticles.length}
        keywords={getKeywords(savedArticles)}
        currentUser={currentUser}
      />

      {isLoading ? (
        <p className="saved-news__loading">Cargando artículos...</p>
      ) : (
        <NewsCardList
          articles={savedArticles}
          title="Artículos guardados"
          isSavedPage={true}
          onDelete={handleDelete}
        />
      )}
    </main>
  );
}

export default SavedNews;
