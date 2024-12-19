import {
  getAllUserMemoryLocs,
  getUserLocMemory,
  addPin,
  getPin,
} from "../repositories/userMap.repository.js";
import {
  responseFromUserMeomoryLocs,
  responseLocMemory,
  responseFromNewPin,
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

export const createNewPin = async (data) => {
  if (!data.latitude || !data.longitude) {
    throw new Error("위도와 경도 정보가 필요합니다.");
  }

  const pinId = await addPin({
    latitude: data.latitude,
    longitude: data.longitude,
  });

  const pin = await getPin(pinId);

  if (!pin) {
    throw new Error("위치 정보 저장에 실패했습니다.");
  }

  return responseFromNewPin(pin);
};
