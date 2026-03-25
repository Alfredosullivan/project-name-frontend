import './Preloader.css';

function Preloader() {
  return (
    <section className="preloader" aria-label="Cargando">
      <i className="preloader__spinner"></i>
      <p className="preloader__text">Buscando noticias...</p>
    </section>
  );
}

export default Preloader;
