const cartKey = "cart_key";

function getCartItems() {
  return JSON.parse(localStorage.getItem(cartKey));
}

export { getCartItems, cartKey };
