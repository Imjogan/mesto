import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    // колбэк сабмита формы
    this._popup = document.querySelector(popupSelector);
    this._form = this._popup.querySelector('.form');
  }

  // слушатель клика
  setEventListeners() {
    super.setEventListeners(); // вызываем родительский метод
    // обработчик сабмита
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    });
  }

  // создаем колбэк для сабмита из принимаемых данных
  createHandleSubmit(func) {
    this._handleFormSubmit = func;
  }
}
