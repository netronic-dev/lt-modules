export const obfuscateEmail = (email) => {
  return email
    .split("")
    .map((char) => `&#${char.charCodeAt(0)};`)
    .join("");
};
