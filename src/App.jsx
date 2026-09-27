import { Navigate, Route, Routes } from 'react-router-dom'
import AppShell from './components/AppShell'
import { useAuth } from './context/AuthContext'
import DashboardPage from './pages/DashboardPage'
import DriversPage from './pages/DriversPage'
import LoginPage from './pages/LoginPage'
import RegionsPage from './pages/RegionsPage'
import ShipmentsPage from './pages/ShipmentsPage'
import UsersPage from './pages/UsersPage'

function Protected({ children, admin = false }) { const { user, loading } = useAuth(); if (loading) return <div className="loading">Loadleniyor…</div>; if (!user) return <Navigate to="/login" replace/>; if(admin && user.role!=='admin') return <Navigate to="/" replace/>; return children }
export default function App(){return <Routes><Route path="/login" element={<LoginPage/>}/><Route element={<Protected><AppShell/></Protected>}><Route index element={<DashboardPage/>}/><Route path="shipments" element={<ShipmentsPage/>}/><Route path="drivers" element={<DriversPage/>}/><Route path="regions" element={<RegionsPage/>}/><Route path="users" element={<Protected admin><UsersPage/></Protected>}/></Route><Route path="*" element={<Navigate to="/" replace/>}/></Routes>}
