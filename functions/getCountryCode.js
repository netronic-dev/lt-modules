import { parsePhoneNumberFromString } from "libphonenumber-js";

export const getCountryCode = (phoneNumber) => {
  if (!phoneNumber) return null;

  const parsedNumber = parsePhoneNumberFromString(phoneNumber);
  if (!parsedNumber) return null;

  return parsedNumber.country;
};
