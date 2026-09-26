import { Filter, Plus, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import ShipmentForm from '../components/ShipmentForm'
import StatusBadge, { statusLabels } from '../components/StatusBadge'
import { useAuth } from '../context/AuthContext'
import { useData } from '../context/DataContext'

const transitions = {
  security: { waiting: ['called'], called: ['arrived'] },
  shipment: { called: ['at_ramp'], arrived: ['at_ramp'], at_ramp: ['shipped'], waiting: ['not_delivered'] },
  goods_acceptance: { shipped: ['arrived'], arrived: ['not_delivered'] },
  regional: { waiting: ['shipped'], arrived: ['shipped'] },
}
export default function ShipmentsPage() {
  const { user, can } = useAuth(); const { shipments, drivers, regions, updateShipment } = useData()
  const [filter,setFilter] = useState('all'); const [query,setQuery] = useState(''); const [showForm,setShowForm] = useState(false)
  const filtered = useMemo(() => shipments.filter(s => (filter==='all'||s.status===filter) && `${s.plate} ${s.supplier}`.toLowerCase().includes(query.toLowerCase())), [shipments,filter,query])
  const optionsFor = (status) => user.role === 'admin' ? Object.keys(statusLabels).filter(s=>s!==status) : transitions[user.role]?.[status] || []
  return <><div className="page-heading"><div><span className="eyebrow">OPERATIONS</span><h1>Shipment tracking</h1><p>Manage every vehicle movement from one screen.</p></div>{(can('shipments:create')||can('shipments:create:region')) && <button className="button button--primary" onClick={()=>setShowForm(true)}><Plus/> New shipment</button>}</div>
    <section className="card"><div className="toolbar"><div className="search"><Search/><input aria-label="Search shipments" placeholder="Search by license plate or supplier…" value={query} onChange={e=>setQuery(e.target.value)}/></div><label className="filter"><Filter/><select value={filter} onChange={e=>setFilter(e.target.value)}><option value="all">All statuses</option>{Object.entries(statusLabels).map(([v,l])=><option key={v} value={v}>{l}</option>)}</select></label></div>
      <div className="table-wrap"><table><thead><tr><th>Vehicle / Supplier</th><th>Driver</th><th>Route</th><th>Load</th><th>Status</th><th>Action</th></tr></thead><tbody>{filtered.map(s=><tr key={s.id}><td><strong>{s.plate}</strong><small>{typeof s.supplier === 'object' ? s.supplier?.name : s.supplier}</small></td><td>{drivers.find(d=>d.id===s.driver_id)?.full_name||'—'}</td><td><strong>{regions.find(r=>r.id===s.origin_region_id)?.code}</strong> → <strong>{regions.find(r=>r.id===s.destination_region_id)?.code}</strong></td><td>{s.pallets} pallets · {s.crates} crates</td><td><StatusBadge status={s.status}/></td><td>{optionsFor(s.status).length ? <select className="action-select" value="" onChange={e=>updateShipment(s.id,{status:e.target.value,notes:`${statusLabels[e.target.value]} — ${user.full_name}`})}><option value="">Update status</option>{optionsFor(s.status).map(v=><option key={v} value={v}>{statusLabels[v]}</option>)}</select> : <span className="muted">No permission</span>}</td></tr>)}</tbody></table>{!filtered.length&&<div className="empty">No matching shipments found.</div>}</div></section>{showForm&&<ShipmentForm onClose={()=>setShowForm(false)}/>}</>
}
