import { AlertTriangle, ArrowUpRight, CheckCircle2, Clock3, PackageCheck, Truck } from 'lucide-react'
import { useData } from '../context/DataContext'
import { useAuth } from '../context/AuthContext'
import StatusBadge from '../components/StatusBadge'

export default function DashboardPage() {
  const { user } = useAuth(); const { shipments, drivers, regions } = useData()
  const count = (statuses) => shipments.filter(s => statuses.includes(s.status)).length
  const cards = [
    ['Active Shipments', count(['waiting','called','arrived','at_ramp']), Truck, 'blue'],
    ['At Ramp', count(['at_ramp']), PackageCheck, 'amber'],
    ['Shipped Today', count(['shipped']), CheckCircle2, 'green'],
    ['Action Required', count(['waiting','not_delivered']), AlertTriangle, 'red'],
  ]
  return <><div className="page-heading"><div><span className="eyebrow">SEPTEMBER 26, 2026 · SATURDAY</span><h1>Good morning, {user.full_name?.split(' ')[0]}</h1><p>Here is today's logistics operations summary.</p></div><a className="button button--secondary" href="/shipments">All shipments <ArrowUpRight size={18}/></a></div>
    <div className="stat-grid">{cards.map(([label,value,Icon,tone]) => <article className="stat-card" key={label}><span className={`icon-box icon-box--${tone}`}><Icon/></span><div><span>{label}</span><strong>{value}</strong><small>total vehicles</small></div></article>)}</div>
    <div className="dashboard-grid"><section className="card"><header><div><h2>Recent activity</h2><p>Latest vehicles in operation</p></div></header><div className="table-wrap"><table><thead><tr><th>Vehicle</th><th>Route</th><th>Status</th><th>Updated</th></tr></thead><tbody>{shipments.slice(0,5).map(s => <tr key={s.id}><td><strong>{s.plate}</strong><small>{typeof s.supplier === 'object' ? s.supplier?.name : s.supplier}</small></td><td>{regions.find(r=>r.id===s.origin_region_id)?.code} → {regions.find(r=>r.id===s.destination_region_id)?.code}</td><td><StatusBadge status={s.status}/></td><td><Clock3 size={14}/> {new Date(s.updated_at).toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'})}</td></tr>)}</tbody></table></div></section>
      <section className="card capacity"><header><div><h2>Network summary</h2><p>Active operations capacity</p></div></header><div className="ring" style={{'--percent': `${Math.min(shipments.length / 15 * 100,100)}%`}}><strong>{shipments.length}</strong><span>/ 15 vehicles</span></div><div className="mini-stats"><span><strong>{drivers.length}</strong> active drivers</span><span><strong>{regions.length}</strong> depots</span></div></section></div>
  </>
}
