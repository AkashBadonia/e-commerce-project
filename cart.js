import { createCard } from "./createCartCard.js";
import { getProducts } from "./requestProductData.js";
import { getCartItems } from "./localStoCartItem.js";

const cart = "cart_key";

async function showCart() {
  const data = await getProducts();
  let cartItems = getCartItems();
  if (cartItems) {
    cartItems.forEach((id) => {
      createCard(data.find((prod) => prod.id == id));
    });
  }
  const removeFromCartBtn = document.querySelectorAll(".removeFromCartBtn");
  removeFromCartBtn.forEach((btn) => {
    const cardId = btn.parentElement.getAttribute("data-id");
    btn.addEventListener("click", () => {
      if (cardId && cartItems.includes(cardId)) {
        cartItems.splice(cartItems.indexOf(cardId), 1);
        console.log(cartItems);
        localStorage.setItem(cart, JSON.stringify(cartItems));
        btn.parentElement.remove();
      }
    });
  });
}
showCart();
