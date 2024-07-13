const cardsContainer = document.getElementById("cardsContainer");
import { getCartItems, cartKey } from "./localStoCartItem.js";
import { indexOfId, idExist, CartItem } from "./cartHelpFunc.js";
import { calulatePrice } from "./calculateSellingPrice.js";
let cartItemsArr = getCartItems() || [];

function createCard(data) {
  const card = document.createElement("div");
  const imageCont = document.createElement("div");
  const img = document.createElement("img");
  const productName = document.createElement("h5");
  const productDesc = document.createElement("p");
  const ratingCont = document.createElement("div");
  const rateValue = document.createElement("div");
  const rateStar = document.createElement("div");
  const productPriceCont = document.createElement("div");
  const sellingPrice = document.createElement("div");
  const mrp = document.createElement("div");
  const discount = document.createElement("div");
  const addToCartBtn = document.createElement("button");

  card.classList.add("productCard", "displayFlex", "flexColumn");
  card.setAttribute("data-category", data.category);
  card.setAttribute("data-id", data.id);
  img.src = data.thumbnail;
  img.classList.add("productImg");
  imageCont.classList.add("productImgCont");
  productName.classList.add("productName");
  productDesc.classList.add("productDesc");
  ratingCont.classList.add("ratingCont", "displayFlex");
  productPriceCont.classList.add("productPriceCont", "displayFlex");
  sellingPrice.classList.add("sellingPrice");
  mrp.classList.add("mrp");
  discount.classList.add("discount");
  addToCartBtn.classList.add("addToCartBtn");
  productName.textContent = data.title;
  productDesc.textContent = data.description;
  rateValue.textContent = data.rating;
  rateStar.innerHTML = `<i class="fa-solid fa-star"></i>`;
  sellingPrice.textContent = calulatePrice(data.price, data.discountPercentage);
  mrp.textContent = `$${data.price}`;
  discount.textContent = `${data.discountPercentage}% off`;
  addToCartBtn.textContent = "Add to cart";

  imageCont.appendChild(img);
  ratingCont.append(rateValue, rateStar);
  productPriceCont.append(sellingPrice, mrp, discount);
  card.append(imageCont, productName, productDesc, ratingCont, productPriceCont, addToCartBtn);
  cardsContainer.appendChild(card);

  // adding event listener to add to cart button
  // console.log(cartItems);
  addToCartBtn.addEventListener("click", (event) => {
    addToCartBtn.classList.toggle("addedToCart");
    const cardId = data.id;
    if (cardId && !idExist(cardId)) {
      const cartObj = new CartItem(data.id, 1, data.price, data.discountPercentage);
      addToCartBtn.innerHTML = `Remove <i class="fa-solid fa-trash"></i>`;
      cartItemsArr.push(cartObj);
      console.log(cartItemsArr);
      localStorage.setItem(cartKey, JSON.stringify(cartItemsArr));
    } else if (cardId && idExist(cardId)) {
      cartItemsArr.splice(indexOfId(cardId), 1);
      console.log(cartItemsArr);
      localStorage.setItem(cartKey, JSON.stringify(cartItemsArr));
      addToCartBtn.textContent = "Add to cart";
    }
  });
}

export { createCard };
