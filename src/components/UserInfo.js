// Создаем класс управления отображением информации о пользователе
export default class UserInfo {
  // в конструктор принимаем объект с селекторами двух элементов:
  // элемента имени пользователя и элемента информации о себе
	constructor({elementProfileName, elementProfileStatus}) {
		this._elementProfileName = document.querySelector(elementProfileName);
		this._elementProfileStatus = document.querySelector(elementProfileStatus);
	}

  // метод возвращает объект с данными пользователя
  getUserInfo() {
    return { 
              name: this._elementProfileName.textContent,
              status: this._elementProfileStatus.textContent
            };
  }

  // метод принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(name, status) {
    this._elementProfileName.textContent = name;
    this._elementProfileStatus.textContent = status;
  }
} 