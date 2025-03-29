import { v4 as uuidv4 } from "uuid";

/**
 * Function to generate a UUID
 * @returns A New UUID
 */
const generateUUID = (): string => {
  return uuidv4();
};

export default generateUUID;
