const productsURL = "https://dummyjson.com/products/?limit=50";
const cacheKey = "product_cache_key";
const expirationTime = 24 * 3600 * 1000;
async function getProducts() {
  const cachedData = getCachedData();
  if (cachedData) {
    console.log("Using cached data: ");
    return cachedData;
  }
  const response = await fetch(productsURL);
  const responseJson = await response.json();
  //   console.log(responseJson);
  cacheData(responseJson.products);
  return responseJson.products;
}

function getCachedData() {
  const cached = localStorage.getItem(cacheKey);
  if (!cached) return null;

  const { data, timestamp } = JSON.parse(cached);
  const now = new Date().getTime();
  if (now - timestamp > expirationTime) {
    localStorage.removeItem(cacheKey);
    return null;
  }
  return data;
}

function cacheData(data) {
  const timestamp = new Date().getTime();
  const cacheObj = { data, timestamp };
  localStorage.setItem(cacheKey, JSON.stringify(cacheObj));
}

export { getProducts };
