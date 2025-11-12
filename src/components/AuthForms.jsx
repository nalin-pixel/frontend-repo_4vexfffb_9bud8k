import { useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export function RegisterForm({ onSuccess }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error((await res.json()).detail || 'Registration failed')
      const data = await res.json()
      onSuccess?.(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <input className="w-full border rounded px-3 py-2" placeholder="Full name" value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} required />
      <input className="w-full border rounded px-3 py-2" type="email" placeholder="Email" value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})} required />
      <input className="w-full border rounded px-3 py-2" type="password" placeholder="Password" value={form.password} onChange={(e)=>setForm({...form, password:e.target.value})} required />
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <button disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded py-2 font-medium">
        {loading ? 'Creating account...' : 'Create account'}
      </button>
    </form>
  )
}

export function LoginForm({ onSuccess }) {
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const body = new URLSearchParams()
      body.append('username', form.email)
      body.append('password', form.password)

      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      })
      if (!res.ok) throw new Error((await res.json()).detail || 'Login failed')
      const data = await res.json()
      localStorage.setItem('token', data.access_token)
      onSuccess?.(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <input className="w-full border rounded px-3 py-2" type="email" placeholder="Email" value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})} required />
      <input className="w-full border rounded px-3 py-2" type="password" placeholder="Password" value={form.password} onChange={(e)=>setForm({...form, password:e.target.value})} required />
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <button disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded py-2 font-medium">
        {loading ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  )
}
