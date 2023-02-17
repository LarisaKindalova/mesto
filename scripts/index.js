//popup
let popup = document.querySelector('.popup');

//кнопки редактирования
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
  openPopup(popup);
  popupInputUsername.value = profileUserName.textContent;
  popupInputJob.value = profileJob.textContent;
});

//функиця открытия popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
};

// закрыть popup
popupCloseButton.addEventListener('click', function(){
  popupClose(popup)
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
  popupClose(popup);
};

popupEditForm.addEventListener('submit', handleFormSubmit);
