import { Popup } from './Popup.js'

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super (popupSelector)
    this._PopupWithImage = document.querySelector(popupSelector)
    this._largeImageCaption = document.querySelector('.popup__caption');
    this._largeImage = document.querySelector('.popup__image');
  }

  open = (link, name) => {
    this._largeImageCaption.textContent = name;
    this._largeImage.alt = name;
    this._largeImage.src =  link;

    super.open()
  }
}
