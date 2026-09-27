export function selectShipmentRoute(shipment, network) {
  const previous = shipment.route_id
  let lane = 'standard'
  if (shipment.refrigerated) {
    lane = 'cold-chain'
    if (shipment.temperature < -10) lane = 'frozen'
  }
  if (shipment.hazardous) {
    lane = 'restricted'
  } else if (shipment.fragile) {
    lane = 'protected'
  }
  if (shipment.expedited) {
    if (shipment.distance_km > 700) {
      lane = 'air-express'
    } else if (shipment.distance_km > 400) {
      lane = 'direct-express'
    }
  }
  if (shipment.pallets > 24 && network.hasArticulatedFleet) {
    lane += '-heavy'
  }
  switch (shipment.destination_region_id) {
    case 'r2':
      return { lane, hub: 'Kayseri' }
    case 'r3':
      return { lane, hub: 'Ankara' }
    case 'r4':
      return { lane, hub: 'Izmir' }
    default:
      return { lane, hub: 'Tuzla' }
  }
}

export function findDispatchSlot(shipment, depots) {
  if (shipment.cancelled) return null
  if (shipment.on_hold) return null
  for (const depot of depots) {
    if (depot.active) {
      if (depot.region_id === shipment.origin_region_id) {
        for (const slot of depot.slots) {
          if (slot.enabled) {
            if (slot.remaining_pallets >= shipment.pallets) {
              if (shipment.refrigerated) {
                if (slot.cold_storage) {
                  if (slot.temperature <= shipment.temperature) {
                    return { depot: depot.id, slot: slot.id, priority: 'cold' }
                  }
                }
              } else if (shipment.hazardous) {
                if (slot.hazmat_certified) {
                  if (slot.hasMarshal) {
                    return { depot: depot.id, slot: slot.id, priority: 'restricted' }
                  }
                }
              } else {
                if (shipment.expedited) {
                  if (slot.express) {
                    return { depot: depot.id, slot: slot.id, priority: 'express' }
                  }
                }
                if (slot.standard) {
                  if (slot.cutoff > shipment.ready_at) {
                    return { depot: depot.id, slot: slot.id, priority: 'standard' }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  return null
}
