const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//popup
const popups = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupLargeImage = document.querySelector('.popup_type_large-img');


//кнопки
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

// кнопка закрыть
const popupCloseButtons = document.querySelectorAll('.popup__close-button');

//форма редактирования
const popupEditForm = document.querySelector('.popup__form_edit');

//поля формы редактирования
const popupInputUsername = document.querySelector('.popup__input_value_username');
const popupInputJob = document.querySelector('.popup__input_value_job');

//редкатировать профиль
const profileUserName = document.querySelector('.profile__username');
const profileJob = document.querySelector('.profile__job');

//поля формы добавить фото
const InputCardName = document.querySelector('.popup__input_value_card-name');
const InputCardLink = document.querySelector('.popup__input_value_card-link');
console.log(InputCardLink);
//данные большего изображения
const LargeImage = document.querySelector('.popup__image');
const LargeImageCaption = document.querySelector('.popup__caption');

//шаблон карточки
const template = document.querySelector('#template-card').content;
const cardsItem = document.querySelector('.cards__item');
const cardList = document.querySelector('.cards__list');

//открыть редактирование профиля
profileEditButton.addEventListener('click', function() {
  openPopup(popupEditProfile);
  popupInputUsername.value = profileUserName.textContent;
  popupInputJob.value = profileJob.textContent;
});

//открытие формы добавить фото
profileAddButton.addEventListener('click', function() {
  openPopup(popupAddCard);
});

//функиця открытия popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
};

// закрыть popup
popupCloseButtons.forEach ((button) => {
  const closeButton = button.closest('.popup');
  button.addEventListener('click', () => {
    closePopup(closeButton)
    });
  });

// функция закрытия popup
function closePopup (popup) {
  popup.classList.remove('popup_opened');
};

//функция submit закрытие профиля
function handleFormSubmit (evt) {
  evt.preventDefault();
  profileUserName.textContent = popupInputUsername.value;
  profileJob.textContent = popupInputJob.value;
  closePopup(popupEditProfile);
};

popupEditForm.addEventListener('submit', handleFormSubmit);

//template
function createCard (data) {
  const templateCard = template.cloneNode(true);
  const cardsPhoto = templateCard.querySelector('.cards__photo');
  const trashButton = templateCard.querySelector('.cards__trash-btn');
  const cardsTitle = templateCard.querySelector('.cards__title');
  const likeButton = templateCard.querySelector('.cards__like');

  cardsTitle.textContent = data.name;
  cardsPhoto.src = data.link;
  cardsPhoto.alt = data.name;

//открыть большое изображение
cardsPhoto.addEventListener('click', function(){
  openPopup(popupLargeImage);
  LargeImageCaption.textContent = data.name;
  LargeImage.alt = data.name;
  LargeImage.src = data.link;
});

// лайк
likeButton.addEventListener('click', function (evt) {
  evt.target.classList.toggle('cards__like_active');
 });

//удалить карточку
trashButton.addEventListener('click', function (evt) {
  evt.target.closest('.cards__item').remove();
});

return templateCard;
};

function renderCard (templateCard) {
  cardList.prepend(createCard(templateCard));
};


initialCards.forEach(templateCard => { renderCard(templateCard); });

//submit формы
function handleAddFormSubmit (evt) {
  evt.preventDefault();
  renderCard ({
    name: InputCardName.value,
    link: InputCardLink.value,
  });
  closePopup(popupAddCard);
};

popupAddCard.addEventListener('submit', handleAddFormSubmit);
