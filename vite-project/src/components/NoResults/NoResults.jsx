import './NoResults.css';
import notFoundIcon from '../../images/not-found.svg';

function NoResults() {
  return (
    <div className="no-results">
      <img
        src={notFoundIcon}
        alt="No se encontraron resultados"
        className="no-results__image"
      />
      <h3 className="no-results__title">
        No se ha encontrado nada
      </h3>
      <p className="no-results__text">
        Lo sentimos, pero no hay nada que coincida con tus términos de búsqueda.
      </p>
    </div>
  );
}

export default NoResults;
