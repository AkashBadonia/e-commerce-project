import { createCard } from "./createCartCard.js";
import { getProducts } from "./requestProductData.js";
import { getCartItems } from "./localStoCartItem.js";

const totalPrice = document.getElementById("totalPrice");

async function showCart() {
  const data = await getProducts();
  let cartItems = getCartItems();
  if (cartItems) {
    cartItems.forEach((itemObj) => {
      createCard(data.find((prod) => prod.id == itemObj.id));
    });
  }
}

showCart();
