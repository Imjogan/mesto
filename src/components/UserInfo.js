// Создаем класс управления отображением информации о пользователе
export default class UserInfo {
  // в конструктор принимаем объект с селекторами двух элементов:
  // элемента имени пользователя и элемента информации о себе
	constructor({profileName, profileStatus, profileAvatar}) {
		this._profileName = document.querySelector(profileName);
		this._profileStatus = document.querySelector(profileStatus);
    this._profileAvatar = document.querySelector(profileAvatar);
	}

  // метод возвращает объект с данными пользователя
  getUserInfo() {
    return { 
              name: this._profileName.textContent,
              status: this._profileStatus.textContent
            };
  }

  // метод принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(user) {
    this._profileName.textContent = user.name;
    this._profileStatus.textContent = user.about;
    this._profileAvatar.src = user.avatar;
    this._user = user;
  }

  getUser() {
    return this._user;
  }
}