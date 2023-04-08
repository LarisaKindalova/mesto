export class Card {
  constructor (data, templateSelector, openPopupLargeImage) {
    this._link = data.link;
    this._name = data.name;
    this._templateSelector = templateSelector;
    this._openPopupLargeImage = openPopupLargeImage;
  }

  _getTemplate () {
    const cardElement = document
    .querySelector( this._templateSelector)
    .content.querySelector('.cards__item')
    .cloneNode(true);

    return cardElement;
  }

  generateCard () {
    this._element = this._getTemplate();
    this._cardsTitle = this._element.querySelector('.cards__title');
    this._cardsPhoto = this._element.querySelector('.cards__photo');
    this._likeButton = this._element.querySelector('.cards__like');
    this._trashButton = this._element.querySelector('.cards__trash-btn');

    this._cardsTitle.textContent = this._name;
    this._cardsPhoto.alt = this._name;
    this._cardsPhoto.src = this._link;
    this._setEventListeners()
    return this._element;
  }
  _setEventListeners() {
    this._cardsPhoto.addEventListener('click', ()=> {
      this._openLargeImage(this._data);
     });

    // лайк
    this._likeButton.addEventListener('click', () => {
      this._toggleLikeButton()
    });

  // удалить карточку
    this._trashButton.addEventListener('click', () => {
    this._removeCardButton()
  });
}
  _openLargeImage() {
    this._openPopupLargeImage(this._data)
  };

  _toggleLikeButton() {
    this._likeButton.classList.toggle('cards__like_active');
  };

  _removeCardButton() {
    this._element.remove()
  };
}


