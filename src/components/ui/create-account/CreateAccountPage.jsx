import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Input, Button, Select } from '..'
import { useAuth } from '../../../context/AuthContext'
import logoLeft from '../../../assets/Logo2.svg'
import doubleIcon from '../../../assets/right-icon.svg'

const COUNTRY_CODES = [
  { value: '+92', label: '+92' },
  { value: '+1',  label: '+1'  },
  { value: '+44', label: '+44' },
  { value: '+91', label: '+91' },
]

function ArrowRightIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  )
}

function StepIndicator({ step, label1, label2, active }) {
  return (
    <span className="flex items-center gap-3">
      <span
        className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-all ${
          active
            ? 'bg-[#c60000] text-white shadow-md shadow-[#c60000]/30'
            : 'bg-white border-2 border-zinc-200 text-zinc-400'
        }`}
      >
        {step}
      </span>
      <span className={`flex flex-col text-sm font-medium leading-tight ${active ? 'text-[#c60000]' : 'text-zinc-400'}`}>
        <span>{label1}</span>
        <span>{label2}</span>
      </span>
    </span>
  )
}

export function CreateAccountPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { registerUser } = useAuth()
  const initialEmail = location.state?.email ?? ''
  const [name, setName]               = useState('')
  const [email, setEmail]             = useState(initialEmail)
  const [countryCode, setCountryCode] = useState('+92')
  const [contact, setContact]         = useState('')
  const [emailConfirm, setEmailConfirm] = useState(initialEmail)
  const [password, setPassword]       = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    registerUser(email, password)
    navigate('/set-profile', { state: { email, name, contact: `${countryCode} ${contact}`, password } })
  }

  return (
    <div className="min-h-screen flex">
      {/* ── Left panel ── */}
      <div
        className="hidden md:flex md:w-[42%] min-h-screen flex-col items-center justify-center relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #1a0808 0%, #3a0000 60%, #1a0808 100%)' }}
      >
        <div className="absolute inset-0 shimmer-wave pointer-events-none" />
        <div className="absolute top-[-80px] left-[-80px] w-72 h-72 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #c60000, transparent 70%)' }} />
        <div className="absolute bottom-[-60px] right-[-60px] w-56 h-56 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #c60000, transparent 70%)' }} />
        <div className="relative z-10 flex flex-col items-center gap-8">
          <div
            className="w-52 h-52 rounded-full flex items-center justify-center p-6"
            style={{ boxShadow: '0 0 0 3px rgba(198,0,0,0.5), 0 0 40px rgba(198,0,0,0.25)', background: '#2a0808' }}
          >
            <img src={logoLeft} alt="" className="w-full h-full object-contain" />
          </div>
          <div className="text-center">
            <p className="text-white/80 text-sm font-medium tracking-widest uppercase">Create Account</p>
            <p className="text-white/40 text-xs mt-1">Step 1 of 2</p>
          </div>
        </div>
      </div>

      {/* ── Right panel ── */}
      <div className="flex-1 min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-[#f4f5f7] overflow-auto">
        <div className="w-full max-w-sm flex flex-col page-enter">
          {/* Progress steps */}
          <div className="flex items-center gap-3 mb-8 self-center">
            <StepIndicator step="1" label1="Create" label2="account" active />
            <img src={doubleIcon} alt="" className="h-7 w-auto object-contain opacity-30" aria-hidden />
            <StepIndicator step="2" label1="Setup" label2="Profile" active={false} />
          </div>

          <div className="bg-white rounded-2xl shadow-md shadow-black/5 border border-zinc-100 p-8">
            <h1 className="text-xl font-bold text-zinc-900 mb-6">Create your account</h1>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <Input id="name" label="Full Name" type="text" placeholder="Enter your full name" value={name} onChange={(e) => setName(e.target.value)} />
              <Input id="email" label="Email" type="email" placeholder="you@agency.com" value={email} onChange={(e) => setEmail(e.target.value)} />

              {/* Phone */}
              <div>
                <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-1.5">Contact</label>
                <div className="flex rounded-lg border border-zinc-200 bg-white overflow-hidden focus-within:border-[#c60000] focus-within:ring-2 focus-within:ring-[#c60000]/15 transition-all">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="w-20 shrink-0 border-0 bg-zinc-50 px-2 py-3 text-sm text-zinc-700 focus:outline-none focus:ring-0 cursor-pointer border-r border-zinc-200"
                  >
                    {COUNTRY_CODES.map(({ value, label }) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    placeholder="000 0000000"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="flex-1 min-w-0 border-0 py-3 px-3 text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-0 bg-transparent"
                  />
                </div>
              </div>

              <Input id="email-confirm" label="Confirm Email" type="email" placeholder="you@agency.com" value={emailConfirm} onChange={(e) => setEmailConfirm(e.target.value)} />
              <Input id="password" label="Password" type="password" placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} showPasswordToggle />

              <p className="text-xs text-zinc-500 mt-1">
                By clicking "Continue" I agree to the{' '}
                <a href="/terms" className="text-[#c60000] font-medium hover:underline">Terms & Conditions</a>
                {' '}and{' '}
                <a href="/privacy" className="text-[#c60000] font-medium hover:underline">Privacy Policy</a>.
              </p>

              <Button type="submit" icon={ArrowRightIcon} iconPosition="right" className="w-full mt-1" size="lg">
                Continue
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
