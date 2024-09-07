export function numberToWords(number) {
  const ones = [
    "",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  const teens = [
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];
  const tens = [
    "",
    "ten",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];
  const thousands = ["", "thousand", "lakh", "crore"];

  function getBelowThousand(n) {
    let word = "";
    if (n > 99) {
      word += ones[Math.floor(n / 100)] + " hundred ";
      n %= 100;
    }
    if (n > 10 && n < 20) {
      word += teens[n - 11] + " ";
    } else {
      word += tens[Math.floor(n / 10)] + " ";
      word += ones[n % 10] + " ";
    }
    return word.trim();
  }

  if (number === 0) return "zero";

  let word = "";
  let i = 0;

  while (number > 0) {
    const part = number % 1000;
    if (part !== 0) {
      const partWord = getBelowThousand(part);
      word = partWord + " " + thousands[i] + " " + word;
    }
    number = Math.floor(number / 1000);
    i++;
  }

  return word.trim();
}
