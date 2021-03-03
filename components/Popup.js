// Создаем класс попапа
export default class Popup {
  // в конструктор принимаем селектор попапа страницы
	constructor(popupSelector) {
    // селектор попапа
		this._popupSelector = popupSelector;
	}

  // метод для открытия попапа
  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', _handleEscClose);
  }

  // метод для закрытия попапа
  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', _handleEscClose);
  }

  // метод зыкрытия попапа на Esc
  _handleEscClose(evt) {
    if(evt.key === "Escape") {
      this.close();
    }
  }

  // слушатель клика иконке закрытия попапа
  setEventListeners() {
    this._popupSelector.querySelector('.popup__button-close').addEventListener('click', () => {
      this.close();
    });
  }
}