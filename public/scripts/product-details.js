const backButtonElement = document.getElementById("back-btn");

async function backToProductPage() {
  return window.history.back();
}

backButtonElement.addEventListener("click", backToProductPage);
