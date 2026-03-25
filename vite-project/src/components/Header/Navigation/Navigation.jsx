import { NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation({ isLoggedIn, onLoginClick, onLogout, isSavedNews, currentUser }) {
  return (
    <nav className={`navigation ${isSavedNews ? 'navigation_theme_light' : ''}`}>
      <ul className="navigation__list">

        {/* INICIO — siempre visible */}
        <li className="navigation__item">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `navigation__link ${
                isActive ? 'navigation__link_active' : ''
              } ${isSavedNews ? 'navigation__link_dark' : ''}`
            }
          >
            Inicio
          </NavLink>
        </li>

        {/* SOLO USUARIO LOGUEADO */}
        {isLoggedIn && (
          <li className="navigation__item">
            <NavLink
              to="/saved-news"
              className={({ isActive }) =>
                `navigation__link ${
                  isActive ? 'navigation__link_active' : ''
                } ${isSavedNews ? 'navigation__link_dark' : ''}`
              }
            >
              Artículos guardados
            </NavLink>
          </li>
        )}

        {/* BOTÓN LOGIN / LOGOUT */}
        <li className="navigation__item">
          {!isLoggedIn ? (
            <button
              type="button"
              className={`navigation__button ${
                isSavedNews ? 'navigation__button_dark' : ''
              }`}
              onClick={onLoginClick}
            >
              Iniciar sesión
            </button>
          ) : (
            <button
              type="button"
              className={`navigation__button navigation__button_logged ${
                isSavedNews ? 'navigation__button_dark' : ''
              }`}
              onClick={onLogout}
            >
              {currentUser?.name || 'Usuario'}
              <span className="navigation__logout-icon" />
            </button>
          )}
        </li>

      </ul>
    </nav>
  );
}

export default Navigation;