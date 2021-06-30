// gets distance in km between two sets of lat/long coords
export function getDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const EARTH_RADIUS = 6371
  const degLat = toRad(lat2 - lat1)
  const degLon = toRad(lon2 - lon1)
  const a =
    Math.sin(degLat / 2) * Math.sin(degLat / 2) +
    Math.cos(toRad(lat1) * Math.cos(toRad(lat2))) *
      Math.sin(degLon / 2) *
      Math.sin(degLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return EARTH_RADIUS * c
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180)
}
