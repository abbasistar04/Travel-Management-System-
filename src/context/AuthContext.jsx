import { createContext, useContext, useState, useEffect } from 'react'

const REGISTERED_KEY = 'tms_registered_users'
const AUTH_KEY = 'tms_auth'

function loadRegistered() {
  try {
    const raw = localStorage.getItem(REGISTERED_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveRegistered(data) {
  localStorage.setItem(REGISTERED_KEY, JSON.stringify(data))
}

function loadAuth() {
  try {
    const raw = localStorage.getItem(AUTH_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function saveAuth(data) {
  if (data) localStorage.setItem(AUTH_KEY, JSON.stringify(data))
  else localStorage.removeItem(AUTH_KEY)
}

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(loadAuth)
  const [registered, setRegistered] = useState(loadRegistered)

  useEffect(() => {
    saveAuth(auth)
  }, [auth])

  useEffect(() => {
    saveRegistered(registered)
  }, [registered])

  const hasAccount = (email) => {
    const key = (email || '').trim().toLowerCase()
    return !!registered[key]
  }

  const registerUser = (email, password) => {
    const key = (email || '').trim().toLowerCase()
    if (!key) return
    setRegistered((prev) => ({ ...prev, [key]: { password: password || '' } }))
  }

  const login = (email, authorizeCode) => {
    const key = (email || '').trim().toLowerCase()
    const record = registered[key]
    if (!record) return false
    if (authorizeCode != null && record.password !== authorizeCode) return false
    setAuth({ email: key })
    return true
  }

  const logout = () => setAuth(null)

  const value = {
    isLoggedIn: !!auth,
    user: auth,
    hasAccount,
    registerUser,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
