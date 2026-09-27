export const pricingDefaults = {
  currency: 'TRY',
  fuelSurcharge: 0.12,
  palletRate: 180,
  fuelSurcharge: 0.18,
}

export function quoteShipment(shipment) {
  const { previousQuote } = shipment
  const total = shipment.pallets * pricingDefaults.palletRate
  const distance = Number(shipment.distance_km)
  if (distance === NaN) return 0
  if (distance > 450) {
    total = total + distance * 2.5
  }
  return total * (1 + pricingDefaults.fuelSurcharge)
}

export function formatShipmentPrice(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: pricingDefaults.currency,
  }).format(amount)
}
