import { Popup } from './Popup.js'

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super (popupSelector)
    this._largeImageCaption = document.querySelector('.popup__caption');
    this._largeImage = document.querySelector('.popup__image');
  }

  open = (data) => {
    this._largeImage.src =  data.link;
    this._largeImageCaption.textContent = data.name;
    this._largeImage.alt = data.name;

    super.open()
  }
}
