import Popup from '../Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open() {
    super.open(); // вызываем родительский метод
    // дополним новой функциональностью:
    popupImage.src = this._link;
    popupImage.alt = this._name;
    popupTitleZoomImage.textContent = this._name;
  }
}