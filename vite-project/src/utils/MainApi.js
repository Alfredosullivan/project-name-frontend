const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

function checkResponse(res) {
  return res.ok
    ? res.json()
    : res.json().then((err) => Promise.reject(err));
}

function getHeaders(withAuth = false) {
  const headers = { 'Content-Type': 'application/json' };
  if (withAuth) {
    const token = localStorage.getItem('token');
    if (token) headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

export function register({ email, password, name }) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ email, password, name }),
  }).then(checkResponse);
}

export function login({ email, password }) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
}

export function getUserInfo() {
  return fetch(`${BASE_URL}/users/me`, {
    headers: getHeaders(true),
  }).then(checkResponse);
}

export function getSavedArticles() {
  return fetch(`${BASE_URL}/articles`, {
    headers: getHeaders(true),
  }).then(checkResponse);
}

export function saveArticle(article) {
  return fetch(`${BASE_URL}/articles`, {
    method: 'POST',
    headers: getHeaders(true),
    body: JSON.stringify(article),
  }).then(checkResponse);
}

export function deleteArticle(articleId) {
  return fetch(`${BASE_URL}/articles/${articleId}`, {
    method: 'DELETE',
    headers: getHeaders(true),
  }).then(checkResponse);
}