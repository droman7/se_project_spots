import "../pages/index.css";
import logoMain from "../images/logo.svg";
import pencilSrc from "../images/pencil.svg";
import plusSrc from "../images/plus.svg";
import {
  enableValidation,
  settings,
  resetValidation,
} from "../scripts/validation.js";

const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },

  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },

  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },

  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },

  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },

  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },

  // {
  //   name: "Golden Gate",
  //   link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  // },
];

const editModalBtn = document.querySelector(".profile__edit-btn");
const cardModalBtn = document.querySelector(".profile__add-btn");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const editModal = document.querySelector("#edit-modal");
const editFormElement = document.querySelector(".modal__form");
const editModalCloseBtn = editModal.querySelector(".modal__close-btn");
const editModalNameInput = editModal.querySelector("#profile-name-input");
const editModalDescriptionInput = editModal.querySelector(
  "#profile-description-input"
);

const cardModal = document.querySelector("#add-card-modal");
const cardForm = cardModal.querySelector(".modal__form");
const cardSubmitButton = cardModal.querySelector(".modal__submit-btn");
const cardModalCloseBtn = cardModal.querySelector(".modal__close-btn");
const cardNameInput = cardModal.querySelector("#add-card-name-input");
const cardLinkInput = cardModal.querySelector("#add-card-link-input");

const previewModal = document.querySelector("#preview-modal");
const previewModalImageEl = previewModal.querySelector(".modal__image");
const previewModalCaptionEl = previewModal.querySelector(".modal__caption");
const previewModalCloseBtn = previewModal.querySelector(
  ".modal__close-btn_type_preview"
);

const closeButtons = document.querySelectorAll(".modal__close-btn");

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

const logoImage = document.getElementById("image-logo");
logoImage.src = logoMain;

const pencilImage = document.getElementById("image-pencil");
pencilImage.src = pencilSrc;

const plusImage = document.getElementById("image-plus");
plusImage.src = plusSrc;

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editModalNameInput.value;
  profileDescription.textContent = editModalDescriptionInput.value;
  closeModal(editModal);
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const inputValues = { name: cardNameInput.value, link: cardLinkInput.value };
  renderCard(inputValues);
  cardForm.reset();
  disableButton(cardSubmitButton, settings);
  closeModal(cardModal);
}

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardNameEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardLikeBtn = cardElement.querySelector(".card__like-btn");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-btn");

  cardNameEl.textContent = data.name;
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;

  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("card__like-btn_liked");
  });

  cardImageEl.addEventListener("click", () => {
    openModal(previewModal);
    previewModalImageEl.src = data.link;
    previewModalCaptionEl.textContent = data.name;
    previewModalImageEl.alt = data.name;
  });

  cardDeleteBtn.addEventListener("click", () => {
    cardElement.remove();
  });

  return cardElement;
}

editModalBtn.addEventListener("click", () => {
  editModalNameInput.value = profileName.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;
  const inputList = Array.from(
    editFormElement.querySelectorAll(settings.inputSelector)
  );
  resetValidation(editFormElement, inputList, settings);
  openModal(editModal);
});

// Opens New Post Modal
cardModalBtn.addEventListener("click", () => {
  openModal(cardModal);
});

// Used reviwer suggestion to combine overlay and close buttons
const popups = document.querySelectorAll(".modal");

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("modal_opened")) {
      closeModal(popup);
    }
    if (evt.target.classList.contains("modal__close-btn")) {
      closeModal(popup);
    }
  });
});

//Closes when ESC key is pressed down
function closeOnEscPress(event) {
  if (event.key === "Escape") {
    const openModal = document.querySelector(".modal_opened");
    closeModal(openModal);
  }
}

// Opens modal and listens
// Tutor suggested keyup as opposed to keydown
// Removes any accidently key presses
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keyup", closeOnEscPress);
}

// Closes modal and removes listeners
function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keyup", closeOnEscPress);
}

editFormElement.addEventListener("submit", handleEditFormSubmit);
cardForm.addEventListener("submit", handleAddCardSubmit);

//Added universal add card function
function renderCard(item, method = "prepend") {
  const cardElement = getCardElement(item);
  cardsList[method](cardElement);
}

initialCards.forEach((item) => {
  renderCard(item, "append");
});

enableValidation(settings);
