function moveSlide(dir) {
  document
    .querySelector(dir !== "submit" ? ".ghl-footer-" + dir : ".ghl-submit-btn")
    ?.click();
}
