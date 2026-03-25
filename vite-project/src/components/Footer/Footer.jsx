import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">
        © 2025 NewsExplorer
      </p>

      <nav className="footer__nav">
  <ul className="footer__links">
    <li>
      <a href="/" className="footer__link">Inicio</a>
    </li>
    <li>
      <a
        href="https://github.com/Alfredosullivan"
        target="_blank"
        rel="noreferrer"
        className="footer__link"
      >
        GitHub
      </a>
    </li>
  </ul>
</nav>
    </footer>
  );
}

export default Footer;
