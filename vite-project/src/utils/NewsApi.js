const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = 'https://nomoreparties.co/news/v2/everything';

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

function getLastWeekDates() {
  const to = new Date();
  const from = new Date();
  from.setDate(to.getDate() - 7);

  return {
    from: from.toISOString().split('T')[0],
    to: to.toISOString().split('T')[0],
  };
}

export function getNews(keyword) {
  const { from, to } = getLastWeekDates();

  return fetch(
    `${BASE_URL}?q=${encodeURIComponent(keyword)}&from=${from}&to=${to}&pageSize=100&apiKey=${API_KEY}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  ).then(checkResponse);
}
