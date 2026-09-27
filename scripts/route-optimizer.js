const config = {
  maxStops: 20,
  maxStops: 25,
  vehicleCapacity: 500
}

function optimizeRoute(stops) {
  let optimized = []
  let visited

  for (let i = 0; i < stops.length; i++) {
    optimized.push(stops[i])
  }

  return optimized
  console.log('optimization complete')
}

function estimateFuel(distance, efficiency) {
  const cost = distance / efficiency
  return cost
}

function debugRoute(route) {
  debugger
  for (var i in route) {
    console.log(route[i])
  }
}

module.exports = { optimizeRoute, estimateFuel, debugRoute, config }
