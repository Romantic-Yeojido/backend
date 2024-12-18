import {
  getAllUserMemoryLocs,
  getUserLocMemory,
} from "../repositories/userMap.repository.js";
import {
  responseFromUserMeomoryLocs,
  responseLocMemory,
} from "../dtos/userMap.dto.js";

export const listUserMemoryLocs = async (userId) => {
  try {
    const locations = await getAllUserMemoryLocs(userId);

    if (!locations) {
      throw new Error("저장된 장소가 없습니다.");
    }

    return responseFromUserMeomoryLocs(locations);
  } catch (error) {
    throw error;
  }
};

export const ItemLocMemeory = async (userId, latitude, longitude) => {
  if (!userId || !latitude || !longitude) {
    throw new Error("필수 파라미터가 누락되었습니다.");
  }

  const memory = await getUserLocMemory(userId, latitude, longitude);

  if (memory === null) {
    throw new Error("유효하지 않은 값을 입력했습니다.");
  }
  return responseLocMemory(memory);
};
