'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabaseClient'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSignup(e) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error } = await supabase.auth.signUp({ email, password })

    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    router.push('/dashboard')
  }

  return (
    <div style={styles.container}>
      <form onSubmit={handleSignup} style={styles.form}>
        <h1 style={styles.title}>إنشاء حساب ATRK</h1>

        <input
          type="email"
          placeholder="البريد الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />

        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          style={styles.input}
        />

        {error && <p style={styles.error}>{error}</p>}

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'جاري الإنشاء...' : 'إنشاء حساب'}
        </button>

        <a href="/login" style={styles.link}>
          لديك حساب بالفعل؟ سجّل الدخول
        </a>
      </form>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: '#f5f5f7',
    direction: 'rtl',
    fontFamily: 'sans-serif',
  },
  form: {
    background: '#fff',
    padding: '32px',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
    width: '320px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  title: { textAlign: 'center', marginBottom: '8px', fontSize: '20px' },
  input: {
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '14px',
  },
  button: {
    padding: '10px',
    borderRadius: '8px',
    border: 'none',
    background: '#111',
    color: '#fff',
    fontSize: '14px',
    cursor: 'pointer',
  },
  error: { color: '#c0392b', fontSize: '13px', margin: 0 },
  link: { textAlign: 'center', fontSize: '13px', color: '#555', marginTop: '8px' },
}
