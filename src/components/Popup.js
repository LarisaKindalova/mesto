export class Popup {
  constructor (popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(popupSelector);
    this._popupSubmitButton = this._popup.querySelector('.popup__submit-button')
  }

  open () {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close ()  {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close()
    }
  };

  renderLoading (isLoading) {
    if(isLoading) {
      this.text = this._popupSubmitButton.textContent;
      this._popupSubmitButton.textContent = "Сохранение...";
    } else {
      this._popupSubmitButton.textContent = this.text;
    }
  }

  setEventListeners () {
    this._popup.addEventListener('mousedown', (evt) => {
      if ((evt.target.classList.contains('popup_opened')) || (evt.target.classList.contains('popup__close-button'))){
        this.close()
      };
    });
  }
}










