import { getRandomSixNumber } from "../utils/utils";

export const CREATE_NEW_NUMBERS = "CREATE_NEW_NUMBERS";

export const createNewNumbers = () => {
  const numbers = getRandomSixNumber();
  return {
    type: CREATE_NEW_NUMBERS,
    numbers,
  };
};
