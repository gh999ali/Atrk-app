'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabaseClient'

export default function DashboardPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function checkUser() {
      const { data } = await supabase.auth.getUser()
      if (!data?.user) {
        router.push('/login')
        return
      }
      setUser(data.user)
      setLoading(false)
    }
    checkUser()
  }, [router])

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading) {
    return <div style={styles.center}>جاري التحميل...</div>
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>مرحبًا بك في ATRK</h1>
        <p style={styles.email}>مسجّل الدخول كـ: {user?.email}</p>
        <button onClick={handleLogout} style={styles.button}>
          تسجيل الخروج
        </button>
      </div>
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
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    fontFamily: 'sans-serif',
  },
  card: {
    background: '#fff',
    padding: '32px',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
    width: '320px',
    textAlign: 'center',
  },
  title: { fontSize: '20px', marginBottom: '12px' },
  email: { fontSize: '14px', color: '#555', marginBottom: '20px' },
  button: {
    padding: '10px 16px',
    borderRadius: '8px',
    border: 'none',
    background: '#c0392b',
    color: '#fff',
    fontSize: '14px',
    cursor: 'pointer',
  },
}
