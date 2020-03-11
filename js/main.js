import galleryItems from "./gallery-items.js";

const galleryRef = document.querySelector(".js-gallery");
const lightBox = document.querySelector(".js-lightbox");
const imageRef = document.querySelector(".lightbox__image");
const contentRef = document.querySelector(".lightbox__content");

galleryRef.addEventListener("click", openModal);
lightBox.addEventListener("click", onModalClick);

const addGalleryImage = array => {
  const gallery = [];
  array.forEach((unit, i) => {
    const list = document.createElement("li");
    const link = document.createElement("a");
    const image = document.createElement("img");

    list.classList.add("gallery__item");
    link.classList.add("galery__link");
    image.classList.add("gallery__image");

    image.setAttribute("index", 1 + i);
    image.setAttribute("src", unit.preview);
    image.setAttribute("data-source", unit.original);
    image.setAttribute("alt", unit.description);

    link.appendChild(image);
    list.appendChild(link);

    gallery.push(list);
  });
  galleryRef.append(...gallery);
};

addGalleryImage(galleryItems);

function openModal(event) {
  event.preventDefault();

  if (event.target.nodeName !== "IMG") {
    return;
  }
  const imageSource = event.target.dataset.source;
  imageRef.setAttribute("src", imageSource);
  lightBox.classList.add("is-open");
  window.addEventListener("keydown", onPressEscape);
}

function clotheModal() {
  imageRef.setAttribute("src", "");
  lightBox.classList.remove("is-open");
  window.removeEventListener("keydown", onPressEscape);
}

function onModalClick(event) {
  if (event.target.nodeName === "BUTTON" || event.target === contentRef) {
    clotheModal();
    return;
  }
}

function onPressEscape(event) {
  if (event.code === "Escape") {
    clotheModal();
  }
}

// console.log(galleryItems);
// console.log(galleryRef);
