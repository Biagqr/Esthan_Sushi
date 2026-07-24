/**
 * Generic helper utilities.
 */

/**
 * Turn a string into a URL-friendly slug.
 */
export function slugify(text) {
  if (typeof text !== "string") return "";
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Truncate a string to `max` characters, appending an ellipsis.
 */
export function truncate(text, max = 50) {
  if (typeof text !== "string") return "";
  if (max <= 0) return "";
  if (text.length <= max) return text;
  return text.slice(0, max).trimEnd() + "…";
}

/**
 * Group an array of objects by the value of a key.
 */
export function groupBy(items, key) {
  if (!Array.isArray(items)) return {};
  return items.reduce((acc, item) => {
    const group = item?.[key];
    if (group === undefined || group === null) return acc;
    (acc[group] ||= []).push(item);
    return acc;
  }, {});
}

/**
 * Return a new array with duplicates removed (primitive values).
 */
export function unique(items) {
  if (!Array.isArray(items)) return [];
  return [...new Set(items)];
}

/**
 * Clamp a number between min and max.
 */
export function clamp(value, min, max) {
  const n = Number(value);
  if (!Number.isFinite(n)) return min;
  return Math.min(Math.max(n, min), max);
}
