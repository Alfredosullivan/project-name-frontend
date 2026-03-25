import './Main.css';
import { useState, useEffect } from 'react';

import SearchForm from '../../SeachForm/SearchForm';
import Preloader from '../../Preloader/Preloader';
import NewsCardList from '../../NewsCardList/NewsCardList';
import NoResults from '../../NoResults/NoResults';

import { getNews } from '../../../utils/NewsApi';
import { saveArticle, deleteArticle } from '../../../utils/MainApi';

function Main({ isLoggedIn }) {
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [articles, setArticles] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);
  const [error, setError] = useState(false);
  const [lastQuery, setLastQuery] = useState('');

  useEffect(() => {
    const savedData = localStorage.getItem('articles');
    const savedHasSearched = localStorage.getItem('hasSearched');
    const savedQuery = localStorage.getItem('lastQuery');

    if (savedData) setArticles(JSON.parse(savedData));
    if (savedHasSearched) setHasSearched(true);
    if (savedQuery) setLastQuery(savedQuery);
  }, []);

  function handleSearch(query) {
    if (!query.trim()) return;

    setLastQuery(query);
    setHasSearched(true);
    setIsLoading(true);
    setError(false);

    localStorage.setItem('lastQuery', query);

    getNews(query)
      .then((data) => {
        const results = data.articles || [];
        setArticles(results);
        localStorage.setItem('articles', JSON.stringify(results));
        localStorage.setItem('hasSearched', 'true');
      })
      .catch(() => {
        setError(true);
        setArticles([]);
      })
      .finally(() => setIsLoading(false));
  }

  function handleSave(article) {
    const articleToSave = {
      keyword: lastQuery,
      title: article.title,
      text: article.description || article.content || 'Sin descripción',
      date: article.publishedAt,
      source: article.source?.name || article.source || 'Desconocido',
      link: article.url,
      image: article.urlToImage || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c',
    };

    saveArticle(articleToSave)
      .then((saved) => {
        setSavedArticles((prev) => [...prev, { ...article, _id: saved._id }]);
      })
      .catch((err) => console.error('Error al guardar:', err));
  }

  function handleDelete(articleId) {
    deleteArticle(articleId)
      .then(() => {
        setSavedArticles((prev) =>
          prev.filter((a) => a._id !== articleId)
        );
      })
      .catch((err) => console.error('Error al eliminar:', err));
  }

  function getSavedId(article) {
    const saved = savedArticles.find(
      (s) => s.title === article.title
    );
    return saved ? saved._id : null;
  }

  return (
    <main className="main">
      <section className="main__hero">
        <div className="main__overlay">
          <h1 className="main__title">
            ¿Qué está pasando en el mundo?
          </h1>
          <p className="main__subtitle">
            Encuentra las últimas noticias sobre cualquier tema y guárdalas en tu cuenta personal.
          </p>
          <SearchForm onSearch={handleSearch} />
        </div>
      </section>

      <section className="main__results">
        {isLoading && <Preloader />}

        {!isLoading && error && (
          <p className="main__error">
            Lo sentimos, algo ha salido mal durante la solicitud.
            Es posible que haya un problema de conexión o que el servidor no funcione.
            Por favor, inténtalo más tarde.
          </p>
        )}

        {!isLoading && hasSearched && !error && articles.length === 0 && (
          <NoResults />
        )}

        {!isLoading && articles.length > 0 && (
          <NewsCardList
            articles={articles}
            title="Resultados de la búsqueda"
            isLoggedIn={isLoggedIn}
            savedArticles={savedArticles}
            onSave={handleSave}
            onDelete={handleDelete}
            getSavedId={getSavedId}
          />
        )}
      </section>
    </main>
  );
}

export default Main;