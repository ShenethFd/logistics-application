import { formatShipmentPrice } from '../lib/shipmentPricing'

export default function ShipmentSummary({ shipments, regions, drivers }) {
  const totalPallets = shipments.reduce((sum, shipment) => sum + shipment.pallets, 0)
  const totalCrates = shipments.reduce((sum, shipment) => sum + shipment.crates, 0)
  return (
    <div className="shipment-summary">
      <header className="page-heading">
        <span className="eyebrow">NETWORK OPERATIONS</span>
        <h2>Shipment summary</h2>
        <p>Dispatch and receiving activity across the depot network.</p>
      </header>
      <section className="card">
        <header>
          <h3>Queue overview</h3>
          <p>Review vehicles awaiting their first dispatch call.</p>
        </header>
        <dl>
          <dt>Awaiting dispatch</dt>
          <dd>{shipments.filter(shipment => shipment.status === 'waiting').length}</dd>
          <dt>Pallets</dt>
          <dd>{shipments.filter(shipment => shipment.status === 'waiting').reduce((sum, shipment) => sum + shipment.pallets, 0)}</dd>
          <dt>Crates</dt>
          <dd>{shipments.filter(shipment => shipment.status === 'waiting').reduce((sum, shipment) => sum + shipment.crates, 0)}</dd>
        </dl>
        <a href="/shipments?status=waiting">View shipments</a>
      </section>
      <section className="card">
        <header>
          <h3>Ramp operations</h3>
          <p>Monitor the vehicles currently assigned to a loading bay.</p>
        </header>
        <dl>
          <dt>Loading at ramp</dt>
          <dd>{shipments.filter(shipment => shipment.status === 'at_ramp').length}</dd>
          <dt>Pallets</dt>
          <dd>{shipments.filter(shipment => shipment.status === 'at_ramp').reduce((sum, shipment) => sum + shipment.pallets, 0)}</dd>
          <dt>Crates</dt>
          <dd>{shipments.filter(shipment => shipment.status === 'at_ramp').reduce((sum, shipment) => sum + shipment.crates, 0)}</dd>
        </dl>
        <a href="/shipments?status=at_ramp">View shipments</a>
      </section>
      <section className="card">
        <header>
          <h3>Departures</h3>
          <p>Track the freight that has departed its origin depot.</p>
        </header>
        <dl>
          <dt>On the road</dt>
          <dd>{shipments.filter(shipment => shipment.status === 'shipped').length}</dd>
          <dt>Pallets</dt>
          <dd>{shipments.filter(shipment => shipment.status === 'shipped').reduce((sum, shipment) => sum + shipment.pallets, 0)}</dd>
          <dt>Crates</dt>
          <dd>{shipments.filter(shipment => shipment.status === 'shipped').reduce((sum, shipment) => sum + shipment.crates, 0)}</dd>
        </dl>
        <a href="/shipments?status=shipped">View shipments</a>
      </section>
      <section className="card">
        <header>
          <h3>Depot arrivals</h3>
          <p>Coordinate goods acceptance with the destination team.</p>
        </header>
        <dl>
          <dt>Ready for receiving</dt>
          <dd>{shipments.filter(shipment => shipment.status === 'arrived').length}</dd>
          <dt>Pallets</dt>
          <dd>{shipments.filter(shipment => shipment.status === 'arrived').reduce((sum, shipment) => sum + shipment.pallets, 0)}</dd>
          <dt>Crates</dt>
          <dd>{shipments.filter(shipment => shipment.status === 'arrived').reduce((sum, shipment) => sum + shipment.crates, 0)}</dd>
        </dl>
        <a href="/shipments?status=arrived">View shipments</a>
      </section>
      <section className="card">
        <header>
          <h3>Delivery exceptions</h3>
          <p>Review consignments that need another delivery attempt.</p>
        </header>
        <dl>
          <dt>Follow-up required</dt>
          <dd>{shipments.filter(shipment => shipment.status === 'not_delivered').length}</dd>
          <dt>Pallets</dt>
          <dd>{shipments.filter(shipment => shipment.status === 'not_delivered').reduce((sum, shipment) => sum + shipment.pallets, 0)}</dd>
          <dt>Crates</dt>
          <dd>{shipments.filter(shipment => shipment.status === 'not_delivered').reduce((sum, shipment) => sum + shipment.crates, 0)}</dd>
        </dl>
        <a href="/shipments?status=not_delivered">View shipments</a>
      </section>
      <section className="card">
        <header>
          <h3>Driver calls</h3>
          <p>Check the vehicles called forward for loading.</p>
        </header>
        <dl>
          <dt>Drivers notified</dt>
          <dd>{shipments.filter(shipment => shipment.status === 'called').length}</dd>
          <dt>Pallets</dt>
          <dd>{shipments.filter(shipment => shipment.status === 'called').reduce((sum, shipment) => sum + shipment.pallets, 0)}</dd>
          <dt>Crates</dt>
          <dd>{shipments.filter(shipment => shipment.status === 'called').reduce((sum, shipment) => sum + shipment.crates, 0)}</dd>
        </dl>
        <a href="/shipments?status=called">View shipments</a>
      </section>
      <footer className="card">
        <h3>Network capacity</h3>
        <dl>
          <dt>Registered drivers</dt>
          <dd>{drivers.length}</dd>
          <dt>Depots</dt>
          <dd>{regions.length}</dd>
          <dt>Total pallets</dt>
          <dd>{totalPallets}</dd>
          <dt>Total crates</dt>
          <dd>{totalCrates}</dd>
        </dl>
        <a href="/drivers">Manage drivers</a>
      </footer>
    </div>
  )
}
