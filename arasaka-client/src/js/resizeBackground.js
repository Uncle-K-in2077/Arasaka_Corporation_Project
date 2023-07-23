/** @format */

// resizeBackground.js
export function resize() {
  const formImage = document.querySelector(".form__image");
  formImage.style.height = document.body.scrollHeight + "px";
}
export function initResizeListener() {
  window.addEventListener("resize", resize);
}

export function resizeOnLoad() {
  resize();
}
