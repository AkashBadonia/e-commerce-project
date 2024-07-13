export function calulatePrice(mrp, discount) {
  return `$${(mrp - mrp * discount * 0.01).toFixed(2)}`;
}
