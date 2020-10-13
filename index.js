import galleryItems from "./gallery-items.js";

const refs = {
    galleryList: document.querySelector('.js-gallery'),
    box: document.querySelector(".js-lightbox"),
    imageWrap: document.querySelector(".lightbox__content"),
    modalImg: document.querySelector(".lightbox__image"),
    btn: document.querySelector("[data-action=close-lightbox]"),
}

galleryItems.forEach((element, index) => {
    const galleryItem = document.createElement("li");
    galleryItem.classList.add("gallery__item");

    const link = document.createElement("a");
    link.classList.add("gallery__link");
    link.href = element.original;

    const image = document.createElement("img");
    image.classList.add("gallery__image");
    image.src = element.preview;
    image.alt = element.description;
    image.dataset.source = element.original;
    image.dataset.index = index;

    link.appendChild(image);
    galleryItem.appendChild(link);

    refs.galleryList.appendChild(galleryItem);
});

refs.galleryList.addEventListener('click', openOverlay);
refs.btn.addEventListener("click", closeOverlay);
window.addEventListener("keydown", closeOverlayByEsc);

function openOverlay(event) {
    event.preventDefault();
    refs.box.classList.add("is-open");
    const modalLink = event.target.dataset.source;
    refs.modalImg.src = modalLink;
    refs.box.addEventListener("click", closeOverlayByClick);
}

function closeOverlay() {
    refs.box.classList.remove("is-open");
    refs.modalImg.src = "";
}

function closeOverlayByClick(event) {
    if (event.target.nodeName !== "IMG") {
      closeOverlay();
      refs.box.removeEventListener("click", closeOverlayByClick);
    }
}

function closeOverlayByEsc(event) {
    if (event.code === "Escape") {
    closeOverlay();
  }
}