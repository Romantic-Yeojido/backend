import { findById, softDeleteUser } from "../repositories/user.repository.js";

export const withdrawUser = async (userId) => {
  try {
    const user = await findById(userId);
    if (!user) {
      throw new Error("존재하지 않는 사용자입니다.");
    }

    const result = await softDeleteUser(userId);
    if (!result) {
      throw new Error("회원 탈퇴 처리에 실패했습니다.");
    }

    return true;
  } catch (error) {
    throw error;
  }
};

export const getMyProfile = async (userId) => {
  try {
    const user = await findById(userId);

    if (!user) {
      throw new Error("존재하지 않는 사용자입니다");
    }

    if (user.is_deleted) {
      throw new Error("탈퇴한 사용자입니다");
    }

    return {
      email: user.email,
      nickname: user.nickname,
    };
  } catch (error) {
    throw error;
  }
};
