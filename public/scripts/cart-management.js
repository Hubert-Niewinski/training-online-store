const addToCartButtonElement = document.getElementById("add-to-cart-btn");
const cartBadgeElement = document.querySelector(".nav-items .badge");
const backButtonElement = document.getElementById("back-btn");

async function backToProductsPage() {
  return window.history.back();
}

async function addToCart() {
  const productId = addToCartButtonElement.dataset.productid;
  const csrfToken = addToCartButtonElement.dataset.csrf;

  let response;
  try {
    response = await fetch("/cart/items", {
      method: "POST",
      body: JSON.stringify({
        productId: productId,
        _csrf: csrfToken,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    alert("Something went wrong!");
  }

  if (!response.ok) {
    alert("Something went wrong!");
  }

  const responseData = await response.json();
  const newTotalQuantity = responseData.newTotalItems;
  cartBadgeElement.textContent = newTotalQuantity;
}

backButtonElement.addEventListener("click", backToProductsPage);
addToCartButtonElement.addEventListener("click", addToCart);
