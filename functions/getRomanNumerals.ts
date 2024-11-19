export const getRomanNumerals = (number: number): string => {
  const romanNumerals: { [key: number]: string } = {
    1000: "M",
    900: "CM",
    500: "D",
    400: "CD",
    100: "C",
    90: "XC",
    50: "L",
    40: "XL",
    10: "X",
    9: "IX",
    5: "V",
    4: "IV",
    1: "I",
  };

  let result = "";
  for (const value of Object.keys(romanNumerals)
    .map(Number)
    .sort((a, b) => b - a)) {
    while (number >= value) {
      result += romanNumerals[value];
      number -= value;
    }
  }
  return result;
};
