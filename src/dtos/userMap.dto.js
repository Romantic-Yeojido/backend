export const responseFromUserMeomoryLocs = (locations) => {
  return locations.map((location) => ({
    latitude: location.latitude,
    longitude: location.longitude,
  }));
};

export const responseLocMemory = (memory) => {
  if (!memory) {
    return null;
  }

  const memoryData = Array.isArray(memory) ? memory[0] : memory;

  const response = {
    id: memoryData.id,
    title: memoryData.title,
    visit_date: memoryData.visit_date,
    friends: memoryData.friends,
    gpt_summary: memoryData.summary,
    image_url: memoryData.image_url,
  };

  return response;
};

export const bodyToNewPin = (userId, latitude, longitude) => {
  return {
    latitude: parseFloat(latitude),
    longitude: parseFloat(longitude),
    userId: parseInt(userId),
  };
};

export const responseFromNewPin = (pin) => {
  return {
    latitude: parseFloat(pin.latitude),
    longitude: parseFloat(pin.longitude),
  };
};
