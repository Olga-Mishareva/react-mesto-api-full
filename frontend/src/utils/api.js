class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _getResponseData(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include', 
    })
    .then(res => {
      return this._getResponseData(res);
    });
  }

  editUserData({ data }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: data.username,
        about: data.about
      })
    })
    .then(res => {
      return this._getResponseData(res);
    });
  }

  editUserAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
    .then(res => {
      return this._getResponseData(res);
    });
  }

  // ========================================================

  getUsersCards() {
    return fetch(`${this._baseUrl}/cards`, {
      credentials: 'include',
    })
    .then(res => {
      return this._getResponseData(res);
    });
  }

  addNewCard({ elem }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: elem.place,
        link: elem.img
      })
    })
    .then(res => {
      return this._getResponseData(res);
    });
  }

  deleteUserCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      credentials: 'include',
    })
    .then(res => {
      return this._getResponseData(res);
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
      credentials: 'include',
    })
    .then(res => {
      return this._getResponseData(res);
    });
  }
}

const api = new Api({
  baseUrl: 'https://api.mesto.om.nomoredomains.xyz',
  // baseUrl: 'http://localhost:3000',
  headers: { 'Content-Type': 'application/json' }
});

export default api;
