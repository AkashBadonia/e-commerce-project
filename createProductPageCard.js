const cardsContainer = document.getElementById("cardsContainer");

function createCard(data) {
  const card = document.createElement("div");
  const imageCont = document.createElement("div");
  const img = document.createElement("img");
  const productName = document.createElement("h5");
  const productDesc = document.createElement("p");
  const productPrice = document.createElement("p");
  const addToCartBtn = document.createElement("button");

  card.classList.add("productCard", "displayFlex", "flexColumn");
  card.setAttribute("data-category", data.category);
  card.setAttribute("data-id", data.id);
  img.src = data.thumbnail;
  img.classList.add("productImg");
  imageCont.classList.add("productImgCont");
  productName.classList.add("productName");
  productDesc.classList.add("productDesc");
  addToCartBtn.classList.add("addToCartBtn");
  productName.textContent = data.title;
    productDesc.textContent = data.description;
    productPrice.textContent = `$${data.price}`;
  addToCartBtn.textContent = "Add to cart";

  imageCont.appendChild(img);
  card.append(imageCont, productName, productDesc, productPrice, addToCartBtn);
  cardsContainer.appendChild(card);
}

export { createCard };
