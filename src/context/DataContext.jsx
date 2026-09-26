import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { demoDrivers, demoRegions, demoShipments } from '../data/demo'
import { supabase } from '../lib/supabase'
import { useAuth } from './AuthContext'

const DataContext = createContext(null)
export function DataProvider({ children }) {
  const { user } = useAuth()
  const [shipments, setShipments] = useState(demoShipments)
  const [drivers, setDrivers] = useState(demoDrivers)
  const [regions, setRegions] = useState(demoRegions)
  const [notifications, setNoteifications] = useState([])
  const [loading, setLoading] = useState(Boolean(supabase))
  useEffect(() => {
    if (!supabase || !user) return
    Promise.all([
      supabase.from('shipments').select('*, supplier:suppliers(*), driver:drivers(*), origin:regions!origin_region_id(*), destination:regions!destination_region_id(*)').order('created_at', { ascending: false }),
      supabase.from('drivers').select('*, supplier:suppliers(name)').order('full_name'),
      supabase.from('regions').select('*').order('name'),
      supabase.from('notifications').select('*').eq('recipient_id', user.id).order('created_at', { ascending: false }).limit(20),
    ]).then(([s,d,r,n]) => {
      if (s.data) setShipments(s.data); if (d.data) setDrivers(d.data); if (r.data) setRegions(r.data); if (n.data) setNoteifications(n.data); setLoading(false)
    })
    const channel = supabase.channel('shipment-board')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'shipments' }, (payload) => {
        setShipments((current) => payload.eventType === 'INSERT' ? [payload.new, ...current] : current.map((item) => item.id === payload.new.id ? { ...item, ...payload.new } : item))
      }).subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [user])
  async function updateShipment(id, patch) {
    if (supabase) {
      const { data, error } = await supabase.from('shipments').update(patch).eq('id', id).select().single()
      if (error) throw error
      setShipments((current) => current.map((item) => item.id === id ? { ...item, ...data } : item))
    } else {
      setShipments((current) => current.map((item) => item.id === id ? { ...item, ...patch, updated_at: new Date().toISOString() } : item))
      setNoteifications((current) => [{ id: crypto.randomUUID(), title: `${shipments.find((s) => s.id === id)?.plate} status updated`, created_at: new Date().toISOString(), read_at: null }, ...current])
    }
  }
  async function createShipment(payload) {
    if (supabase) {
      const { data, error } = await supabase.from('shipments').insert({ ...payload, created_by: user.id }).select().single()
      if (error) throw error
      setShipments((current) => [data, ...current])
    } else {
      const driver = drivers.find((item) => item.id === payload.driver_id)
      setShipments((current) => [{ ...payload, supplier: driver?.supplier || '—', id: crypto.randomUUID(), created_at: new Date().toISOString(), updated_at: new Date().toISOString() }, ...current])
    }
  }
  const visibleShipments = useMemo(() => user?.role === 'regional' ? shipments.filter((s) => s.origin_region_id === user.region_id || s.destination_region_id === user.region_id) : shipments, [shipments, user])
  return <DataContext.Provider value={{ shipments: visibleShipments, drivers, regions, notifications, loading, updateShipment, createShipment }}>{children}</DataContext.Provider>
}
export const useData = () => useContext(DataContext)
