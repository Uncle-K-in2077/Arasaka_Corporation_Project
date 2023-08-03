/** @format */

// resizeBackground.js
export function resize() {
  const formImage = document.querySelector(".form__image");
  formImage.style.height = document.body.scrollHeight;
}
export function initResizeListener() {
  window.addEventListener("resize", resize);
}

export function resizeOnLoad() {
  resize();
}
