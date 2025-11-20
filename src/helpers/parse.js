export const safeParse = (value, fallback) => {
  if (value === null) return fallback;

  try {
    return JSON.parse(value);
  } catch (err) {
    console.warn("safeParse: invalid JSON in localStorage — resetting to fallback", err);
    return fallback;
  }
}