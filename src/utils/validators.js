/**
 * Input validators for the Esthan Sushi app.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email) {
  return typeof email === "string" && EMAIL_RE.test(email.trim());
}

/**
 * Validate a Brazilian phone number (10 or 11 digits, optional formatting).
 */
export function isValidPhone(phone) {
  if (typeof phone !== "string") return false;
  const digits = phone.replace(/\D/g, "");
  return digits.length === 10 || digits.length === 11;
}

/**
 * Validate a Brazilian CPF (Cadastro de Pessoas Físicas).
 */
export function isValidCPF(cpf) {
  if (typeof cpf !== "string") return false;
  const digits = cpf.replace(/\D/g, "");
  if (digits.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(digits)) return false;

  const calcCheck = (length) => {
    let sum = 0;
    for (let i = 0; i < length; i++) {
      sum += Number(digits[i]) * (length + 1 - i);
    }
    const rest = (sum * 10) % 11;
    return rest === 10 ? 0 : rest;
  };

  return (
    calcCheck(9) === Number(digits[9]) &&
    calcCheck(10) === Number(digits[10])
  );
}

/**
 * Require a non-empty (after trim) string.
 */
export function isRequired(value) {
  return typeof value === "string" && value.trim().length > 0;
}

/**
 * Validate a password meets minimum requirements.
 */
export function isValidPassword(password, minLength = 6) {
  return typeof password === "string" && password.length >= minLength;
}
