exports.getCoverageAreaForCoords = (lat, lng) => {
  const COVERAGE_RADIUS = 40;
  const degRadius = COVERAGE_RADIUS / 69;
  const minLat = lat - degRadius;
  const maxLat = lat + degRadius;
  const minLng = lng - degRadius;
  const maxLng = lng + degRadius;
  return { minLat, maxLat, minLng, maxLng };
};
