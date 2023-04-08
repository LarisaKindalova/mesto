import { initialCards } from './constants.js';
import { validationConfig } from './constants.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

//popup
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupLargeImage = document.querySelector('.popup_type_large-img');

//кнопки
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

// кнопка закрыть
const popupCloseButtons = document.querySelectorAll('.popup__close-button');

//форма редактирования
const popupEditForm = document.forms['popup__edit-form'];


//поля формы редактирования
const popupInputUsername = document.querySelector('.popup__input_value_username');
const popupInputJob = document.querySelector('.popup__input_value_job');

//форма ADD
const popupFormAdd = document.querySelector('.popup__form_add');

//редкатировать профиль
const profileUserName = document.querySelector('.profile__username');
const profileJob = document.querySelector('.profile__job');

//поля формы добавить фото
const inputCardName = document.querySelector('.popup__input_value_card-name');
const inputCardLink = document.querySelector('.popup__input_value_card-link');

//данные большего изображения
const largeImage = document.querySelector('.popup__image');
const largeImageCaption = document.querySelector('.popup__caption');

//шаблон карточки
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
  document.addEventListener('keydown', closePopupEscape);
  popup.addEventListener('mousedown', closePopupOverlay);
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
  document.removeEventListener('keydown', closePopupEscape);
};

// функция закрытия по Esc
function closePopupEscape (evt)  {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup (popupOpened);
  };
}

// функция закрытия по Overlay
// currentTarget — указывает на элемент, на котором установлен обработчик события. В нашем случае открытый попап
function closePopupOverlay (evt) {
  if (evt.target === evt.currentTarget) {
    closePopup (evt.currentTarget);
  };
}

//функция submit закрытие профиля
function  submitEditProfileForm (evt) {
  evt.preventDefault();
  profileUserName.textContent = popupInputUsername.value;
  profileJob.textContent = popupInputJob.value;
  closePopup(popupEditProfile);
};

popupEditForm.addEventListener('submit', submitEditProfileForm);

  //открыть большое изображение
function openPopupLargeImage (data) {
  openPopup(popupLargeImage)
  largeImageCaption.textContent = data.name;
  largeImage.alt = data.name;
  largeImage.src = data.link;
};

function renderCard (data) {
  const card = new Card (data, '#template-card', openPopupLargeImage)
  const cardElement = card.generateCard();
  cardList.prepend(cardElement);
};

// initialCards.forEach(templateCard => {renderCard(templateCard);});
initialCards.forEach(renderCard);

//submit формы
function submitAddForm (evt) {
  evt.preventDefault();
  renderCard ({
    name: inputCardName.value,
    link: inputCardLink.value,
  });

  const cardFormSubmitButton = popupAddCard.querySelector('.popup__submit-button');
    validatorAddForm.resetFormValidation(cardFormSubmitButton, validatorAddForm);
    closePopup(popupAddCard);
    popupFormAdd.reset();
};

popupAddCard.addEventListener('submit', submitAddForm);

const validatorEditForm = new FormValidator(validationConfig, popupEditForm);
validatorEditForm.enableValidation();

const validatorAddForm = new FormValidator(validationConfig, popupFormAdd);
validatorAddForm.enableValidation();
