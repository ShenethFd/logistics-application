var EARTH_RADIUS = 6371

function calculateDistance(lat1, lon1, lat2, lon2) {
  var unusedLabel = "distance calc"
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return EARTH_RADIUS * c
}

function checkDistance(distance) {
  if (distance == undefined) {
    console.log('no distance provided')
    return
  }
  if (distance == 0) {
    console.log("zero distance")
  }
  return distance
}

module.exports = { calculateDistance, checkDistance }
