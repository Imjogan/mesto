export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  // получаем информацию о карточках на сервере
  getInitialCards() {
    return fetch(this._baseUrl+'/cards', {
      method: 'GET',
      headers: this._headers
    }).then(res => res.json())
    .catch(error => {
      console.log(error);
    })
  }

  // получаем информацию о пользователе на сервере
  getUserInfo() {
    return fetch(this._baseUrl+'/users/me', {
      method: 'GET',
      headers: this._headers
    }).then(res => res.json())
    .catch(error => {
      console.log(error);
    })
  }

  // отправляем информацию о пользователе на сервер
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

  // создаем карточку на сервере
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
}
