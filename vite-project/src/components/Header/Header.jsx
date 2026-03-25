import { NavLink, useLocation } from 'react-router-dom';
import Navigation from './Navigation/Navigation';
import './Header.css';

function Header({ onLoginClick, onLogout, isLoggedIn, currentUser }) {
  const location = useLocation();
  const isSavedNews = location.pathname === '/saved-news';

  return (
    <header className={`header ${isSavedNews ? 'header_theme_light' : ''}`}>
      <div className="header__content">
        <NavLink
          to="/"
          className={`header__logo ${
            isSavedNews ? 'header__logo_dark' : ''
          }`}
        >
          NewsExplorer
        </NavLink>

        <Navigation
          onLoginClick={onLoginClick}
          onLogout={onLogout}
          isLoggedIn={isLoggedIn}
          isSavedNews={isSavedNews}
          currentUser={currentUser}
        />
      </div>
    </header>
  );
}

export default Header;