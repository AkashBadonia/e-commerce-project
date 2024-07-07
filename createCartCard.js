const cardsContainer = document.getElementById("cartCardCont");

function createCard(data) {
  const card = document.createElement("div");
  const imageCont = document.createElement("div");
  const img = document.createElement("img");
  const productName = document.createElement("h5");
  const productPrice = document.createElement("p");
  const noOfItems = document.createElement("input");
  const removeBtn = document.createElement("button");

  card.classList.add("cartCard", "displayFlex", "flexColumn");
  card.setAttribute("data-category", data.category);
  card.setAttribute("data-id", data.id);
  img.src = data.thumbnail;
  img.classList.add("cartProductImg");
  imageCont.classList.add("cartProImgCont");
  productName.classList.add("productName");
  productPrice.classList.add("productPrice");
  removeBtn.classList.add("removeFromCartBtn");
  productName.textContent = data.title;
  productPrice.textContent = `$${data.price}`;
  noOfItems.type = "number";
  noOfItems.value = "1";
  noOfItems.classList.add("noItems");
  removeBtn.textContent = "Remove";

  imageCont.appendChild(img);
  card.append(imageCont, productName, productPrice, noOfItems, removeBtn);
  cardsContainer.appendChild(card);
}

export { createCard };
