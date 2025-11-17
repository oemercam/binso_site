export interface PasswordValidationResult {
  isValid: boolean
  errors: string[]
  strength: "weak" | "medium" | "strong"
}

export function validatePassword(password: string): PasswordValidationResult {
  const errors: string[] = []
  let strength: "weak" | "medium" | "strong" = "weak"

  // Mindestlänge
  if (password.length < 10) {
    errors.push("Passwort muss mindestens 10 Zeichen lang sein")
  }

  // Großbuchstaben
  if (!/[A-Z]/.test(password)) {
    errors.push("Passwort muss mindestens einen Großbuchstaben enthalten")
  }

  // Kleinbuchstaben
  if (!/[a-z]/.test(password)) {
    errors.push("Passwort muss mindestens einen Kleinbuchstaben enthalten")
  }

  // Zahlen
  if (!/[0-9]/.test(password)) {
    errors.push("Passwort muss mindestens eine Zahl enthalten")
  }

  // Sonderzeichen
  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
    errors.push("Passwort muss mindestens ein Sonderzeichen enthalten")
  }

  // Berechne Stärke
  if (errors.length === 0) {
    if (password.length >= 16) {
      strength = "strong"
    } else if (password.length >= 12) {
      strength = "medium"
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    strength,
  }
}

export function generateSecurePassword(length = 16): string {
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const lowercase = "abcdefghijklmnopqrstuvwxyz"
  const numbers = "0123456789"
  const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?"
  const allChars = uppercase + lowercase + numbers + symbols

  let password = ""

  // Stelle sicher, dass mindestens ein Zeichen jeder Kategorie enthalten ist
  password += uppercase[Math.floor(Math.random() * uppercase.length)]
  password += lowercase[Math.floor(Math.random() * lowercase.length)]
  password += numbers[Math.floor(Math.random() * numbers.length)]
  password += symbols[Math.floor(Math.random() * symbols.length)]

  // Fülle den Rest auf
  for (let i = password.length; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)]
  }

  // Mische das Passwort
  return password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("")
}
