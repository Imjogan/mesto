import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    // колбэк сабмита формы
    this._handleFormSubmit = handleFormSubmit;
    this._popup = document.querySelector(popupSelector);
    this._form = this._popup.querySelector('.form');
  }

    // метод для открытия попапа
  open() {
    super.open(); // вызываем родительский метод
  }

  // метод для закрытия попапа
  close() {
    super.close(); // вызываем родительский метод
    this._form.reset();
  }

  // // метод зыкрытия попапа на Esc
  // _handleEscClose(evt) {
  //   super._handleEscClose(evt); // вызываем родительский метод
  // }

  // слушатель клика
  setEventListeners() {
    super.setEventListeners(); // вызываем родительский метод
    // добавляем функционал
    // обработчик сабмита
    this._form.addEventListener('submit', () => {
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }

  // собираем данные всех полей формы
  _getInputValues() {
    const inputArray = Array.from(this._form.querySelectorAll('.form__input'));

    const inputsValue = inputArray.map((item) => {
      return item.value;
    });
    console.log(inputsValue);
    return inputsValue;
  }
}