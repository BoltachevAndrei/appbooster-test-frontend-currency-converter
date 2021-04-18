export const FAVORITE_CURRENCY_CODE_LOCALSTORAGE = "favorite-currency";

export const EMPTY_OPTION = "";

export const removeDuplicatesFromArray = <T>(sourceArray: T[]): T[] => {
  const resultArray: T[] = [];
  sourceArray.forEach((element) => {
    if (!resultArray.includes(element)) {
      resultArray.push(element);
    }
  });
  return resultArray;
};
