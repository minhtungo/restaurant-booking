import { CATEGORIES } from "@/constants/config";

//write a function to capitalize the first letter of each word in a string
export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const selectOptions = CATEGORIES.map((category) => ({
  value: category,
  label: capitalize(category),
}));
