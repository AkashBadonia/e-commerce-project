function createCategList(categArr, categFilterCont) {
  categArr.forEach((categ) => {
    const categCont = document.createElement("div");
    const inputEl = document.createElement("input");
    const labelEl = document.createElement("label");
    categCont.classList.add("categCont");
    inputEl.id = categ;
    inputEl.type = "checkbox";
    labelEl.htmlFor = categ;
    labelEl.textContent = `${capitalizeString(categ)}`;
    categCont.append(inputEl, labelEl);
    categFilterCont.appendChild(categCont);
  });
}
function capitalizeString(str) {
  if (!str) return str; // Return the string as is if it's empty or undefined
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
export { createCategList };
