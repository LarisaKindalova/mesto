//popup
let popupEditProfile = document.querySelector('.popup_type_edit-profile');

//кнопки
let profileAddButton = document.querySelector('.profile__add-button');
let profileEditButton = document.querySelector('.profile__edit-button');

// кнопка закрыть
let popupCloseButton = document.querySelector('.popup__close-button');

//форма редактирования
let popupEditForm = document.querySelector('.popup__edit-form');

//поля формы редактирования
let popupInputUsername = document.querySelector('.popup__input_value_username');
let popupInputJob = document.querySelector('.popup__input_value_job');

//редкатировать профиль
let profileUserName = document.querySelector('.profile__username');
let profileJob = document.querySelector('.profile__job');

//открыть редактирование профиля
profileEditButton.addEventListener('click', function() {
  openPopup(popupEditProfile);
  popupInputUsername.value = profileUserName.textContent;
  popupInputJob.value = profileJob.textContent;
});

//функиця открытия popup
function openPopup(popup) {
  popupEditProfile.classList.add('popup_opened');
};

// закрыть popup
popupCloseButton.addEventListener('click', function(){
  popupClose(popupEditProfile)
});

// функция закрытия popup
function popupClose (popup) {
  popupEditProfile.classList.remove('popup_opened');
};

//функция submit закрытие профиля
function handleFormSubmit (evt) {
  evt.preventDefault();
  profileUserName.textContent = popupInputUsername.value;
  profileJob.textContent = popupInputJob.value;
  popupClose(popupEditProfile);
};

popupEditForm.addEventListener('submit', handleFormSubmit);
