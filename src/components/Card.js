export class Card {
  constructor(
    { data, userId, handleCardClick, handleLikeClick, handleDeleteClick },
    templateSelector
  ) {
    this._link = data.link;
    this._name = data.name;
    this._likes = data.likes;
    this._ownerId = data.owner._id;// id владельца
    this.cardId = data._id;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
    this._templateSelector = templateSelector;
    this._userId = userId; // id текущего пользователя
    console.log(this._userId);
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".cards__item")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardsTitle = this._element.querySelector(".cards__title");
    this._cardsPhoto = this._element.querySelector(".cards__photo");
    this._likeButton = this._element.querySelector(".cards__like");
    this._trashButton = this._element.querySelector(".cards__trash-btn");
    this._likeCounter = this._element.querySelector(".cards__like_counter");

    this._cardsTitle.textContent = this._name;
    this._cardsPhoto.alt = this._name;
    this._cardsPhoto.src = this._link;
    this._likeCounter.textContent = this._likes.length;

    // проверка пользователя, для отображения корзины
    if (this._userId !== this._ownerId) {
      this._trashButton.remove();
    }

    if (this.isLiked(this._likes)) {
      this._likeButton.classList.add("cards__like_active")
    }

    this._setEventListeners();
    return this._element;
  }

   //метод проверки есть ли лайка
  isLiked() {
    return this._likes.some((like) => like._id === this._userId)
  }

 //счетчик лайка
  likesCounter(data) {
    this._likeCounter.textContent = data.likes.length;
    this._likes = data.likes
  }

  setLike() {
    this._likeButton.classList.add("cards__like_active");
  }

  removeLike() {
    this._likeButton.classList.remove("cards__like_active");
  }

  deleteCard() {
    this._element.remove();
  }

  _setEventListeners() {
    this._cardsPhoto.addEventListener("click", () => {
      this._handleCardClick({
        link: this._link,
        name: this._name,
      });
    });

    // лайк
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this);
    });

    // удалить карточку
    this._trashButton.addEventListener("click", () => {
      console.log(this);
      this._handleDeleteClick(this);
    });
  }
}
