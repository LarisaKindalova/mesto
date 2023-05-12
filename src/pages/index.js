import "./index.css";
import {
  profileAvatarButton,
  profileEditButton,
  profileAddButton,
  inputUsername,
  inputJob,
  popupEditForm,
  popupAddForm,
  popupFormAvatar,
} from "../utils/constants.js";
import { validationConfig } from "../utils/constants.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";

let userId;

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-65",
  headers: {
    authorization: "42cd8cbf-e4e5-4d62-a54f-69f52c320e73",
    "Content-Type": "application/json",
  },
});

//создаем экземпляр класс секшн
const cardSection = new Section({
  renderer: (item) => {
    cardSection.addItem(createCard(item));
  },
  selector: ".cards__list",
});

const userInfo = new UserInfo({
  nameSelector: ".profile__username",
  jobSelector: ".profile__job",
  avatarSelector: ".profile__avatar",
});

// добавление новой карточки
function createCard(data) {
  const card = new Card({
      data: data,
      userId: userId,
      handleCardClick: () => {
        popupLargeImage.open(data);
      },
      handleLikeClick: (card) => {
        if (card.isLiked()) {
          api.removeLikeCardApi(card.cardId)
            .then((res) => {
              card.removeLike(res);
              card.likesCounter(res);
            })
            .catch((err) => {
              console.log(`Ошибка: ${err}`);
            });
        } else {
          api.setLikeCardApi(card.cardId)
            .then((res) => {
              card.setLike(res);
              card.likesCounter(res);
            })
            .catch((err) => {
              console.log(`Ошибка: ${err}`);
            });
        }
      },
      handleDeleteClick: (card) => {
        const submitConfirmForm =() => {
          api.deledeCard(card.cardId)
            .then((res) => {
              card.deleteCard(res)
              popupDeleteConfirm.close();
            })
            .catch((err) => console.log(`Ошибка: ${err}`))
        }
        popupDeleteConfirm.setSubmitAction(submitConfirmForm);
        popupDeleteConfirm.open();
      },
    },
    "#template-card"
  );
  const cardElement = card.generateCard();
  return cardElement;
}

Promise.all([api.getUserInfoApi(), api.getInitialCards()])
  .then(([user, card]) => {
    userId = user._id;
    userInfo.setUserInfo(user);
    cardSection.renderItems(card);
  })
  .catch((err) => console.log(`Ошибка: ${err}`));

const popupLargeImage = new PopupWithImage(".popup_type_large-img");
popupLargeImage.setEventListeners();

// экземлпяр класса добалвение каточки места
const popupAddCard = new PopupWithForm({
  popupSelector: ".popup_type_add-card",
  // handelSubmitForm: handelSubmitForm,
  handelSubmitForm: (data) => {
    popupAddCard.renderLoading(true);
    api.addNewCard(data)
      .then((res) => {
        cardSection.addItem(createCard(res));
        popupAddCard.close();
        popupAddForm.reset();
        validatorAddForm.resetFormValidation();
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(()=> {
        popupAddCard.renderLoading(false);
      })
 },
});
popupAddCard.setEventListeners();

//открытие формы добавить фото
profileAddButton.addEventListener("click", () => {
  popupAddCard.open();
});

const popupEditProfile = new PopupWithForm({
  popupSelector: ".popup_type_edit-profile",
  handelSubmitForm: (data) => {
    popupEditProfile.renderLoading(true);
    api.setUserInfoApi(data)
      .then((res) => {
        userInfo.setUserInfo(res);
        popupEditProfile.close();
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(()=> {
        popupEditProfile.renderLoading(false);
      })
  },
});
popupEditProfile.setEventListeners();

//открыть редактирование профиля
profileEditButton.addEventListener("click", () => {
  const currentInfo = userInfo.getUserInfo();
  inputUsername.value = currentInfo.name;
  inputJob.value = currentInfo.about;
  popupEditProfile.open();
});

// //попап аватара
const popupAvatar = new PopupWithForm({
  popupSelector: ".popup_type_avatar",
  handelSubmitForm: (data) => {
    popupAvatar.renderLoading(true);
    api.editNewAvatar(data)
      .then((res) => {
        userInfo.setUserInfo(res);
        popupAvatar.close();
        validatorAvatarForm.resetFormValidation();
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(()=>{
        popupAvatar.renderLoading(false);
      })
  },
});

popupAvatar.setEventListeners();

profileAvatarButton.addEventListener("click", () => {
  popupAvatar.open();
});

//попап удаления
const popupDeleteConfirm = new PopupWithConfirmation ('.popup_type_confirm');
popupDeleteConfirm.setEventListeners();

const validatorEditForm = new FormValidator(validationConfig, popupEditForm);
validatorEditForm.enableValidation();

const validatorAddForm = new FormValidator(validationConfig, popupAddForm);
validatorAddForm.enableValidation();

const validatorAvatarForm = new FormValidator(validationConfig, popupFormAvatar);
validatorAvatarForm.enableValidation();

