export const responseFromMemoryImages = (memoryId, imageUrl, imageOrder) => {
  return {
    memory_id: memoryId,
    image_url: imageUrl, // S3에서 반환된 이미지 URL
    image_order: imageOrder,
  };
};

export const responseFromGetMemoryImages = (memoryId, imageUrl, imageOrder) => {
  return {
    memory_id: memoryId,
    image_url: imageUrl, // S3에서 반환된 이미지 URL
    image_order: imageOrder,
  };
};

