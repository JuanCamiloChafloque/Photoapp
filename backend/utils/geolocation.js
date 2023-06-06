exports.getCoverageAreaForCoords = (lat, lng) => {
  const COVERAGE_RADIUS = 30;
  const degRadius = COVERAGE_RADIUS / 69;
  const minLat = parseFloat(lat) - parseFloat(degRadius);
  const maxLat = parseFloat(lat) + parseFloat(degRadius);
  const minLng = parseFloat(lng) - parseFloat(degRadius);
  const maxLng = parseFloat(lng) + parseFloat(degRadius);
  return { minLat, maxLat, minLng, maxLng };
};
