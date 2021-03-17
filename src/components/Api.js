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

  // получаем информацию о пользователе на сервере
  setUserInfo(name, status) {
    return fetch(this._baseUrl+'/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: status
      })
    }).catch(error => {
      console.log(error);
    })
  }
}
