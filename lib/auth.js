import { hash, compare } from "bcryptjs";

export function hashPassword(password) {
  const hashedPassword = hash(password, 10);
  return hashedPassword;
}

export function verifyPassword(password, hashedPassword) {
  const isValid = compare(password, hashedPassword);
  return isValid;
}
