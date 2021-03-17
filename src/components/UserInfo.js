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
  setUserInfo(name, status, avatar = 'https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg') {
    this._profileName.textContent = name;
    this._profileStatus.textContent = status;
    this._profileAvatar.src = avatar;
  }
}