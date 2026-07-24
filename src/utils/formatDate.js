/**
 * Date formatting helpers (pt-BR).
 */

function toDate(input) {
  if (input instanceof Date) return input;
  if (typeof input === "number" || typeof input === "string") {
    return new Date(input);
  }
  return new Date(NaN);
}

function isValidDate(date) {
  return date instanceof Date && !Number.isNaN(date.getTime());
}

/**
 * Format a date as "dd/mm/yyyy". Returns "" for invalid input.
 */
export function formatDate(input) {
  const date = toDate(input);
  if (!isValidDate(date)) return "";
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

/**
 * Format a date as "dd/mm/yyyy HH:MM". Returns "" for invalid input.
 */
export function formatDateTime(input) {
  const date = toDate(input);
  if (!isValidDate(date)) return "";
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${formatDate(date)} ${hours}:${minutes}`;
}
