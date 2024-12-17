export const responseFromUserMeomoryLocs = (locations) => {
  return locations.map((location) => ({
    latitude: location.latitude,
    longitude: location.longitude,
  }));
};
