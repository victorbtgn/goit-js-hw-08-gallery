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

    image.setAttribute("data-index", i);
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
  const imageIndex = event.target.dataset.index;

  imageRef.setAttribute("data-index", imageIndex);
  imageRef.setAttribute("src", imageSource);

  lightBox.classList.add("is-open");
  window.addEventListener("keydown", onPressKey);
}

function clotheModal() {
  imageRef.setAttribute("src", "");
  lightBox.classList.remove("is-open");
  window.removeEventListener("keydown", onPressKey);
}

function onModalClick(event) {
  if (event.target.nodeName === "BUTTON" || event.target === contentRef) {
    clotheModal();
    return;
  }
}

function onPressKey(event) {
  if (event.code === "Escape") {
    clotheModal();
  }

  if (event.code === "ArrowLeft") {
    onPreviewImage(imageRef.dataset.index);
  }

  if (event.code === "ArrowRight") {
    onNextImage(imageRef.dataset.index);
  }
}

function onPreviewImage(index) {
  if (index === "0") {
    console.log(`First image`);
    return;
  }
  index = Number(index) - 1;
  imageRef.src = galleryItems[index].original;
  imageRef.dataset.index = index;
}

function onNextImage(index) {
  if (Number(index) === galleryItems.length - 1) {
    console.log(`Last image`);
    return;
  }
  index = Number(index) + 1;
  imageRef.src = galleryItems[index].original;
  imageRef.dataset.index = index;
}
