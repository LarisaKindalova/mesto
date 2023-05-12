
import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor (popupSelector) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector('.popup__form');
  }

  setSubmitAction (action) {
    this._functionSubmit = action;
    }


  setEventListeners() {
    super.setEventListeners()
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._functionSubmit();
    })
  }
}
