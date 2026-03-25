import { useState } from 'react';
import './SearchForm.css';

function SearchForm({ onSearch }) {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    if (!query.trim()) {
      setError('Por favor, introduzca una palabra clave');
      return;
    }

    setError('');
    onSearch(query);
  }

  function handleChange(e) {
    setQuery(e.target.value);
    if (error) {
      setError('');
    }
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-form__input"
        placeholder="Introduce un tema"
        value={query}
        onChange={handleChange}
        required
      />

      {error && (
        <span className="search-form__error">
          {error}
        </span>
      )}

      <button
        className="search-form__button"
        type="submit"
      >
        Buscar
      </button>
    </form>
  );
}

export default SearchForm;
