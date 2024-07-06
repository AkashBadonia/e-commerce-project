const allProdCards = document.querySelectorAll(".productCard");
function filterByCateg(categArr) {
  if (categArr.length > 0) {
    allProdCards.forEach((card) => (card.style.display = "none"));
    categArr.forEach((categ) => {
      const categCards = allProdCards.querySelectorAll(`[data-category=${categ}]`);
    });
  }
}
