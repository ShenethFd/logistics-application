import { useState } from 'react'
import { X } from 'lucide-react'
import { useData } from '../context/DataContext'

export default function ShipmentForm({ onClose }) {
  const { drivers, regions, createShipment } = useData()
  const [saving, setSaving] = useState(false)
  async function submit(event) {
    event.preventDefault(); setSaving(true)
    const data = Object.fromEntries(new FormData(event.currentTarget))
    await createShipment({ ...data, pallets: Number(data.pallets), crates: Number(data.crates), status: 'waiting' })
    onClose()
  }
  return <div className="modal-backdrop" role="presentation"><section className="modal" role="dialog" aria-modal="true" aria-labelledby="new-title"><header><h2 id="new-title">New shipment</h2><button className="icon-button" onClick={onClose} aria-label="Close"><X/></button></header><form onSubmit={submit}>
    <label>License plate<input name="plate" required placeholder="34 ABC 123" /></label>
    
    <label>Driver<select name="driver_id" required><option value="">Select</option>{drivers.map(d => <option key={d.id} value={d.id}>{d.full_name}</option>)}</select></label>
    <div className="form-row"><label>Origin depotst<select name="origin_region_id" required>{regions.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}</select></label><label>Destination depotst<select name="destination_region_id" required>{regions.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}</select></label></div>
    <div className="form-row"><label>Pallets<input name="pallets" type="number" min="0" defaultValue="0" /></label><label>Crates<input name="crates" type="number" min="0" defaultValue="0" /></label></div>
    <label>Note<textarea name="notes" rows="3" /></label><button className="button button--primary" disabled={saving}>{saving ? 'Saving…' : 'Create shipment'}</button>
  </form></section></div>
}
