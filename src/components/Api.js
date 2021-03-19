export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  // получаем информацию о карточках
  getInitialCards() {
    return fetch(this._baseUrl+'/cards', {
      method: 'GET',
      headers: this._headers
    }).then(res => res.json())
    .catch(error => {
      console.log(error);
    })
  }

  // получаем информацию о пользователе
  getUserInfo() {
    return fetch(this._baseUrl+'/users/me', {
      method: 'GET',
      headers: this._headers
    }).then(res => res.json())
    .catch(error => {
      console.log(error);
    })
  }

  // отправляем информацию о пользователе
  setUserInfo(name, status) {
    return fetch(this._baseUrl+'/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: status
      })
    }).then(res => res.json())
    .catch(error => {
      console.log(error);
    })
  }

  // создаем карточку
  createUserInfo(name, link) {
    return fetch(this._baseUrl+'/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    }).then(res => res.json())
    .catch(error => {
      console.log(error);
    })
  }
  
  // удаляем карточку
  deleteCard(cardID) {
    return fetch(this._baseUrl+'/cards/'+cardID, {
      method: 'DELETE',
      headers: this._headers
    }).then(res => res.json())
    .catch(error => {
      console.log(error);
    })
  }

  // ставим лайк на карточку
  setLike(cardID) {
    return fetch(this._baseUrl+'/cards/likes/'+cardID, {
      method: 'PUT',
      headers: this._headers
    }).then(res => res.json())
    .catch(error => {
      console.log(error);
    })
  }
}
