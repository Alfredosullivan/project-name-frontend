import NewsCard from '../NewsCard/NewsCard';
import './Results.css';

function Results() {
  return (
    <section className="results">
      <h2 className="results__title">Resultados de la búsqueda</h2>

      <div className="results__cards">
        <NewsCard />
        <NewsCard />
        <NewsCard />
      </div>

      <button className="results__button">Ver más</button>
    </section>
  );
}

export default Results;
