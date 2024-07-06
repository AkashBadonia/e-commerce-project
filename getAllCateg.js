function getCategoriesList(data) {
  const categories = new Set(data.map((product) => product.category));
  return Array.from(categories);
}

export { getCategoriesList };
