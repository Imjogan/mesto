import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, imageZoomPopapElement, titleZoomPopupElement) {
    super(popupSelector);
    this._imagePopup = imageZoomPopapElement;
    this._titlePopup = titleZoomPopupElement;
  }

    // метод для открытия попапа
  open(name, link) {
    super.open(); // вызываем родительский метод
    // дополним новой функциональностью:
    this._imagePopup.src = link;
    this._imagePopup.alt = link;
    this._titlePopup.textContent = name;
  }
}