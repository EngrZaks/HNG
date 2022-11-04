const openaiConfig = (operationStr) => {
  return {
    model: "text-davinci-002",
    prompt: operationStr,
    temperature: 0,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  };
};

const isAddition = (str) =>
  str.includes("addition") ||
  str.includes("+") ||
  str.includes("add") ||
  str.includes("+");

const isMultiplication = (str) =>
  str.includes("multiplication") ||
  str.includes("*") ||
  str.includes("mult") ||
  str.includes("times") ||
  str.includes("*");

const isSubtraction = (str) =>
  str.includes("subtr") || str.includes("-") || str.includes("minus");

const isEnum = (str) =>
  str == "multiplication" || str == "addition" || str == "subtraction";
const skipEnum = (str) =>
  str.includes("*") ||
  str.includes("times") ||
  str.includes("-") ||
  str.includes("minus") ||
  str.includes("add") ||
  str.includes("+");
const sample = "1 times 1";

module.exports = {
  openaiConfig,
  isAddition,
  isMultiplication,
  isSubtraction,
  isEnum,
  skipEnum,
};
