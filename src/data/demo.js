export const roles = {
  admin: { label: 'Admin', permissions: ['*'] },
  shipment: { label: 'Shipment', permissions: ['shipments:read', 'shipments:create', 'shipments:update', 'drivers:read', 'regions:read'] },
  security: { label: 'Security', permissions: ['shipments:read', 'shipments:call', 'drivers:read'] },
  goods_acceptance: { label: 'Goods Acceptance', permissions: ['shipments:read', 'shipments:receive', 'drivers:read'] },
  regional: { label: 'Regional User', permissions: ['shipments:read:region', 'shipments:create:region', 'shipments:update:region', 'drivers:read'] },
}

export const demoUsers = [
  { id: 'u1', email: 'admin@rotaflow.demo', password: 'demo123', full_name: 'Alice Admin', role: 'admin', region_id: null },
  { id: 'u2', email: 'shipment@rotaflow.demo', password: 'demo123', full_name: 'Ethan Shipping', role: 'shipment', region_id: null },
  { id: 'u3', email: 'security@rotaflow.demo', password: 'demo123', full_name: 'Mark Security', role: 'security', region_id: null },
  { id: 'u4', email: 'receiving@rotaflow.demo', password: 'demo123', full_name: 'Sarah Receiving', role: 'goods_acceptance', region_id: null },
  { id: 'u5', email: 'kayseri@rotaflow.demo', password: 'demo123', full_name: 'Chris Kayseri', role: 'regional', region_id: 'r2' },
]

export const demoRegions = [
  { id: 'r1', name: 'Tuzla Depot', city: 'Istanbul', code: 'TZL', distance_km: 0 },
  { id: 'r2', name: 'Kayseri Depot', city: 'Kayseri', code: 'KYS', distance_km: 770 },
  { id: 'r3', name: 'Ankara Depot', city: 'Ankara', code: 'ANK', distance_km: 450 },
  { id: 'r4', name: 'Izmir Depot', city: 'Izmir', code: 'IZM', distance_km: 490 },
]

export const demoDrivers = [
  { id: 'd1', full_name: 'Ahmet Yilmaz', phone: '0532 111 22 33', license_plate: '34 TR 2045', supplier: 'Mars', visits: 28, departures: 25, pallets: 486, crates: 122 },
  { id: 'd2', full_name: 'Mehmet Kaya', phone: '0533 222 33 44', license_plate: '38 KYS 128', supplier: 'Tezel', visits: 21, departures: 20, pallets: 352, crates: 89 },
  { id: 'd3', full_name: 'Burak Demir', phone: '0534 333 44 55', license_plate: '06 ANK 908', supplier: 'Horoz', visits: 18, departures: 17, pallets: 299, crates: 104 },
  { id: 'd4', full_name: 'Eren Sahin', phone: '0535 444 55 66', license_plate: '35 IZM 701', supplier: 'Mevlana', visits: 14, departures: 12, pallets: 216, crates: 77 },
  { id: 'd5', full_name: 'Okan Celik', phone: '0536 555 66 77', license_plate: '34 MR 551', supplier: 'Mars2', visits: 11, departures: 9, pallets: 164, crates: 48 },
]

const now = Date.now()
export const demoShipments = [
  ['s1','34 TR 2045','Mars','d1','r1','r2','waiting',18,4,now-18*60000],
  ['s2','38 KYS 128','Tezel','d2','r1','r2','called',22,7,now-43*60000],
  ['s3','06 ANK 908','Horoz','d3','r1','r3','at_ramp',26,2,now-68*60000],
  ['s4','35 IZM 701','Mevlana','d4','r1','r4','shipped',16,5,now-140*60000],
  ['s5','34 MR 551','Mars2','d5','r1','r2','not_delivered',20,3,now-190*60000],
  ['s6','34 TY 879','Mars','d1','r1','r3','arrived',24,6,now-28*60000],
].map(([id,plate,supplier,driver_id,origin_region_id,destination_region_id,status,pallets,crates,created]) => ({ id, plate, supplier, driver_id, origin_region_id, destination_region_id, status, pallets, crates, created_at: new Date(created).toISOString(), updated_at: new Date(created).toISOString(), notes: '' }))
