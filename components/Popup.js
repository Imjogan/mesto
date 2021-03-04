// Создаем класс попапа
export default class Popup {
  // в конструктор принимаем селектор попапа страницы
	constructor(popupSelector) {
    // селектор попапа
		this._popupSelector = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._popup = document.querySelector(popupSelector);
	}

  // метод зыкрытия попапа на Esc
  _handleEscClose(evt) {
    if(evt.key === "Escape") {
      this.close();
    }
  }

  // метод для открытия попапа
  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  // метод для закрытия попапа
  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  // слушатели
  setEventListeners() {
    // закрытие popup на крестик
    this._popupSelector.querySelector('.popup__button-close').addEventListener('click', () => {
      this.close();
    });
    // закрытие popup на overlay
    this._popup.addEventListener('click', (evt) => {
      if (evt.target === this._popup) {
        this.close();
      }
    });
  }
}