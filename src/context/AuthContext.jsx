import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { demoUsers, roles } from '../data/demo'
import { isSupabaseConfigured, supabase } from '../lib/supabase'

const AuthContext = createContext(null)
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(sessionStorage.getItem('rotaflow-user') || 'null'))
  const [loading, setLoading] = useState(isSupabaseConfigured)
  useEffect(() => {
    if (!supabase) return
    supabase.auth.getSession().then(async ({ data }) => {
      if (data.session) {
        const { data: profile } = await supabase.from('profiles').select('*').eq('id', data.session.user.id).single()
        setUser({ ...data.session.user, ...profile })
      }
      setLoading(false)
    })
    const { data } = supabase.auth.onAuthStateChange((_event, session) => { if (!session) setUser(null) })
    return () => data.subscription.unsubscribe()
  }, [])
  async function login(email, password) {
    if (supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      const { data: profile, error: profileError } = await supabase.from('profiles').select('*').eq('id', data.user.id).single()
      if (profileError) throw profileError
      setUser({ ...data.user, ...profile })
      return
    }
    const match = demoUsers.find((item) => item.email === email && item.password === password)
    if (!match) throw new Error('Incorrect email or password')
    const safe = { ...match }; delete safe.password
    sessionStorage.setItem('rotaflow-user', JSON.stringify(safe)); setUser(safe)
  }
  async function logout() { if (supabase) await supabase.auth.signOut(); sessionStorage.removeItem('rotaflow-user'); setUser(null) }
  const can = (permission) => user && (roles[user.role]?.permissions.includes('*') || roles[user.role]?.permissions.includes(permission))
  const value = useMemo(() => ({ user, loading, login, logout, can, demoMode: !isSupabaseConfigured }), [user, loading])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
export const useAuth = () => useContext(AuthContext)
