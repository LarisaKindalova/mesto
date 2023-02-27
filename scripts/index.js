//popup
const popup = document.querySelector('.popup');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCard = document.querySelector('.popup_type_add-card');

//кнопки
const profileEditButton = document.querySelector('.profile__edit-button');
const
profileAddButton = document.querySelector('.profile__add-button');
// кнопка закрыть
const popupCloseButton = document.querySelector('.popup__close-button');

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
popupCloseButton.addEventListener('click', function(){
  popupClose()
});

// функция закрытия popup
function popupClose (popup) {
  popup.classList.remove('popup_opened');
};

//функция submit закрытие профиля
function handleFormSubmit (evt) {
  evt.preventDefault();
  profileUserName.textContent = popupInputUsername.value;
  profileJob.textContent = popupInputJob.value;
  popupClose(popupEditProfile);
};

popupEditForm.addEventListener('submit', handleFormSubmit);
