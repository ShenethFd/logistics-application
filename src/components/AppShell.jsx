import { Bell, Boxes, LayoutDashboard, LogOut, Map, Menu, ShieldCheck, Truck, Users, X } from 'lucide-react'
import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { roles } from '../data/demo'
import { useAuth } from '../context/AuthContext'
import { useData } from '../context/DataContext'

const links = [
  { to: '/', label: 'Overview', icon: LayoutDashboard },
  { to: '/shipments', label: 'Shipment Tracking', icon: Truck },
  { to: '/drivers', label: 'Drivers', icon: Users },
  { to: '/regions', label: 'Regions & Depots', icon: Map },
  { to: '/users', label: 'User Management', icon: ShieldCheck, admin: true },
]
export default function AppShell() {
  const [open, setOpen] = useState(false)
  const { user, logout, demoMode } = useAuth()
  const { notifications } = useData()
  return <div className="app-shell">
    <aside className={open ? 'sidebar sidebar--open' : 'sidebar'}>
      <div className="brand"><span className="brand__mark"><Boxes size={24}/></span><span>RotaFlow<small>LOGISTICS</small></span><button className="icon-button mobile-only" onClick={() => setOpen(false)} aria-label="Close menu"><X/></button></div>
      <nav aria-label="Main menu">{links.filter((item) => !item.admin || user.role === 'admin').map(({to,label,icon:Icon}) => <NavLink key={to} to={to} end={to === '/'} onClick={() => setOpen(false)}><Icon size={20}/>{label}</NavLink>)}</nav>
      <div className="sidebar__footer"><div className="avatar">{user.full_name?.slice(0,2).toUpperCase()}</div><div><strong>{user.full_name}</strong><small>{roles[user.role]?.label}</small></div><button className="icon-button" onClick={logout} aria-label="Sign out"><LogOut size={18}/></button></div>
    </aside>
    <div className="main-area">
      <header className="topbar"><button className="icon-button mobile-only" onClick={() => setOpen(true)} aria-label="Open menu"><Menu/></button><div><strong>Operations Center</strong>{demoMode && <span className="demo-pill">DEMO MODE</span>}</div><button className="notification-button" aria-label={`${notifications.filter(n => !n.read_at).length} unread notifications`}><Bell/><span>{notifications.filter(n => !n.read_at).length}</span></button></header>
      <main className="content"><Outlet/></main>
    </div>
  </div>
}
