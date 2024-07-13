import { getProducts } from "./requestProductData.js";
import { createCard } from "./createProductPageCard.js";
import { getCategoriesList } from "./getAllCateg.js";
import { createCategList } from "./createCategList.js";
import { getCartItems } from "./localStoCartItem.js";
const categFilterCont = document.getElementById("categFilterCont");
const categHeadEl = document.getElementById("categHead");

document.addEventListener("DOMContentLoaded", () => {});
async function getAllProducts() {
  const data = await getProducts();
  // console.log(data);
  data.forEach((product) => {
    createCard(product);
  });

  const productCardArr = Array.from(document.querySelectorAll(".productCard"));
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
      // console.log(checked);
      if (checked && checked.length > 0) {
        selectedCateg = Array.from(checked).map((inputEl) => inputEl.id);
        console.log(selectedCateg);
        productCardArr.forEach((card) => {
          card.style.display = "none";
        });
        const filteredArr = productCardArr.filter((product) => {
          return selectedCateg.some((category) => {
            return product.getAttribute("data-category") == category;
          });
        });
        filteredArr.forEach((card) => (card.style.display = "flex"));
      } else {
        productCardArr.forEach((card) => (card.style.display = "flex"));
      }
    }
  });

  // updating add to cart buttons on document load from local storage.
  let cartItems = getCartItems();
  if (cartItems) {
    cartItems.forEach((item) => {
      const cartItem = document.querySelector(`[data-id="${item.id}"]`);
      const cartBtn = cartItem.querySelector(".addToCartBtn");
      cartBtn.innerHTML = `Remove <i class="fa-solid fa-trash"></i>`;
      cartBtn.classList.add("addedToCart");
    });
  }
}

getAllProducts();
