import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Header from '../Header/Header';
import Main from './Main/Main';
import About from '../About/About';
import Footer from '../Footer/Footer';
import SavedNews from '../SavedNews/SavedNews';
import LoginPopup from '../LoginPopup/LoginPopup';
import RegisterPopup from '../RegisterPopup/RegisterPopup';
import InfoPopup from '../InfoPopup/InfoPopup';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import { login, register, getUserInfo } from '../../utils/MainApi';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getUserInfo()
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
        })
        .catch(() => {
          localStorage.removeItem('token');
        });
    }
  }, []);

  useEffect(() => {
    function handleEscClose(e) {
      if (e.key === 'Escape') closeAllPopups();
    }
    document.addEventListener('keydown', handleEscClose);
    return () => document.removeEventListener('keydown', handleEscClose);
  }, []);

  function openLoginPopup() {
    setIsLoginOpen(true);
    setIsRegisterOpen(false);
    setIsInfoOpen(false);
  }

  function openRegisterPopup() {
    setIsRegisterOpen(true);
    setIsLoginOpen(false);
    setIsInfoOpen(false);
  }

  function openInfoPopup() {
    setIsInfoOpen(true);
    setIsRegisterOpen(false);
  }

  function closeAllPopups() {
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
    setIsInfoOpen(false);
  }

  function handleLogin({ email, password }) {
    return login({ email, password })
      .then(({ token }) => {
        localStorage.setItem('token', token);
        return getUserInfo();
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        closeAllPopups();
      });
  }

  function handleRegister({ email, password, name }) {
    return register({ email, password, name }).then(() => {
      openInfoPopup();
    });
  }

  function handleLogout() {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setCurrentUser(null);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        onLoginClick={openLoginPopup}
        onLogout={handleLogout}
      />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Main isLoggedIn={isLoggedIn} />
              <About />
            </>
          }
        />
        <Route
  path="/saved-news"
  element={
    <ProtectedRoute isLoggedIn={isLoggedIn}>
      <SavedNews currentUser={currentUser} />
    </ProtectedRoute>
  }
/>
      </Routes>

      <Footer />

      <LoginPopup
        isOpen={isLoginOpen}
        onClose={closeAllPopups}
        onLogin={handleLogin}
        onRegisterClick={openRegisterPopup}
      />

      <RegisterPopup
        isOpen={isRegisterOpen}
        onClose={closeAllPopups}
        onRegister={handleRegister}
        onLoginClick={openLoginPopup}
      />

      <InfoPopup
        isOpen={isInfoOpen}
        onClose={closeAllPopups}
        onLoginClick={openLoginPopup}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;