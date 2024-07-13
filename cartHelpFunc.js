import { getCartItems } from "./localStoCartItem.js";

class CartItem {
  constructor(id, qu, price, discount) {
    this.id = id;
    this.qu = qu;
    this.price = price;
    this.discount = discount;
  }
}

function indexOfId(id) {
  const cartItemObjs = getCartItems();
  if (cartItemObjs) {
    const objIndex = cartItemObjs.findIndex((item) => {
      // console.log(item);
      return item.id == id;
    });
    return objIndex;
  }
}
function idExist(id) {
  const cartItemObjs = getCartItems();
  if (cartItemObjs) {
    const objIndex = cartItemObjs.findIndex((item) => {
      // console.log(item);
      return item.id == id;
    });
    if (objIndex === -1) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
}
export { idExist, indexOfId, CartItem };
