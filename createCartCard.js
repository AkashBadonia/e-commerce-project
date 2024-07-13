import { getCartItems, cartKey } from "./localStoCartItem.js";
import { idExist, indexOfId, CartItem } from "./cartHelpFunc.js";
import { calulatePrice } from "./calculateSellingPrice.js";
const cardsContainer = document.getElementById("cartCardCont");
const totalPrice = document.getElementById("totalPrice");
const totalAmount = document.getElementById("totalAmount");
const totalDiscount = document.getElementById("totalDiscount");
let cartItems = getCartItems();

function createCard(data) {
  const cardId = `${data.id}`;
  const card = document.createElement("div");
  const imageCont = document.createElement("div");
  const img = document.createElement("img");
  const productName = document.createElement("h5");
  const productPriceCont = document.createElement("div");
  const sellingPrice = document.createElement("div");
  const mrp = document.createElement("div");
  const discount = document.createElement("div");
  const itemQuan = document.createElement("input");
  const removeBtn = document.createElement("button");

  card.classList.add("cartCard", "displayFlex", "flexColumn");
  card.setAttribute("data-category", data.category);
  card.setAttribute("data-id", data.id);
  img.src = data.thumbnail;
  img.classList.add("cartProductImg");
  imageCont.classList.add("cartProImgCont");
  productName.classList.add("productName");
  productPriceCont.classList.add("productPriceCont", "displayFlex");
  sellingPrice.classList.add("sellingPrice");
  mrp.classList.add("mrp");
  discount.classList.add("discount");
  removeBtn.classList.add("removeFromCartBtn");
  productName.textContent = data.title;
  sellingPrice.textContent = calulatePrice(data.price, data.discountPercentage);
  mrp.textContent = `$${data.price}`;
  discount.textContent = `${data.discountPercentage}% off`;
  itemQuan.type = "number";
  if (cardId && cartItems && idExist(cardId)) {
    itemQuan.value = cartItems[indexOfId(cardId)].qu;
  }
  itemQuan.min = "1";
  itemQuan.classList.add("noItems");
  removeBtn.textContent = "Remove";

  imageCont.appendChild(img);
  productPriceCont.append(sellingPrice, mrp, discount);
  card.append(imageCont, productName, productPriceCont, itemQuan, removeBtn);
  cardsContainer.appendChild(card);

  // adding event listener to remove button
  removeBtn.addEventListener("click", () => {
    console.log(cardId);
    if (cardId && cartItems && idExist(cardId)) {
      cartItems.splice(indexOfId(cardId), 1);
      console.log(cartItems);
      localStorage.setItem(cartKey, JSON.stringify(cartItems));
      removeBtn.parentElement.remove();
      totalPrice.textContent = `$${calcTotalPrice()}`;
      totalDiscount.textContent = `- $${calcDiscount()}`;
      totalAmount.textContent = `$${calculateTotalAmount()}`;
    }
  });

  // adding event listener to input quantity
  itemQuan.addEventListener("input", (event) => {
    if (cardId && cartItems && idExist(cardId)) {
      const newQuan = Number(event.target.value);
      const cartObj = new CartItem(cardId, newQuan, data.price, data.discountPercentage);
      cartItems.splice(indexOfId(cardId), 1);
      cartItems.push(cartObj);
      console.log(cartItems);
      localStorage.setItem(cartKey, JSON.stringify(cartItems));
      totalPrice.textContent = `$${calcTotalPrice()}`;
      totalDiscount.textContent = `- $${calcDiscount()}`;
      totalAmount.textContent = `$${calculateTotalAmount()}`;
    }
  });
  totalPrice.textContent = `$${calcTotalPrice()}`;
  totalDiscount.textContent = `- $${calcDiscount()}`;
  totalAmount.textContent = `$${calculateTotalAmount()}`;
}

function calculateTotalAmount() {
  if (getCartItems()) {
    const cartItems = getCartItems();
    const total = cartItems.reduce((acc, item) => {
      const sellingPrice = (item.price * (100 - item.discount)) / 100;
      return acc + Number(item.qu) * Number(sellingPrice);
    }, 0);
    return total.toFixed(2);
  } else {
    return 0;
  }
}

function calcDiscount() {
  if (getCartItems()) {
    const cartItems = getCartItems();
    const discountTotal = cartItems.reduce((acc, item) => {
      const discount = (item.price * item.discount) / 100;
      return acc + Number(item.qu) * Number(discount);
    }, 0);
    return discountTotal.toFixed(2);
  } else {
    return 0;
  }
}
function calcTotalPrice() {
  if (getCartItems()) {
    const cartItems = getCartItems();
    const total = cartItems.reduce((acc, item) => {
      const price = item.price;
      return acc + Number(item.qu) * Number(price);
    }, 0);
    return total.toFixed(2);
  } else {
    return 0;
  }
}

export { createCard };
