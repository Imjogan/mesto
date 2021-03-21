import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    // колбэк сабмита формы
    this._handleFormSubmit = handleFormSubmit;
    this._popup = document.querySelector(popupSelector);
    this._form = this._popup.querySelector('.form');
  }

  // метод для закрытия попапа
  close() {
    super.close(); // вызываем родительский метод
    this._form.reset();
  }

  // слушатель клика
  setEventListeners() {
    super.setEventListeners(); // вызываем родительский метод
    // обработчик сабмита
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  // собираем данные всех полей формы
  _getInputValues() {
    const inputArray = Array.from(this._form.querySelectorAll('.form__input'));

    const inputsValue = inputArray.map((item) => {
      return item.value;
    });

    return inputsValue;
  }
}
