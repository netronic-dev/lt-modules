export const obfuscateEmail = (email) => {
  console.log(email, "email");
  console.log(
    email
      .split("")
      .map((char) => `&#${char.charCodeAt(0)};`)
      .join(""),
    "email change"
  );
  return email
    .split("")
    .map((char) => `&#${char.charCodeAt(0)};`)
    .join("");
};
