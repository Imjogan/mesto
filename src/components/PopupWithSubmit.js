import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    // колбэк сабмита формы
    this._popup = document.querySelector(popupSelector);
    this._buttonSubmit = this._popup.querySelector('.form__button_section_delete-confirm');
  }

  // слушатель клика
  setEventListeners() {
    super.setEventListeners(); // вызываем родительский метод
    // обработчик сабмита
    this._buttonSubmit.addEventListener('click', () => {
      this._handleFormSubmit();
    });
  }

  method(func) {
    this._handleFormSubmit = func;
  }
}