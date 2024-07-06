const cart = "cart_key";

export function getCartItems() {
  return JSON.parse(localStorage.getItem(cart));
}
