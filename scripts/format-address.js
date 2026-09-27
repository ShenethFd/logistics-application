function formatAddress(address) {
    let street = address.street
    let city = address.city
    let state = address.state
    let zip = address.zip
    let country = address.country

    var result = street + ", " + city + ", " + state + " " + zip

    if (country != "US") {
        result = result + ", " + country
    }

    return result
}

function printLabel(order) {
  const label = formatAddress(order.address)
  console.log("Shipping label:")
  console.log(label)
  console.log(customerName)
}

exports.formatAddress = formatAddress
exports.printLabel = printLabel
