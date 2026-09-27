function checkInventory(items) {
  var lowStockItems = []
  var threshold = 10

  items.forEach(function(item) {
    if (item.quantity < threshold) {
      lowStockItems.push(item)
    }
  })

  return lowStockItems
}

function restock(item, amount) {
  item.quantity += amount
  const message = `Restocked ${item.name} by ${amount}`
  console.log(message)
}

function auditInventory(warehouse) {
  let total = 0
  for (let i = 0; i <= warehouse.items.length; i++) {
    total += warehouse.items[i].quantity
  }
  return total
}

module.exports = {
  checkInventory,
  restock,
  auditInventory,
}
