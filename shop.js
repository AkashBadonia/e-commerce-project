import { getProducts } from "./requestProductData.js";
import { createCard } from "./createProductPageCard.js";
import { getCategoriesList } from "./getAllCateg.js";
import { createCategList } from "./createCategList.js";
import { getCartItems } from "./localStoCartItem.js";
const categFilterCont = document.getElementById("categFilterCont");
const categHeadEl = document.getElementById("categHead");

const cart = "cart_key";

document.addEventListener("DOMContentLoaded", () => {});
async function getAllProducts() {
  const data = await getProducts();
  console.log(data);
  data.forEach((product) => {
    createCard(product);
  });

  // get categories list and creating the list
  const categories = getCategoriesList(data);
  createCategList(categories, categFilterCont);

  // adding event listener to category heading to toggle list visibility
  categHeadEl.addEventListener("click", () => {
    categFilterCont.classList.toggle("active");
  });
  let checked;
  let selectedCateg;
  const categCont = document.querySelectorAll(".categCont");
  categFilterCont.addEventListener("click", (event) => {
    if (event.target.tagName === "INPUT" && event.target.type === "checkbox") {
      checked = categFilterCont.querySelectorAll(`input[type="checkbox"]:checked`);
      console.log(checked);
      if (checked && checked.length > 0) {
        selectedCateg = Array.from(checked).map((inputEl) => inputEl.id);
        console.log(selectedCateg);
      }
    }
  });

  let cartItemsIds = getCartItems();
  console.log(cartItemsIds);
  cartItemsIds.forEach((cartItemId) => {
    const cartItem = document.querySelector(`[data-id="${cartItemId}"]`);
    const cartBtn = cartItem.querySelector(".addToCartBtn");
    cartBtn.innerHTML = `Remove <i class="fa-solid fa-trash"></i>`;
    cartBtn.classList.add("addedToCart");
  });

  // adding event listener to add to cart button
  const addToCartBtns = document.querySelectorAll(".addToCartBtn");
  let cartItems = getCartItems() || [];
  console.log(cartItems);
  addToCartBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      btn.classList.toggle("addedToCart");
      const cardId = btn.parentElement.getAttribute("data-id");
      if (cardId && !cartItems.includes(cardId)) {
        btn.innerHTML = `Remove <i class="fa-solid fa-trash"></i>`;
        cartItems.push(cardId);
        console.log(cartItems);
        localStorage.setItem(cart, JSON.stringify(cartItems));
      } else if (cardId && cartItems.includes(cardId)) {
        cartItems.splice(cartItems.indexOf(cardId), 1);
        console.log(cartItems);
        localStorage.setItem(cart, JSON.stringify(cartItems));
        btn.textContent = "Add to cart";
      }
    });
  });
}

getAllProducts();
