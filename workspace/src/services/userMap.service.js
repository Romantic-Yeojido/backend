import { getAllUserMemoryLocs } from "../repositories/userMap.repository.js";
import { responseFromUserMeomoryLocs } from "../dtos/userMap.dto.js";

export const listUserMemoryLocs = async (userId) => {
  const locations = await getAllUserMemoryLocs(userId);
  return responseFromUserMeomoryLocs(locations);
};
