import { useState } from 'react'
import { ArrowRight, Boxes, Eye, EyeOff, ShieldCheck, Truck } from 'lucide-react'
import { Navigate } from 'react-router-dom'
import { demoUsers, roles } from '../data/demo'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const { user, login, demoMode } = useAuth()
  const [email, setEmail] = useState('shipment@rotaflow.demo')
  const [password, setPassword] = useState('demo123')
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  if (user) return <Navigate to="/" replace />
  async function submit(event) { event.preventDefault(); setBusy(true); setError(''); try { await login(email, password) } catch (err) { setError(err.message) } finally { setBusy(false) } }
  return <main className="login-page"><section className="login-visual"><div className="brand brand--light"><span className="brand__mark"><Boxes/></span>RotaFlow</div><div><span className="eyebrow">LOGISTICS OPERATIONS PLATFORMU</span><h1>Every vehicle.<br/>Every movement.<br/><em>One screen.</em></h1><p>Bring shipment, security, and depotst teams together in one real-time operations workflow.</p><div className="feature-row"><span><Truck/>Live vehicle tracking</span><span><ShieldCheck/>Rolee-based security</span></div></div><small>Keep operations moving.</small></section>
    <section className="login-panel"><form className="login-card" onSubmit={submit}><span className="eyebrow">WELCOME</span><h2>Sign in to your account</h2><p>Use your organization credentials to continue.</p>{error && <div className="error" role="alert">{error}</div>}<label>Email address<input type="email" value={email} onChange={e => setEmail(e.target.value)} required /></label><label>Password<div className="password-field"><input type={show ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required/><button type="button" onClick={() => setShow(!show)} aria-label="Show or hide password">{show ? <EyeOff/> : <Eye/>}</button></div></label><button className="button button--primary button--full" disabled={busy}>{busy ? 'Signing in…' : <>Sign in <ArrowRight size={19}/></>}</button>{demoMode && <div className="demo-logins"><strong>Demo roles</strong>{demoUsers.map(item => <button type="button" key={item.id} onClick={() => { setEmail(item.email); setPassword(item.password) }}><span>{roles[item.role].label}</span><small>{item.email}</small></button>)}</div>}</form></section>
  </main>
}
