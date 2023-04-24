import './index.css';
import { initialCards, profileEditButton, profileAddButton, inputUsername, inputJob, popupEditForm, popupAddForm } from '../utils/constants.js';
import { validationConfig } from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

const popupLargeImage = new PopupWithImage('.popup_type_large-img');
popupLargeImage.setEventListeners();

// добавление новой карточки
function createCard (item) {
  const card = new Card ({
    data:item,
    handleCardClick: (item) => {
      popupLargeImage.open(item.link, item.name)
    },
  },
  '#template-card');
  const cardElement = card.generateCard();
  return cardElement;
};

//создаем экземпляр класс секшн
const cardSection = new Section({
  items: initialCards,
  renderer: (item) => {
    cardSection.addItem(createCard(item ))
  },
},
  '.cards__list');

cardSection.renderItems(initialCards);


const userInfo = new UserInfo ({
  nameSelector: '.profile__username',
  jobSelector: '.profile__job',
});


// экземлпяр класса добалвение каточки места
const popupAddCard = new PopupWithForm({
  popupSelector:'.popup_type_add-card',
  handelSubmitForm: (data) => {
    cardSection.addItem(createCard(data))

    validatorAddForm.resetFormValidation();
    popupAddCard.close();
    popupAddForm.reset();
  }
})
popupAddCard.setEventListeners();

//открытие формы добавить фото
profileAddButton.addEventListener('click', () => {
  popupAddCard.open()
});


const popupEditProfile = new PopupWithForm ({
  popupSelector:'.popup_type_edit-profile',
  handelSubmitForm: (data) => {
    userInfo.setUserInfo(data);
    popupEditProfile.close()
  }
})
popupEditProfile.setEventListeners()

//открыть редактирование профиля
profileEditButton.addEventListener('click', () => {
  const currentInfo = userInfo.getUserInfo()
  inputUsername.value = currentInfo.userName;
  inputJob.value = currentInfo.userJob;
  popupEditProfile.open();
});

const validatorEditForm = new FormValidator(validationConfig, popupEditForm);
validatorEditForm.enableValidation();

const validatorAddForm = new FormValidator(validationConfig, popupAddForm);
validatorAddForm.enableValidation();


