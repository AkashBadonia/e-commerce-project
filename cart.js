import { createCard } from "./createCartCard.js";
import { getProducts } from "./requestProductData.js";
import { getCartItems } from "./localStoCartItem.js";

const cart = "cart_key";
const totalPrice = document.getElementById("totalPrice");

async function showCart() {
  const data = await getProducts();
  let cartItems = getCartItems();
  if (cartItems) {
    cartItems.forEach((id) => {
      createCard(data.find((prod) => prod.id == id));
    });
  }

  const productPrice = document.querySelectorAll(".productPrice");
  totalPrice.textContent = `Total Price: $${updateTotal(createPriceArr(productPrice))}`;
  const removeFromCartBtn = document.querySelectorAll(".removeFromCartBtn");
  removeFromCartBtn.forEach((btn) => {
    const cardId = btn.parentElement.getAttribute("data-id");
    btn.addEventListener("click", () => {
      if (cardId && cartItems.includes(cardId)) {
        cartItems.splice(cartItems.indexOf(cardId), 1);
        console.log(cartItems);
        localStorage.setItem(cart, JSON.stringify(cartItems));
        btn.parentElement.remove();
        const productPrice = document.querySelectorAll(".productPrice");
        const priceArray = createPriceArr(productPrice);
        totalPrice.textContent = `Total Price: $${updateTotal(priceArray)}`;
      }
    });
  });

  // const noItemsEl = document.querySelectorAll(".noItems");
  // noItemsEl.forEach((element) => {
  //   element.addEventListener("")
  // })
}
function createPriceArr(nodeList) {
  return Array.from(nodeList).map((curr) => Number(curr.textContent.slice(1)));
}
function updateTotal(arr) {
  return arr.reduce((acc, curr) => acc + curr, 0);
}
showCart();
