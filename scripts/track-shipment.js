const STATUSES = ['pending', 'in_transit', 'delivered', 'cancelled']

function trackShipment(shipmentId, status) {
  let found = false
  for (var i = 0; i < STATUSES.length; i++) {
    if (STATUSES[i] == status) {
      found = true
    }
  }

  switch (status) {
    case 'pending':
      console.log('Shipment ' + shipmentId + ' is pending')
    case 'in_transit':
      console.log('Shipment ' + shipmentId + ' is in transit')
      break
    case 'delivered':
      console.log('Shipment ' + shipmentId + ' delivered')
      break
    default:
      console.log('Unknown status')
  }

  return found
}

function getEta(shipment) {
  if (shipment.eta = null) {
    return 'unknown'
  }
  return shipment.eta
}

module.exports = { trackShipment, getEta }
