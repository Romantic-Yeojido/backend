import { addMemoryImage, getMemoryImages } from "../repositories/memoryImage.repository.js";
import { responseFromMemoryImages } from "../dtos/memoryImage.dto.js";

export const postMemoryImages = async (files, memoryId) => {
  try {
    const uploadPromises = files.map((file, index) => {
      const imageUrl = file.location; // S3에서 반환된 이미지 URL
      const imageOrder = index + 1; // 클라이언트 업로드 순서로 imageOrder 부여

      const memoryImageData = responseFromMemoryImages(memoryId, imageUrl, imageOrder);

      return addMemoryImage(memoryImageData); // DB에 이미지 저장

    });

    await Promise.all(uploadPromises);

    // 모든 이미지가 저장된 후에 memory_images 정보를 조회
    const memoryImages = await getMemoryImages(memoryId)

    if (!memoryImages) {
      throw new Error("해당 추억 id에 저장된 이미지가 없습니다.");
    }
    return memoryImages;
  }
  catch (error) {
    throw error;
  }
};
