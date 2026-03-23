import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Input, Button, Select } from '..'
import { useAuth } from '../../../context/AuthContext'
import logoLeft from '../../../assets/Logo2.svg'
import checkmarkIcon from '../../../assets/Checkmark-icon.svg'
import doubleIcon from '../../../assets/right-icon.svg'

function ArrowRightIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  )
}

function OTPModal({ isOpen, onClose, onVerifySuccess }) {
  const [visible, setVisible] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [resendSeconds, setResendSeconds] = useState(21)
  const [canResend, setCanResend] = useState(false)
  const inputRefs = useRef([])
  const timerRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      setVisible(false); setIsClosing(false); setOtp(['', '', '', '', '', ''])
      setResendSeconds(21); setCanResend(false)
      const frame = requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)))
      return () => cancelAnimationFrame(frame)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen || canResend) return
    if (resendSeconds <= 0) { setCanResend(true); return }
    timerRef.current = setInterval(() => setResendSeconds((s) => s - 1), 1000)
    return () => clearInterval(timerRef.current)
  }, [isOpen, resendSeconds, canResend])

  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value.slice(-1)
    if (value && !/^\d$/.test(value)) return
    const next = [...otp]; next[index] = value; setOtp(next)
    if (value && index < 5) inputRefs.current[index + 1]?.focus()
  }

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) inputRefs.current[index - 1]?.focus()
  }

  const handleVerify = (e) => {
    e.preventDefault()
    if (otp.join('').length === 6) { onClose(); onVerifySuccess?.() }
  }

  const formatCountdown = () => {
    const m = Math.floor(resendSeconds / 60), s = resendSeconds % 60
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }

  if (!isOpen) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${visible && !isClosing ? 'opacity-100' : 'opacity-0'}`}
      style={{ backgroundColor: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
      onClick={() => { setIsClosing(true); setTimeout(() => onClose(), 300) }}
      role="dialog" aria-modal="true"
    >
      <div
        className={`w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl transition-all duration-300 ${visible && !isClosing ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4 mx-auto">
          <svg className="w-6 h-6 text-[#c60000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-zinc-900 text-center mb-2">Verify your email</h2>
        <p className="text-sm text-zinc-500 text-center mb-8">Enter the 6-digit code sent to your inbox</p>
        <form onSubmit={handleVerify} className="flex flex-col gap-6">
          <div className="flex justify-center gap-2">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <input
                key={i}
                ref={(el) => (inputRefs.current[i] = el)}
                type="text" inputMode="numeric" maxLength={1}
                value={otp[i]}
                onChange={(e) => handleOtpChange(i, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(i, e)}
                placeholder="·"
                className="w-11 h-13 text-center text-xl font-bold rounded-xl border-2 border-zinc-200 bg-zinc-50 text-zinc-900 placeholder-zinc-300 focus:border-[#c60000] focus:outline-none focus:ring-2 focus:ring-[#c60000]/15 transition-all"
                aria-label={`Digit ${i + 1}`}
              />
            ))}
          </div>
          <Button type="submit" className="w-full" size="lg">Verify Email</Button>
          <button
            type="button" disabled={!canResend}
            className="w-full text-sm text-zinc-500 font-medium hover:text-zinc-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {canResend ? 'Resend OTP' : `Resend in ${formatCountdown()}`}
          </button>
        </form>
      </div>
    </div>
  )
}

