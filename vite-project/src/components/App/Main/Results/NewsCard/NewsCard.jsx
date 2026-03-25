import './NewsCard.css';

function NewsCard() {
  return (
    <article className="card">
      <img className="card__image" src="#" alt="Imagen noticia" />
      <div className="card__content">
        <p className="card__date">4 de noviembre de 2020</p>
        <h3 className="card__title">Título de la noticia</h3>
        <p className="card__text">Descripción breve de la noticia...</p>
        <p className="card__source">FUENTE</p>
      </div>
    </article>
  );
}

export default NewsCard;
