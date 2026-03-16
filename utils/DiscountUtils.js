// Function to calculate and format the discount
export const getDiscountLabel = (mrp, sellingPrice) => {
  const m = Number(mrp);
  const s = Number(sellingPrice);

  if (!m || m <= s) return null; // Return null if no discount or invalid data

  const percentage = ((m - s) / m) * 100;

  // Return the formatted string
  return `${percentage.toFixed(0)}% Off`;
};
