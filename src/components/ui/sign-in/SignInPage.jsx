import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input, Button } from '..'
import { useAuth } from '../../../context/AuthContext'
import logoLeft from '../../../assets/Logo2.svg'
import logoHeader from '../../../assets/Logo2.svg'

function ArrowRightIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  )
}

export function SignInPage() {
  const navigate = useNavigate()
  const { hasAccount, login } = useAuth()
  const [email, setEmail] = useState('')
  const [authorizeCode, setAuthorizeCode] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    const trimmedEmail = email.trim()
    if (!trimmedEmail) { setError('Please enter your email.'); return }
    if (hasAccount(trimmedEmail)) {
      const success = login(trimmedEmail, authorizeCode)
      if (success) navigate('/dashboard', { replace: true })
      else setError('Invalid email or authorize code.')
    } else {
      navigate('/create-account', { state: { email: trimmedEmail } })
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* ── Left panel ── */}
      <div
        className="hidden md:flex md:w-[42%] min-h-screen flex-col items-center justify-center relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #1a0808 0%, #3a0000 60%, #1a0808 100%)' }}
      >
        {/* shimmer overlay */}
        <div className="absolute inset-0 shimmer-wave pointer-events-none" />

        {/* decorative circles */}
        <div className="absolute top-[-80px] left-[-80px] w-72 h-72 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #c60000, transparent 70%)' }} />
        <div className="absolute bottom-[-60px] right-[-60px] w-56 h-56 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #c60000, transparent 70%)' }} />

        {/* Logo ring */}
        <div className="relative z-10 flex flex-col items-center gap-8">
          <div
            className="w-52 h-52 rounded-full flex items-center justify-center p-6"
            style={{ boxShadow: '0 0 0 3px rgba(198,0,0,0.5), 0 0 40px rgba(198,0,0,0.25)', background: '#2a0808' }}
          >
            <img src={logoLeft} alt="" className="w-full h-full object-contain" />
          </div>
          <div className="text-center">
            <p className="text-white/80 text-sm font-medium tracking-widest uppercase">Travel Management</p>
            <p className="text-white/40 text-xs mt-1">Agency Portal</p>
          </div>
        </div>
      </div>

      {/* ── Right panel ── */}
      <div className="flex-1 min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-[#f4f5f7]">
        <div className="w-full max-w-sm flex flex-col items-center page-enter">
          <div className="flex flex-col items-center mb-10">
            <img src={logoHeader} alt="" className="h-12 w-auto object-contain mb-4" />
            <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Welcome back</h1>
            <p className="text-sm text-zinc-500 mt-1">Sign in to your agency portal</p>
          </div>

          <div className="w-full bg-white rounded-2xl shadow-md shadow-black/5 p-8 border border-zinc-100">
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              <Input
                id="email"
                label="Email Address"
                type="email"
                placeholder="you@agency.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                id="authorize-code"
                label="Authorize Code"
                type="password"
                placeholder="Enter your code"
                value={authorizeCode}
                onChange={(e) => setAuthorizeCode(e.target.value)}
                showPasswordToggle
              />

              <div className="flex justify-end">
                <a href="#forgot" className="text-xs font-semibold text-[#c60000] hover:underline">
                  Forgot password?
                </a>
              </div>

              {error && (
                <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3">
                  <p className="text-sm text-red-600" role="alert">{error}</p>
                </div>
              )}

              <Button type="submit" icon={ArrowRightIcon} iconPosition="right" className="w-full" size="lg">
                Continue with email
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
