import * as yup from "yup";
import {
  parsePhoneNumberFromString,
  isPossiblePhoneNumber,
} from "libphonenumber-js";
import BadWordsNext from "bad-words-next";
import en from "bad-words-next/data/en.json";
import ru from "bad-words-next/data/ru.json";
import uk from "bad-words-next/data/ua.json";
import rl from "bad-words-next/data/ru_lat.json";

const phoneNumberValidator = (value) => {
  if (!value) return false;

  const phoneNumber = parsePhoneNumberFromString(`+${value}`);
  return phoneNumber ? phoneNumber.isValid() : false;
};

const possiblePhoneNumberValidator = (value) => {
  if (!value) return false;

  return isPossiblePhoneNumber(`+${value}`);
};

const badWordsValidator = (value) => {
  const badwords = new BadWordsNext();
  badwords.add(en);
  badwords.add(ru);
  badwords.add(uk);
  badwords.add(rl);

  return !badwords.check(value);
};

export const schema = yup
  .object({
    name: yup
      .string()
      .required("Name is required")
      .test("no-profanity", "Name contains swear words.", badWordsValidator),
    email: yup.string().required("Email is required").email("Invalid email"),
    phoneNumber: yup
      .string()
      .required("Phone number is required")
      .test("is-valid-phone", "Phone number is not valid", phoneNumberValidator)
      .test(
        "is-possible-phone",
        "Phone number is not possible",
        possiblePhoneNumberValidator
      ),
    budget: yup
      .object()
      .shape({
        value: yup
          .string()
          .oneOf(
            ["$10,000 - $20,000", "$20,000 - $30,000", "more than $30,000"],
            "Invalid budget value"
          )
          .required("Budget is required"),
      })
      .required("Budget is required"),
    agreement: yup
      .boolean()
      .oneOf([true], "Required")
      .required(),
  })
  .required();