export function SetProfilePage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const [showOtpModal, setShowOtpModal] = useState(false)
  const [gender, setGender]             = useState('Male')
  const [dateOfBirth, setDateOfBirth]   = useState('')
  const [profession, setProfession]     = useState('')
  const [zipCode, setZipCode]           = useState('54000')
  const [country, setCountry]           = useState('')
  const [stateProvince, setStateProvince] = useState('')
  const [city, setCity]                 = useState('')

  const handleSubmit = (e) => { e.preventDefault(); setShowOtpModal(true) }

  return (
    <div className="min-h-screen flex relative">
      <OTPModal
        isOpen={showOtpModal}
        onClose={() => setShowOtpModal(false)}
        onVerifySuccess={() => {
          const { email, password } = location.state ?? {}
          if (email != null) login(email, password)
          navigate('/dashboard', { replace: true })
        }}
      />

      {/* ── Left panel ── */}
      <div
        className="hidden md:flex md:w-[42%] min-h-screen flex-col items-center justify-center relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #1a0808 0%, #3a0000 60%, #1a0808 100%)' }}
      >
        <div className="absolute inset-0 shimmer-wave pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center gap-8">
          <div
            className="w-52 h-52 rounded-full flex items-center justify-center p-6"
            style={{ boxShadow: '0 0 0 3px rgba(198,0,0,0.5), 0 0 40px rgba(198,0,0,0.25)', background: '#2a0808' }}
          >
            <img src={logoLeft} alt="" className="w-full h-full object-contain" />
          </div>
          <div className="text-center">
            <p className="text-white/80 text-sm font-medium tracking-widest uppercase">Setup Profile</p>
            <p className="text-white/40 text-xs mt-1">Step 2 of 2</p>
          </div>
        </div>
      </div>

      {/* ── Right panel ── */}
      <div className="flex-1 min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-[#f4f5f7] overflow-auto">
        <div className="w-full max-w-md flex flex-col page-enter">
          {/* Step progress */}
          <div className="flex items-center gap-3 mb-8 self-center">
            <span className="flex items-center gap-2">
              <img src={checkmarkIcon} alt="done" className="w-9 h-9 object-contain" />
              <span className="flex flex-col text-sm font-medium leading-tight text-zinc-400">
                <span>Create</span><span>account</span>
              </span>
            </span>
            <img src={doubleIcon} alt="" className="h-7 w-auto object-contain opacity-30" aria-hidden />
            <span className="flex items-center gap-2">
              <span className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold bg-[#c60000] text-white shadow-md shadow-[#c60000]/30 shrink-0">2</span>
              <span className="flex flex-col text-sm font-bold leading-tight text-[#c60000]">
                <span>Setup</span><span>Profile</span>
              </span>
            </span>
          </div>

          <div className="bg-white rounded-2xl shadow-md shadow-black/5 border border-zinc-100 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-full bg-[#c60000] flex items-center justify-center text-white font-bold text-lg shrink-0">S</div>
              <div>
                <h1 className="text-xl font-bold text-zinc-900">Set Profile</h1>
                <p className="text-xs text-zinc-400">Complete your agency profile</p>
              </div>
            </div>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select id="gender" label="Gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Select>
                <Input id="dob" label="Date of Birth" type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
              </div>
              <Input id="profession" label="Profession" placeholder="Enter Profession" value={profession} onChange={(e) => setProfession(e.target.value)} />
              <Input id="zip" label="ZIP / Postal Code" placeholder="54000" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
              <Select id="country" label="Country" value={country} onChange={(e) => setCountry(e.target.value)}>
                <option value="">Select country</option>
                <option value="US">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="PK">Pakistan</option>
                <option value="IN">India</option>
              </Select>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select id="state" label="State / Province" value={stateProvince} onChange={(e) => setStateProvince(e.target.value)}>
                  <option value="">Select state</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Sindh">Sindh</option>
                  <option value="KPK">KPK</option>
                </Select>
                <Select id="city" label="City" value={city} onChange={(e) => setCity(e.target.value)}>
                  <option value="">Select city</option>
                  <option value="Lahore">Lahore</option>
                  <option value="Karachi">Karachi</option>
                  <option value="Islamabad">Islamabad</option>
                </Select>
              </div>
              <Button type="submit" icon={ArrowRightIcon} iconPosition="right" className="w-full mt-2" size="lg">
                Continue
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
