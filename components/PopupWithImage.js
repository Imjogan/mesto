import Popup from './Popup.js';
import { popupImage, popupTitleZoomImage } from '../pages/index.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, name, link) {
    super(popupSelector);
    this._name = name;
    this._link = link;
  }

    // метод для открытия попапа
  open() {
    super.open(); // вызываем родительский метод
    // дополним новой функциональностью:
    popupImage.src = this._link;
    popupImage.alt = this._name;
    popupTitleZoomImage.textContent = this._name;
  }

  // метод для закрытия попапа
  close() {
    super.close(); // вызываем родительский метод
  }

  // метод зыкрытия попапа на Esc
  _handleEscClose() {
    super._handleEscClose(); // вызываем родительский метод
  }

  // слушатель клика иконке закрытия попапа
  setEventListeners() {
    super.setEventListeners(); // вызываем родительский метод
  }
}