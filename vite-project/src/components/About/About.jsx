import './About.css';
import avatar from '../../images/avatar.jpg';


function About() {
  return (
    <section className="about">
      <img
        src={avatar}
        alt="Foto del autor"
        className="about__image"
      />

      <div className="about__content">
        <h3 className="about__title">Acerca del autor</h3>
        <p className="about__text">
          Soy desarrollador Full Stack en formación, con experiencia en
          JavaScript, React y Node.js.
        </p>
      </div>
    </section>
  );
}

export default About;
